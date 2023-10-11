class Ship {
  name: string;
  size: number;
  health: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
    this.health = size;
  }
}

export default Ship;
