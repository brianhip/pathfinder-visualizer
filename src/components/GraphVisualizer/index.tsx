import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';

interface NodeData {
  label: string;
  distance?: number;
  visited?: boolean;
  isPath?: boolean;
}

// interface DijkstraNode {
//   id: string;
//   distance: number;
//   previousNode: string | null;
// }

const initialNodes: Node<NodeData>[] = [
  { id: 'A', position: { x: 250, y: 0 }, data: { label: 'A' } },
  { id: 'B', position: { x: 100, y: 100 }, data: { label: 'B' } },
  { id: 'C', position: { x: 400, y: 100 }, data: { label: 'C' } },
  { id: 'D', position: { x: 250, y: 200 }, data: { label: 'D' } },
  { id: 'E', position: { x: 100, y: 300 }, data: { label: 'E' } },
  { id: 'F', position: { x: 250, y: 400 }, data: { label: 'F' } },
];

const initialEdges: Edge[] = [
  { id: 'AB', source: 'A', target: 'B', label: '4', data: { weight: 4 }, animated: false, style: { stroke: '#999' } },
  { id: 'AC', source: 'A', target: 'C', label: '2', data: { weight: 2 }, animated: false, style: { stroke: '#999' } },
  { id: 'BC', source: 'B', target: 'C', label: '1', data: { weight: 1 }, animated: false, style: { stroke: '#999' } },
  { id: 'BD', source: 'B', target: 'D', label: '5', data: { weight: 5 }, animated: false, style: { stroke: '#999' } },
  { id: 'CD', source: 'C', target: 'D', label: '8', data: { weight: 8 }, animated: false, style: { stroke: '#999' } },
  { id: 'CF', source: 'C', target: 'F', label: '10', data: { weight: 10 }, animated: false, style: { stroke: '#999' } },
  { id: 'DE', source: 'D', target: 'E', label: '2', data: { weight: 2 }, animated: false, style: { stroke: '#999' } },
  { id: 'DF', source: 'D', target: 'F', label: '6', data: { weight: 6 }, animated: false, style: { stroke: '#999' } },
  { id: 'EF', source: 'E', target: 'F', label: '3', data: { weight: 3 }, animated: false, style: { stroke: '#999' } },
];

const GraphVisualizer = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const resetGraph = useCallback(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedNode(null);
    setIsRunning(false);
  }, [setNodes, setEdges]);

  const runDijkstra = useCallback(async (startId: string, endId: string) => {
    setIsRunning(true);
    const graph = new Map<string, Map<string, number>>();
    
    // Build adjacency list
    edges.forEach(edge => {
      if (!graph.has(edge.source)) graph.set(edge.source, new Map());
      if (!graph.has(edge.target)) graph.set(edge.target, new Map());
      
      graph.get(edge.source)!.set(edge.target, edge.data.weight);
      graph.get(edge.target)!.set(edge.source, edge.data.weight); // Undirected graph
    });

    // Initialize distances
    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const unvisited = new Set<string>();

    nodes.forEach(node => {
      distances.set(node.id, Infinity);
      previous.set(node.id, null);
      unvisited.add(node.id);
    });
    distances.set(startId, 0);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Dijkstra's algorithm
    while (unvisited.size > 0) {
      // Find node with minimum distance
      const current = Array.from(unvisited)
        .reduce((min, node) => 
          distances.get(node)! < distances.get(min)! ? node : min
        );

      if (distances.get(current) === Infinity) break;
      
      unvisited.delete(current);

      // Update node visualization
      setNodes(nodes => nodes.map(node => ({
        ...node,
        style: {
          ...node.style,
          backgroundColor: node.id === current ? '#93c5fd' : 
                          node.id === startId ? '#22c55e' :
                          node.id === endId ? '#ef4444' :
                          !unvisited.has(node.id) ? '#ddd' : '#fff',
        },
        data: {
          ...node.data,
          label: `${node.id}\n(${distances.get(node.id) === Infinity ? '∞' : distances.get(node.id)})`
        }
      })));

      await delay(500);

      // Update neighbors
      const neighbors = graph.get(current) || new Map();
      for (const [neighbor, weight] of neighbors) {
        if (!unvisited.has(neighbor)) continue;

        const newDistance = distances.get(current)! + weight;
        if (newDistance < distances.get(neighbor)!) {
          distances.set(neighbor, newDistance);
          previous.set(neighbor, current);

          // Highlight edge being considered
          setEdges(edges => edges.map(edge => ({
            ...edge,
            animated: (edge.source === current && edge.target === neighbor) ||
                     (edge.target === current && edge.source === neighbor),
            style: { stroke: '#93c5fd' }
          })));

          await delay(500);
        }
      }

      if (current === endId) break;
    }

    // Highlight shortest path
    let current = endId;
    const path = [current];
    while (previous.get(current)) {
      current = previous.get(current)!;
      path.unshift(current);
    }

    // Highlight final path
    setEdges(edges => edges.map(edge => ({
      ...edge,
      animated: false,
      style: {
        stroke: path.includes(edge.source) && path.includes(edge.target) ? '#22c55e' : '#999',
        strokeWidth: path.includes(edge.source) && path.includes(edge.target) ? 2 : 1
      }
    })));

    setIsRunning(false);
  }, [edges, nodes, setNodes, setEdges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (isRunning) return;
    
    setSelectedNode(prevNode => {
      if (!prevNode) {
        setNodes(nodes => nodes.map(n => ({
          ...n,
          style: { backgroundColor: n.id === node.id ? '#22c55e' : '#fff' }
        })));
        return node.id;
      } else {
        runDijkstra(prevNode, node.id);
        return null;
      }
    });
  }, [isRunning, setNodes, runDijkstra]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <Button 
          onClick={resetGraph}
          disabled={isRunning}
          variant="outline"
        >
          Reset Graph
        </Button>
        <div className="text-sm">
          {!selectedNode ? 'Click a node to set start point' : 'Click another node to find shortest path'}
        </div>
      </div>
      <div className="h-[600px] w-full border rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default GraphVisualizer;