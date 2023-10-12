import ShipFactory from '../controllers/ShipFactory';
import Cell from './Cell';
import Ship from './Ship';
import ShipDirection from './ShipDirection';

class GameBoard {
  grid: Cell[][];
  height: number = 10;
  width: number = 10;
  ships: Set<Ship>;
  shipQueue: Ship[];
  direction: ShipDirection = ShipDirection.Horizontal;

  constructor(gameBoard?: GameBoard) {
    if (gameBoard) {
      this.grid = gameBoard.grid;
      this.height = gameBoard.height;
      this.width = gameBoard.width;
      this.ships = gameBoard.ships;
      this.shipQueue = gameBoard.shipQueue;
      this.direction = gameBoard.direction;
    } else {
      this.grid = this.createGrid();
      this.ships = ShipFactory.createShips();
      this.shipQueue = Array.from(this.ships);
    }
  }

  private createGrid = () => {
    const grid = [];
    for (let i = 0; i < this.height; i++) {
      const column = [];
      for (let j = 0; j < this.width; j++) {
        column.push(new Cell(j, i));
      }
      grid.push(column);
    }
    return grid;
  };

  public setShipPosition = (x: number, y: number) => {
    if (this.shipQueue.length == 0) return;

    const ship = this.shipQueue[0];

    if (
      this.direction == ShipDirection.Horizontal &&
      x + ship.size <= this.width
    ) {
      for (let i = x; i < x + ship.size; i++) {
        this.grid[y][i].ship = ship;
      }
      this.shipQueue.shift();
    }

    if (
      this.direction == ShipDirection.Vertical &&
      x + ship.size <= this.height
    ) {
      for (let i = y; i < y + ship.size; i++) {
        this.grid[i][x].ship = ship;
      }
      this.shipQueue.shift();
    }
  };
}

export default GameBoard;
