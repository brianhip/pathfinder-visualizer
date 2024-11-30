import { useState, useEffect } from 'react';
// import { GRID_ROWS, GRID_COLS, CELL_SIZE } from '../components/PathfinderVisualizer/constants';

interface GridDimensions {
  rows: number;
  cols: number;
  cellSize: number;
}

export const useResponsiveGrid = () => {
  const [dimensions, setDimensions] = useState<GridDimensions>({
    rows: 15,
    cols: 25,
    cellSize: 30
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      
      if (width < 640) { // Mobile
        setDimensions({
          rows: 12,
          cols: 12,
          cellSize: 24
        });
      } else if (width < 768) { // Small tablet
        setDimensions({
          rows: 15,
          cols: 15,
          cellSize: 26
        });
      } else if (width < 1024) { // Tablet/Small laptop
        setDimensions({
          rows: 15,
          cols: 20,
          cellSize: 28
        });
      } else { // Desktop
        setDimensions({
          rows: 15,
          cols: 25,
          cellSize: 30
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
};