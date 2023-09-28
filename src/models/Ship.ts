import Coordinate from './Coordinate';

class Ship {
  id: string;
  coordinates: Coordinate[] = [];
  size: number;

  constructor(id: string, size: number) {
    this.id = id;
    this.size = size;
  }
}

export default Ship;
