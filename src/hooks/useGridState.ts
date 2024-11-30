'use client'
import { useState, useCallback } from 'react';
import { Node, Position } from '@/components/PathfinderVisualizer/types';
import { createInitialGrid } from '@/utils/grid';

interface UseGridStateProps {
  startNode: Position;
  finishNode: Position;
  // Making it responsive
  GRID_COLS:number;
}

export const useGridState = ({ startNode, finishNode, GRID_COLS }: UseGridStateProps) => {
  const [grid, setGrid] = useState<Node[][]>(() => 
    createInitialGrid(startNode, finishNode, GRID_COLS )
  );
  const [isDrawing, setIsDrawing] = useState(false);

  const initializeGrid = useCallback(() => {
    setGrid(createInitialGrid(startNode, finishNode, GRID_COLS));
  }, [startNode, finishNode, GRID_COLS ]);

  const toggleWall = useCallback((row: number, col: number) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(r => [...r]);
      const node = newGrid[row][col];
      if (!node || node.isStart || node.isFinish) return prevGrid;
      
      newGrid[row][col] = {
        ...node,
        isWall: !node.isWall
      };
      return newGrid;
    });
  }, []);

  return {
    grid,
    setGrid,
    isDrawing,
    setIsDrawing,
    initializeGrid,
    toggleWall
  };
};