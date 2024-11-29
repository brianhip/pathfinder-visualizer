import React from 'react';
import { Button } from '@/components/ui/button';

interface ControlsProps {
  onVisualize: () => void;
  onClear: () => void;
  isRunning: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  onVisualize,
  onClear,
  isRunning
}) => {
  return (
    <div className="flex space-x-2">
      <Button 
        onClick={onVisualize}
        disabled={isRunning}
      >
        Find Path
      </Button>
      <Button 
        onClick={onClear}
        disabled={isRunning}
        variant="outline"
      >
        Clear Grid
      </Button>
    </div>
  );
};