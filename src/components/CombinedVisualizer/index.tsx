'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import PathfinderVisualizer from '../PathfinderVisualizer/index';
import GraphVisualizer from '../GraphVisualizer/index';
import { VisualizerToggle } from '../VisualizerToggle';

export const CombinedVisualizer = () => {
  const [mode, setMode] = useState<'grid' | 'graph'>('grid');

  return (
    <Card className="w-full max-w-4xl mx-auto dark:border-gray-700  dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <CardTitle>Graph Algorithms Visualizer</CardTitle>
          <VisualizerToggle mode={mode} setMode={setMode} />
        </div>
        <ThemeToggle />
      </CardHeader>
      <CardContent className="dark:bg-gray-800 p-5">
        {mode === 'grid' ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Click and drag to create walls. Find the shortest path between the start (green) and end (red) nodes.
            </p>
            <PathfinderVisualizer />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Click two nodes to find the shortest path between them. Edge weights represent distances.
            </p>
            <GraphVisualizer />
          </div>
        )}
      </CardContent>
    </Card>
  );
};