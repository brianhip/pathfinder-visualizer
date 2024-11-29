import React from 'react';
import { Node as NodeComponent } from './Node';
import { Node as NodeType } from '../types';
import { GRID_COLS, CELL_SIZE } from '../constants';

interface GridProps {
  grid: NodeType[][];
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number, e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

export const Grid: React.FC<GridProps> = ({
  grid,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onMouseLeave
}) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-inner"
      onMouseLeave={onMouseLeave}
    >
      <div 
        className="grid gap-0 select-none touch-none"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${grid.length}, ${CELL_SIZE}px)`,
          width: `${GRID_COLS * CELL_SIZE}px`,
          height: `${grid.length * CELL_SIZE}px`,
        }}
      >
        {grid.map((row) => 
          row.map((node) => (
            <NodeComponent
              key={`${node.row}-${node.col}`}
              node={node}
              onMouseDown={onMouseDown}
              onMouseEnter={onMouseEnter}
              onMouseUp={onMouseUp}
            />
          ))
        )}
      </div>
    </div>
  );
};