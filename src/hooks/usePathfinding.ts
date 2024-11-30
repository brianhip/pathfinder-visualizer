'use client'
import { useState, useCallback } from 'react';
import { Node, Position } from '@/components/PathfinderVisualizer/types';
import { dijkstra, getNodesInShortestPathOrder } from '@/algorithms/pathfinding/dijkstra';
import { ANIMATION_SPEED_VISIT, ANIMATION_SPEED_PATH } from '@/components/PathfinderVisualizer/constants';

interface UsePathfindingProps {
  grid: Node[][];
  setGrid: React.Dispatch<React.SetStateAction<Node[][]>>;
  startNode: Position;
  finishNode: Position;
}

export const usePathfinding = ({
  grid,
  setGrid,
  startNode,
  finishNode
}: UsePathfindingProps) => {
  const [isRunning, setIsRunning] = useState(false);

  const animateAlgorithm = useCallback((
    visitedNodesInOrder: Node[],
    nodesInShortestPathOrder: Node[]
  ) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, ANIMATION_SPEED_VISIT * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        setGrid(prevGrid => {
          const newGrid = prevGrid.map(row => [...row]);
          newGrid[node.row][node.col] = {
            ...node,
            isVisited: true
          };
          return newGrid;
        });
      }, ANIMATION_SPEED_VISIT * i);
    }
  }, [setGrid]);

  const animateShortestPath = useCallback((nodesInShortestPathOrder: Node[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        setGrid(prevGrid => {
          const newGrid = prevGrid.map(row => [...row]);
          newGrid[node.row][node.col] = {
            ...node,
            isPath: true
          };
          return newGrid;
        });
        if (i === nodesInShortestPathOrder.length - 1) {
          setIsRunning(false);
        }
      }, ANIMATION_SPEED_PATH * i);
    }
  }, [setGrid]);

  const visualizeDijkstra = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    
    const finishNodeObj = grid[finishNode.row][finishNode.col];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNodeObj);

    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }, [grid, startNode, finishNode, isRunning, animateAlgorithm]);

  return {
    isRunning,
    visualizeDijkstra
  };
};
