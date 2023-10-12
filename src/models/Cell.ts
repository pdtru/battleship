import Ship from './Ship';

class Cell {
  ship?: Ship;
  isShot: boolean = false;
  x: number;
  y: number;

  constructor(x: number, y: number, ship?: Ship) {
    this.ship = ship;
    this.x = x;
    this.y = y;
  }
}

export default Cell;
