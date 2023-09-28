class Cell {
  id: string;
  x: number;
  y: number;
  hasShip: boolean = false;

  constructor(x: number, y: number) {
    this.id = '' + x + y;
    this.x = x;
    this.y = y;
  }
}

export default Cell;
