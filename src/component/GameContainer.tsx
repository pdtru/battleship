import { useState } from 'react';
import GameBoard from '../models/GameBoard';
import Cell from './Cell';
import GameState from '../models/GameState';

const GameContainer = () => {
  const [playerBoard, setPlayerBoard] = useState(new GameBoard());
  const [cpuBoard, setCpuBoard] = useState(new GameBoard());
  const [gameState, setGameState] = useState(GameState.SetUp);
  const [gameMessage, setGameMessage] = useState('');

  const gameContainerStyles: React.CSSProperties = {
    flex: 3,
    display: 'flex',
    alignItems: 'center',
  };

  const rowStyles: React.CSSProperties = {
    display: 'flex',
  };

  return (
    <div style={gameContainerStyles}>
      <div style={{ display: 'flex', gap: '80px' }}>
        <div>
          <p>Your Fleet</p>
          <div>
            {playerBoard.grid.map((row) => {
              return (
                <div style={rowStyles}>
                  {row.map((cell) => {
                    const onClick = () => {
                      switch (gameState) {
                        case GameState.SetUp:
                          playerBoard.setShipPosition(cell.x, cell.y);
                          if (playerBoard.shipQueue.length == 0)
                            setGameState(GameState.Playing);
                          setPlayerBoard(new GameBoard(playerBoard));
                          break;
                        case GameState.Playing:
                          break;
                        case GameState.Finished:
                          break;
                      }
                    };
                    return (
                      <Cell
                        onClick={onClick}
                        gameBoard={playerBoard}
                        player={true}
                        gameState={gameState}
                        cell={cell}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p>Opponent</p>
          <div>
            {cpuBoard.grid.map((row) => {
              return (
                <div style={rowStyles}>
                  {row.map((cell) => {
                    const onClick = () => {
                      switch (gameState) {
                        case GameState.Playing:
                          break;
                        case GameState.Finished:
                          break;
                      }
                    };
                    return (
                      <Cell
                        onClick={onClick}
                        gameBoard={cpuBoard}
                        player={false}
                        gameState={gameState}
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

      <div>
        <p>{gameMessage}</p>
      </div>
    </div>
  );
};

export default GameContainer;
