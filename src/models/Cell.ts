import Ship from './Ship';

class Cell {
  ship?: Ship;
  isShot: boolean = false;

  constructor(ship?: Ship) {
    this.ship = ship;
  }
}

export default Cell;
