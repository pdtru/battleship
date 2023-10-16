import { useEffect, useState } from 'react';
import GameBoard from '../models/GameBoard';
import Cell from './Cell';
import GameState from '../models/GameState';
import ShipDirection from '../models/ShipDirection';

const GameContainer = () => {
  const [playerBoard, setPlayerBoard] = useState(new GameBoard());
  const [cpuBoard, setCpuBoard] = useState(new GameBoard());
  const [gameState, setGameState] = useState(GameState.SetUp);
  const [shipDirection, setShipDirection] = useState(ShipDirection.Horizontal);
  const [gameMessage, setGameMessage] = useState('');

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key == 'r' && gameState == GameState.SetUp) {
        setShipDirection(
          shipDirection == ShipDirection.Horizontal
            ? ShipDirection.Vertical
            : ShipDirection.Horizontal
        );
      }
      console.log(shipDirection);
    };
    window.addEventListener('keypress', listener);
    return () => {
      window.removeEventListener('keypress', listener);
    };
  }, [gameState, shipDirection]);

  const gameContainerStyles: React.CSSProperties = {
    flex: 10,
    display: 'flex',
    alignItems: 'center',
  };

  const rowStyles: React.CSSProperties = {
    display: 'flex',
  };

  const textStyles: React.CSSProperties = {
    fontSize: '20px',
    margin: '8px',
    fontWeight: 600,
    color: 'rgba(105, 105, 105, 255)',
  };

  return (
    <div style={gameContainerStyles}>
      <div style={{ display: 'flex', gap: '80px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={textStyles}>Your Fleet</p>
          <div>
            {playerBoard.grid.map((row) => {
              return (
                <div style={rowStyles}>
                  {row.map((cell) => {
                    const onClick = () => {
                      switch (gameState) {
                        case GameState.SetUp:
                          playerBoard.setShipPosition(
                            cell.x,
                            cell.y,
                            shipDirection
                          );
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
        <div style={{ textAlign: 'center' }}>
          <p style={textStyles}>Opponent</p>
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
