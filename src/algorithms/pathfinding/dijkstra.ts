import { Node, Position } from '@/components/PathfinderVisualizer/types';
import { getAllNodes, getUnvisitedNeighbors } from '@/utils/grid';

export const dijkstra = (
  grid: Node[][],
  startNode: Position,
  finishNode: Position
): Node[] => {
  const visitedNodesInOrder: Node[] = [];
  const start = grid[startNode.row][startNode.col];
  start.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift()!;
    
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    if (closestNode === grid[finishNode.row][finishNode.col]) {
      return visitedNodesInOrder;
    }
    
    updateUnvisitedNeighbors(closestNode, grid);
  }
  
  return visitedNodesInOrder;
};

const sortNodesByDistance = (unvisitedNodes: Node[]): void => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbors = (node: Node, grid: Node[][]): void => {
  const neighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

export const getNodesInShortestPathOrder = (finishNode: Node): Node[] => {
  const nodesInShortestPathOrder: Node[] = [];
  let currentNode: Node | null = finishNode;
  
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  
  return nodesInShortestPathOrder;
};