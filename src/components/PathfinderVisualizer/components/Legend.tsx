import React from 'react';

export const Legend: React.FC = () => {
  return (
    <div className="flex flex-col items-start gap-2 text-sm dark:text-gray-300">
     <div className="flex items-center">
        <div className="w-4 h-4 bg-green-500 mr-2 rounded" />
        <span>Start Node</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-red-500 mr-2 rounded" />
        <span>End Node</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-gray-800 dark:bg-gray-300 mr-2 rounded" />
        <span>Wall (Click or drag to draw)</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-blue-200 dark:bg-blue-800 mr-2 rounded" />
        <span>Visited Node</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-yellow-400 dark:bg-yellow-500 mr-2 rounded" />
        <span>Shortest Path</span>
      </div>
    </div>
  );
};
