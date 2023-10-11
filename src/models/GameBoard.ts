import ShipFactory from '../controllers/ShipFactory';
import Cell from './Cell';
import Ship from './Ship';

class GameBoard {
  grid: Cell[][];
  length: number = 10;
  width: number = 10;
  ships: Set<Ship>;

  constructor() {
    this.grid = this.createGrid();
    this.ships = ShipFactory.createShips();
  }

  private createGrid = () => {
    const grid = [];
    for (let i = 0; i < this.length; i++) {
      const column = [];
      for (let j = 0; j < this.width; j++) {
        column.push(new Cell());
      }
      grid.push(column);
    }
    return grid;
  };
}

export default GameBoard;
