import Ship from '../models/Ship';

abstract class ShipFactory {
  public static createShips = () => {};

  public static createCruiser = () => {
    return new Ship('cruiser', 2);
  };

  public static createBattleship = () => {
    return new Ship('battleship', 4);
  };

  public static createSubmarine = () => {
    return new Ship('submarine', 3);
  };

  public static createCarrier = () => {
    return new Ship('carrier', 5);
  };

  public static createDestroyer = () => {
    return new Ship('destroyer', 3);
  };
}

export default ShipFactory;
