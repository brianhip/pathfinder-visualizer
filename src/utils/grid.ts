import { Node, Position } from '@/components/PathfinderVisualizer/types';
import { GRID_ROWS } from '@/components/PathfinderVisualizer/constants';
// import { GRID_ROWS, GRID_COLS_DESKTOP, GRID_COLS_MOBILE } from '@/components/PathfinderVisualizer/constants';

export const createInitialGrid = (startNode: Position, finishNode: Position, GRID_COLS:number): Node[][] => {
  const grid: Node[][] = [];

  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow: Node[] = [];
    for (let col = 0; col < GRID_COLS; col++) {
      currentRow.push({
        row,
        col,
        isStart: row === startNode.row && col === startNode.col,
        isFinish: row === finishNode.row && col === finishNode.col,
        isWall: false,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null,
      });
    }
    grid.push(currentRow);
  }
  
  return grid;
};

export const getAllNodes = (grid: Node[][]): Node[] => {
  return grid.reduce((nodes, row) => nodes.concat(row), [] as Node[]);
};

export const getUnvisitedNeighbors = (node: Node, grid: Node[][]): Node[] => {
  const neighbors: Node[] = [];
  const { row, col } = node;
  
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
  return neighbors.filter(neighbor => !neighbor.isVisited);
};
