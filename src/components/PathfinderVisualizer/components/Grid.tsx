import React, { useState, useEffect} from 'react';
import { Node as NodeComponent } from './Node';
import { Node as NodeType } from '../types';
import { CELL_SIZE, GRID_COLS_DESKTOP, GRID_COLS_MOBILE } from '../constants';

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
  // FIX this ASAP is ugly lol
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
  return (
    <div 
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-inner md:animate-none animate-rotate-mobile"
      onMouseLeave={onMouseLeave}
    >
      <div 
        className="grid gap-0 select-none touch-none"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${useResponsiveValues()}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${grid.length}, ${CELL_SIZE}px)`,
          width: `${useResponsiveValues() * CELL_SIZE}px`,
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