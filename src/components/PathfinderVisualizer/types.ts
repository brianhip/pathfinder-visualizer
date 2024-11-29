export interface Position {
    row: number;
    col: number;
  }
  
  export interface Node {
    row: number;
    col: number;
    isStart: boolean;
    isFinish: boolean;
    isWall: boolean;
    isVisited: boolean;
    isPath: boolean;
    distance: number;
    previousNode: Node | null;
  }