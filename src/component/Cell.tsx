import CellModel from "../models/Cell";
import GameState from "../models/GameState";
import GameBoard from "../models/GameBoard";
import ShipDirection from "../models/ShipDirection";
import { useState, useEffect } from "react";
import AppState from "../stores/AppState";

const Cell = ({ cell, player }: { cell: CellModel; player: boolean }) => {
  const [shipDirection, setShipDirection] = useState(AppState.shipDirection);
  const [gameBoard, setGameBoard] = useState(
    player ? AppState.playerBoard : AppState.cpuBoard
  );
  const [gameState, setGameState] = useState(AppState.gameState);
  const [hoveredCell, setHoveredCell] = useState(AppState.hoveredCell);

  useEffect(() => {
    const shipDirectionSubscription =
      AppState.shipDirectionObservable.subscribe(setShipDirection);
    const gameBoardSubscription = player
      ? AppState.playerBoardObservable.subscribe(setGameBoard)
      : AppState.cpuBoardObservable.subscribe(setGameBoard);
    const gameStateSubscription =
      AppState.gameStateObservable.subscribe(setGameState);
    const hoveredCellSubscription =
      AppState.hoveredCellObservable.subscribe(setHoveredCell);

    return () => {
      shipDirectionSubscription.unsubscribe();
      gameBoardSubscription.unsubscribe();
      gameStateSubscription.unsubscribe();
      hoveredCellSubscription.unsubscribe();
    };
  }, []);

  const onClick = () => {
    if (gameBoard) {
      if (player) {
        switch (gameState) {
          case GameState.SetUp:
            const isShipPlaced = gameBoard.setShipPosition(
              cell.x,
              cell.y,
              shipDirection
            );
            if (isShipPlaced) {
              if (gameBoard.shipQueue.length === 0)
                AppState.gameState = GameState.PlayerTurn;

              AppState.playerBoard = new GameBoard(gameBoard);
            }
            break;
          case GameState.Finished:
            break;
        }
      } else {
        switch (gameState) {
          case GameState.PlayerTurn:
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
            break;
          case GameState.Finished:
            break;
        }
      }
    }
  };

  const handleMouseEnter = () => {
    AppState.hoveredCell = cell;
  };

  const handleMouseLeave = () => {
    AppState.hoveredCell = undefined;
  };

  const getIsHovered = () => {
    if (gameBoard) {
      const ship = gameBoard.peekShipQueue();
      if (player && gameState === GameState.SetUp) {
        if (hoveredCell && ship) {
          if (shipDirection === ShipDirection.Horizontal) {
            if (
              cell.x >= hoveredCell.x &&
              cell.x < hoveredCell.x + ship.size &&
              cell.y === hoveredCell.y
            )
              return true;
          } else {
            if (
              cell.y >= hoveredCell.y &&
              cell.y < hoveredCell.y + ship.size &&
              cell.x === hoveredCell.x
            )
              return true;
          }
        }
      } else {
        if (cell === hoveredCell) return true;
      }
    }
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
        : getIsHovered()
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
