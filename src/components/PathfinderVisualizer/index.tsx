'use client'
import React, { useState, useEffect } from 'react';
import { Grid } from './components/Grid';
import { Controls } from './components/Controls';
import { Legend } from './components/Legend';
import { useGridState } from './useGridState';
import { usePathfinding } from './usePathfinding';
import { Position } from './types';
import { GRID_COLS_DESKTOP, GRID_COLS_MOBILE } from '@/components/PathfinderVisualizer/constants';


const PathfinderVisualizer: React.FC = () => {
  // Define start and end positions
  const startNode: Position = { row: 7, col: 1 };
  const finishNode: Position = { row: 7, col: 13 };
  
  const useResponsiveValues = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
  
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile ? GRID_COLS_MOBILE : GRID_COLS_DESKTOP;
  };
  // Initialize grid state and controls
  const GRID_COLS =useResponsiveValues()
  const {
    grid,
    setGrid,
    isDrawing,
    setIsDrawing,
    initializeGrid,
    toggleWall
  } = useGridState({
    startNode,
    finishNode,
    GRID_COLS
  });

  // Initialize pathfinding functionality
  const {
    isRunning,
    visualizeDijkstra
  } = usePathfinding({
    grid,
    setGrid,
    startNode,
    finishNode
  });

  // Event handlers for wall drawing
  const handleMouseDown = (row: number, col: number) => {
    setIsDrawing(true);
    toggleWall(row, col);
  };

  const handleMouseEnter = (row: number, col: number, e: React.MouseEvent) => {
    if (isDrawing && e.buttons === 1) {
      toggleWall(row, col);
    }
  };
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseLeave = () => {
    setIsDrawing(false);
  };
  return (
        <div className="flex flex-col items-center space-y-4">
          <Controls
            onVisualize={visualizeDijkstra}
            onClear={initializeGrid}
            isRunning={isRunning}
          />
          <Grid
            grid={grid}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          />
          <Legend />
        </div>
  );
};
export default PathfinderVisualizer;