import CellModel from "../models/Cell";
import GameState from "../models/GameState";
import { useState, useEffect } from "react";
import AppState from "../stores/AppState";
import GameController from "../controllers/GameController";

const Cell = ({ cell, player }: { cell: CellModel; player: boolean }) => {
  const [gameBoard, setGameBoard] = useState(
    player ? AppState.playerBoard : AppState.cpuBoard
  );
  const [gameState, setGameState] = useState(AppState.gameState);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const gameBoardSubscription = player
      ? AppState.playerBoardObservable.subscribe(setGameBoard)
      : AppState.cpuBoardObservable.subscribe(setGameBoard);
    const gameStateSubscription =
      AppState.gameStateObservable.subscribe(setGameState);
    const hoveredCellSubscription = AppState.hoveredCellObservable.subscribe(
      (hoveredCell) => {
        if (gameBoard && hoveredCell) {
          const result = GameController.getIsHovered(
            gameBoard,
            cell,
            hoveredCell,
            player
          );

          setIsHovered(result);
        } else {
          setIsHovered(false);
        }
      }
    );

    return () => {
      gameBoardSubscription.unsubscribe();
      gameStateSubscription.unsubscribe();
      hoveredCellSubscription.unsubscribe();
    };
  }, []);

  const onClick = () => {
    if (gameBoard) {
      if (player && gameState === GameState.SetUp) {
        GameController.setPlayerShip(cell, gameBoard);
      }
      if (!player && gameState === GameState.PlayerTurn) {
        GameController.shootCpuBoard(cell, gameBoard);
      }
    }
  };

  const handleMouseEnter = () => {
    AppState.hoveredCell = cell;
  };

  const handleMouseLeave = () => {
    AppState.hoveredCell = undefined;
  };

  const cellStyles: React.CSSProperties = {
    margin: "1px",
    width: "42px",
    height: "42px",
    borderRadius: "4px",
    backgroundColor:
      cell.isShot && cell.ship
        ? "#FF8080"
        : cell.isShot && !cell.ship
        ? "#D2E0FB"
        : player && cell.ship != null
        ? "#D1D1D1"
        : isHovered
        ? "#E4E4E7"
        : "#F5F5F5",
  };

  return (
    <div
      style={cellStyles}
      onClick={onClick}
      onMouseEnter={
        (gameState === GameState.SetUp && player) ||
        (gameState === GameState.PlayerTurn && !player)
          ? handleMouseEnter
          : undefined
      }
      onMouseLeave={
        (gameState === GameState.SetUp && player) ||
        (gameState === GameState.PlayerTurn && !player)
          ? handleMouseLeave
          : undefined
      }
    ></div>
  );
};

export default Cell;
