import Coordinate from './Coordinate';

class Ship {
  name: string;
  coordinates: Coordinate[] = [];
  size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}

export default Ship;
