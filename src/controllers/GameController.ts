import AppState from "../stores/AppState";
import GameState from "../models/GameState";
import GameBoard from "../models/GameBoard";
import Cell from "../models/Cell";
import ShipDirection from "../models/ShipDirection";
import Ship from "../models/Ship";

abstract class GameController {
  public static initialize = () => {
    const cpuBoard = new GameBoard();
    cpuBoard.setRandomShips();
    AppState.playerBoard = new GameBoard();
    AppState.cpuBoard = cpuBoard;
  };

  public static executeCpuTurn = () => {
    AppState.playerBoard?.hitRandomLocation();
    if (AppState.playerBoard?.isDefeated()) {
      AppState.gameState = GameState.Finished;
      AppState.gameMessage = "CPU";
    } else {
      AppState.gameState = GameState.PlayerTurn;
    }
  };

  public static setPlayerShip = (cell: Cell, gameBoard: GameBoard) => {
    const isShipPlaced = gameBoard.setShipPosition(
      cell.x,
      cell.y,
      AppState.shipDirection
    );
    if (isShipPlaced) {
      if (gameBoard.shipQueue.length === 0)
        AppState.gameState = GameState.PlayerTurn;

      AppState.playerBoard = new GameBoard(gameBoard);
    }
  };

  public static shootCpuBoard = (cell: Cell, gameBoard: GameBoard) => {
    if (!cell.isShot) {
      if (cell.ship != null) cell.ship.health--;
      cell.isShot = true;
      if (gameBoard.isDefeated()) {
        AppState.gameState = GameState.Finished;
        AppState.gameMessage = "you";
      } else {
        AppState.gameState = GameState.CpuTurn;
      }
      AppState.cpuBoard = new GameBoard(gameBoard);
    }
  };

  public static getIsHovered = (
    gameBoard: GameBoard,
    cell: Cell,
    hoveredCell: Cell,
    player: boolean
  ) => {
    const ship = gameBoard.peekShipQueue();

    if (player && ship && AppState.gameState === GameState.SetUp)
      return this.cellInShip(cell, ship, hoveredCell);

    if (cell === hoveredCell) return true;

    return false;
  };

  public static cellInShip = (cell: Cell, ship: Ship, hoveredCell: Cell) => {
    if (
      AppState.shipDirection === ShipDirection.Horizontal &&
      cell.x >= hoveredCell.x &&
      cell.x < hoveredCell.x + ship.size &&
      cell.y === hoveredCell.y
    )
      return true;

    if (
      AppState.shipDirection === ShipDirection.Vertical &&
      cell.y >= hoveredCell.y &&
      cell.y < hoveredCell.y + ship.size &&
      cell.x === hoveredCell.x
    ) {
      return true;
    }

    return false;
  };
}

export default GameController;
