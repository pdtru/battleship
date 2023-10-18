import { useState, useEffect } from "react";
import GameState from "../models/GameState";
import AppState from "../stores/AppState";

const GameMessage = () => {
  const [gameMessage, setGameMessage] = useState(AppState.gameMessage);
  const [gameState, setGameState] = useState(AppState.gameState);

  useEffect(() => {
    const gameMessageSubscription =
      AppState.gameMessageObservable.subscribe(setGameMessage);

    const gameStateSubscription =
      AppState.gameStateObservable.subscribe(setGameState);

    return () => {
      gameMessageSubscription.unsubscribe();
      gameStateSubscription.unsubscribe();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "48px",
        fontSize: "24px",
        fontWeight: 600,
        color: "rgba(105, 105, 105, 255)",
      }}
    >
      {gameState === GameState.SetUp ? (
        <p>Place Your Ships! Press R to rotate.</p>
      ) : null}
      {gameState === GameState.PlayerTurn ? <p>Shoot!</p> : null}
      {/* {gameState === GameState.CpuTurn ? <p>Enemy Turn</p> : null} */}
      {gameState === GameState.Finished ? (
        <div>
          <p>Game Over, {gameMessage} Won!</p>
        </div>
      ) : null}
    </div>
  );
};

export default GameMessage;
