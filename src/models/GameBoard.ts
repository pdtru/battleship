import Cell from './Cell';

class GameBoard {
  grid: Cell[][];
  constructor() {
    this.grid = this.createGrid();
  }

  private createGrid = () => {
    const grid = [];
    for (let i = 0; i < 10; i++) {
      const column = [];
      for (let j = 0; j < 10; j++) {
        column.push(new Cell(i, j));
      }
      grid.push(column);
    }
    return grid;
  };
}

export default GameBoard;
