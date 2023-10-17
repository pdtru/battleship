import ShipFactory from "../controllers/ShipFactory";
import Cell from "./Cell";
import Ship from "./Ship";
import ShipDirection from "./ShipDirection";

class GameBoard {
  grid: Cell[][];
  height: number = 10;
  width: number = 10;
  ships: Set<Ship>;
  shipQueue: Ship[];

  constructor(gameBoard?: GameBoard) {
    if (gameBoard) {
      this.grid = gameBoard.grid;
      this.height = gameBoard.height;
      this.width = gameBoard.width;
      this.ships = gameBoard.ships;
      this.shipQueue = gameBoard.shipQueue;
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

  public peekShipQueue = () => {
    if (this.shipQueue.length == 0) return;
    return this.shipQueue[0];
  };

  public setShipPosition = (
    x: number,
    y: number,
    direction: ShipDirection
  ): boolean => {
    const ship = this.peekShipQueue();
    if (!ship) return false;

    if (direction == ShipDirection.Horizontal && x + ship.size <= this.width) {
      for (let i = x; i < x + ship.size; i++) {
        if (this.grid[y][i].ship != null) return false;
      }
      for (let i = x; i < x + ship.size; i++) {
        this.grid[y][i].ship = ship;
      }
      this.shipQueue.shift();
    }

    if (direction == ShipDirection.Vertical && y + ship.size <= this.height) {
      for (let i = y; i < y + ship.size; i++) {
        if (this.grid[i][x].ship != null) return false;
      }
      for (let i = y; i < y + ship.size; i++) {
        this.grid[i][x].ship = ship;
      }
      this.shipQueue.shift();
    }
    return true;
  };

  public setRandomShips = () => {
    while (this.shipQueue.length > 0) {
      const x: number = Math.floor(Math.random() * this.width);
      const y: number = Math.floor(Math.random() * this.height);
      const direction: ShipDirection =
        Math.floor(Math.random() * 2) == 0
          ? ShipDirection.Horizontal
          : ShipDirection.Vertical;
      this.setShipPosition(x, y, direction);
    }
  };

  public hitRandomLocation = () => {
    let invalid = true;
    while (invalid) {
      const x: number = Math.floor(Math.random() * this.width);
      const y: number = Math.floor(Math.random() * this.height);
      const cell = this.grid[x][y];
      if (!cell.isShot) {
        invalid = false;
        cell.isShot = true;
        if (cell.ship) cell.ship.health--;
      }
    }
  };

  public isDefeated = () => {
    let result = true;
    this.ships.forEach((ship) => {
      if (ship.health != 0) result = false;
    });
    return result;
  };
}

export default GameBoard;
