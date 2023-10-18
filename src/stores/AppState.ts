import { BehaviorSubject } from "rxjs";
import GameState from "../models/GameState";
import GameBoard from "../models/GameBoard";
import ShipDirection from "../models/ShipDirection";
import Cell from "../models/Cell";

class AppState {
  gameStateObservable = new BehaviorSubject<GameState>(GameState.SetUp);
  playerBoardObservable: BehaviorSubject<GameBoard | undefined> =
    new BehaviorSubject<GameBoard | undefined>(undefined);
  cpuBoardObservable: BehaviorSubject<GameBoard | undefined> =
    new BehaviorSubject<GameBoard | undefined>(undefined);
  shipDirectionObservable = new BehaviorSubject<ShipDirection>(
    ShipDirection.Horizontal
  );
  gameMessageObservable = new BehaviorSubject<string>("");
  hoveredCellObservable = new BehaviorSubject<Cell | undefined>(undefined);

  public get hoveredCell() {
    return this.hoveredCellObservable.value;
  }

  public set hoveredCell(hoveredCell: Cell | undefined) {
    this.hoveredCellObservable.next(hoveredCell);
  }

  public get gameMessage() {
    return this.gameMessageObservable.value;
  }

  public set gameMessage(gameMessage: string) {
    this.gameMessageObservable.next(gameMessage);
  }

  public get shipDirection() {
    return this.shipDirectionObservable.value;
  }

  public set shipDirection(shipDirection: ShipDirection) {
    this.shipDirectionObservable.next(shipDirection);
  }

  public get gameState() {
    return this.gameStateObservable.value;
  }

  public set gameState(gameState: GameState) {
    this.gameStateObservable.next(gameState);
  }

  public get playerBoard() {
    return this.playerBoardObservable.value;
  }

  public set playerBoard(gameBoard: GameBoard | undefined) {
    this.playerBoardObservable.next(gameBoard);
  }

  public get cpuBoard() {
    return this.cpuBoardObservable.value;
  }

  public set cpuBoard(gameBoard: GameBoard | undefined) {
    this.cpuBoardObservable.next(gameBoard);
  }
}

export default new AppState();
