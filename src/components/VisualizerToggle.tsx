import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VisualizerToggleProps {
  mode: 'grid' | 'graph';
  setMode: (mode: 'grid' | 'graph') => void;
}

export const VisualizerToggle = ({ mode, setMode }: VisualizerToggleProps) => {
  return (
    <div className="inline-flex items-center p-1 bg-muted rounded-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMode('grid')}
        className={cn(
          'rounded-md transition-colors',
          mode === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
        )}
      >
        Grid
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMode('graph')}
        className={cn(
          'rounded-md transition-colors',
          mode === 'graph' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
        )}
      >
        Graph
      </Button>
    </div>
  );
};
