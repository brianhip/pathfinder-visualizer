'use client'
// src/components/PathfinderVisualizer/index.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Grid } from './components/Grid';
import { Controls } from './components/Controls';
import { Legend } from './components/Legend';
import { useGridState } from './useGridState';
import { usePathfinding } from './usePathfinding';
import { Position } from './types';
import { ThemeToggle } from '@/components/ThemeToggle';

const PathfinderVisualizer: React.FC = () => {
  // Define start and end positions
  const startNode: Position = { row: 7, col: 5 };
  const finishNode: Position = { row: 7, col: 20 };

  // Initialize grid state and controls
  const {
    grid,
    setGrid,
    isDrawing,
    setIsDrawing,
    initializeGrid,
    toggleWall
  } = useGridState({
    startNode,
    finishNode
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
    <Card className="w-full max-w-4xl mx-auto dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between dark:bg-gray-800">
        <CardTitle>Pathfinding Visualizer</CardTitle>
        <ThemeToggle />
      </CardHeader>
      <CardContent className="dark:bg-gray-800">
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
      </CardContent>
    </Card>
  );
};

export default PathfinderVisualizer;