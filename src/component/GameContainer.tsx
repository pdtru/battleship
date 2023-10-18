import { useEffect, useState } from "react";
import Cell from "./Cell";
import GameState from "../models/GameState";
import ShipDirection from "../models/ShipDirection";
import GameMessage from "./GameMessage";
import AppState from "../stores/AppState";
import GameController from "../controllers/GameController";

const GameContainer = () => {
  const [playerBoard, setPlayerBoard] = useState(AppState.playerBoard);
  const [cpuBoard, setCpuBoard] = useState(AppState.cpuBoard);
  const [gameState, setGameState] = useState(AppState.gameState);
  const [shipDirection, setShipDirection] = useState(AppState.shipDirection);

  useEffect(() => {
    const gameStateSubscription =
      AppState.gameStateObservable.subscribe(setGameState);
    const playerBoardSubscription =
      AppState.playerBoardObservable.subscribe(setPlayerBoard);
    const cpuBoardSubscription =
      AppState.cpuBoardObservable.subscribe(setCpuBoard);
    const shipDirectionSubscription =
      AppState.shipDirectionObservable.subscribe(setShipDirection);

    return () => {
      gameStateSubscription.unsubscribe();
      playerBoardSubscription.unsubscribe();
      cpuBoardSubscription.unsubscribe();
      shipDirectionSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "r" && gameState === GameState.SetUp) {
        AppState.shipDirection =
          shipDirection === ShipDirection.Horizontal
            ? ShipDirection.Vertical
            : ShipDirection.Horizontal;
      }
    };
    window.addEventListener("keypress", listener);
    return () => {
      window.removeEventListener("keypress", listener);
    };
  }, [gameState, shipDirection]);

  useEffect(() => {
    if (playerBoard && playerBoard.shipQueue.length === 0)
      AppState.gameState = GameState.PlayerTurn;
  }, [playerBoard]);

  useEffect(() => {
    if (gameState === GameState.CpuTurn && playerBoard) {
      GameController.executeCpuTurn();
    }
  }, [gameState]);

  const gameContainerStyles: React.CSSProperties = {
    flex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "42px",
  };

  const gameBoardStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: "16px",
  };

  const rowStyles: React.CSSProperties = {
    display: "flex",
  };

  const textStyles: React.CSSProperties = {
    fontSize: "20px",
    margin: "8px",
    fontWeight: 600,
    color: "rgba(105, 105, 105, 255)",
  };

  return (
    <div style={gameContainerStyles}>
      <GameMessage />
      <div style={{ display: "flex", gap: "120px" }}>
        <div style={gameBoardStyles}>
          <p style={textStyles}>Your Fleet</p>
          <div>
            {playerBoard &&
              playerBoard.grid.map((row, index) => {
                return (
                  <div style={rowStyles} key={index}>
                    {row.map((cell) => {
                      return (
                        <Cell
                          key={`${cell.x}${cell.y}`}
                          player={true}
                          cell={cell}
                        />
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
        <div style={gameBoardStyles}>
          <p style={textStyles}>Opponent</p>
          <div>
            {cpuBoard &&
              cpuBoard.grid.map((row, index) => {
                return (
                  <div style={rowStyles} key={index}>
                    {row.map((cell) => {
                      return (
                        <Cell
                          key={`${cell.x}${cell.y}`}
                          player={false}
                          cell={cell}
                        />
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
