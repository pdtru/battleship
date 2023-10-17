import { useEffect, useState } from "react";
import GameBoard from "../models/GameBoard";
import Cell from "./Cell";
import GameState from "../models/GameState";
import ShipDirection from "../models/ShipDirection";
import CellModel from "../models/Cell";
import GameMessage from "./GameMessage";

const GameContainer = () => {
  const [playerBoard, setPlayerBoard] = useState(new GameBoard());
  const [cpuBoard, setCpuBoard] = useState(new GameBoard());
  const [gameState, setGameState] = useState(GameState.SetUp);
  const [shipDirection, setShipDirection] = useState(ShipDirection.Horizontal);
  const [gameMessage, setGameMessage] = useState("");
  const [hoveredCell, setHoveredCell] = useState<CellModel>();
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key == "r" && gameState == GameState.SetUp) {
        setShipDirection(
          shipDirection == ShipDirection.Horizontal
            ? ShipDirection.Vertical
            : ShipDirection.Horizontal
        );
      }
    };
    window.addEventListener("keypress", listener);
    return () => {
      window.removeEventListener("keypress", listener);
    };
  }, [gameState, shipDirection]);

  useEffect(() => {
    cpuBoard.setRandomShips();
  }, []);

  useEffect(() => {
    if (playerBoard.shipQueue.length == 0) setGameState(GameState.PlayerTurn);
  }, [playerBoard]);

  useEffect(() => {
    if (gameState == GameState.CpuTurn) {
      playerBoard.hitRandomLocation();
      if (playerBoard.isDefeated()) {
        setGameState(GameState.Finished);
        setWinner("CPU");
      } else {
        setGameState(GameState.PlayerTurn);
      }
    }
  }, [gameState]);

  const gameContainerStyles: React.CSSProperties = {
    flex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "64px",
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
      <GameMessage gameState={gameState} winner={winner} />
      <div style={{ display: "flex", gap: "120px" }}>
        <div style={gameBoardStyles}>
          <p style={textStyles}>Your Fleet</p>
          <div>
            {playerBoard.grid.map((row, index) => {
              return (
                <div style={rowStyles} key={index}>
                  {row.map((cell) => {
                    const onClick = () => {
                      switch (gameState) {
                        case GameState.SetUp:
                          const isShipPlaced = playerBoard.setShipPosition(
                            cell.x,
                            cell.y,
                            shipDirection
                          );
                          if (isShipPlaced) {
                            if (playerBoard.shipQueue.length == 0)
                              setGameState(GameState.PlayerTurn);
                            setPlayerBoard(new GameBoard(playerBoard));
                          }
                          break;
                        case GameState.Finished:
                          break;
                      }
                    };
                    return (
                      <Cell
                        key={`${cell.x}${cell.y}`}
                        shipDirection={shipDirection}
                        setHoveredCell={setHoveredCell}
                        hoveredCell={hoveredCell}
                        onClick={onClick}
                        player={true}
                        gameState={gameState}
                        cell={cell}
                        gameBoard={playerBoard}
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
            {cpuBoard.grid.map((row, index) => {
              return (
                <div style={rowStyles} key={index}>
                  {row.map((cell) => {
                    const onClick = () => {
                      switch (gameState) {
                        case GameState.PlayerTurn:
                          if (!cell.isShot) {
                            if (cell.ship != null) cell.ship.health--;
                            cell.isShot = true;
                            if (cpuBoard.isDefeated()) {
                              setGameState(GameState.Finished);
                              setWinner("you");
                            } else {
                              setGameState(GameState.CpuTurn);
                            }
                            setCpuBoard(new GameBoard(cpuBoard));
                          }
                          break;
                        case GameState.Finished:
                          break;
                      }
                    };
                    return (
                      <Cell
                        key={`${cell.x}${cell.y}`}
                        shipDirection={shipDirection}
                        setHoveredCell={setHoveredCell}
                        hoveredCell={hoveredCell}
                        onClick={onClick}
                        player={false}
                        gameState={gameState}
                        cell={cell}
                        gameBoard={cpuBoard}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <p>{gameMessage}</p>
      </div>
    </div>
  );
};

export default GameContainer;
