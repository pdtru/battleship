import GameState from "../models/GameState";

const GameMessage = ({
  gameState,
  winner,
}: {
  gameState: GameState;
  winner: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "24px",
        fontSize: "24px",
        fontWeight: 600,
        color: "rgba(105, 105, 105, 255)",
      }}
    >
      {gameState == GameState.SetUp ? (
        <p>Place Your Ships! Press R to rotate.</p>
      ) : null}
      {gameState == GameState.PlayerTurn ? <p>Shoot!</p> : null}
      {/* {gameState == GameState.CpuTurn ? <p>Enemy Turn</p> : null} */}
      {gameState == GameState.Finished ? <p>Game Over, {winner} Won!</p> : null}
    </div>
  );
};

export default GameMessage;
