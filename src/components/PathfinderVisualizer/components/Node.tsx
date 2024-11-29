import React from 'react';
import { Node as NodeType } from '../types';

interface NodeProps {
  node: NodeType;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number, e: React.MouseEvent) => void;
  onMouseUp: () => void;
}

export const Node: React.FC<NodeProps> = ({
  node,
  onMouseDown,
  onMouseEnter,
  onMouseUp
}) => {
  const {
    row,
    col,
    isStart,
    isFinish,
    isWall,
    isVisited,
    isPath
  } = node;

  return (
    <div
      role="gridcell"
      aria-label={`cell ${row}-${col}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={(e) => onMouseEnter(row, col, e)}
      onMouseUp={onMouseUp}
      className={`
        w-[30px] 
        h-[30px] 
        border 
        border-gray-200
        dark:border-gray-600
        ${isStart ? 'bg-green-500' : ''}
        ${isFinish ? 'bg-red-500' : ''}
        ${isWall ? 'bg-gray-800 dark:bg-gray-300' : ''} 
        ${isPath ? 'bg-yellow-400 dark:bg-yellow-500' : ''}
        ${isVisited && !isStart && !isFinish && !isPath ? 'bg-blue-200 dark:bg-blue-800' : ''}
        hover:bg-gray-100
        dark:hover:bg-gray-700
        transition-colors 
        duration-200
        cursor-pointer
        touch-none
      `}
    />
  );
};
