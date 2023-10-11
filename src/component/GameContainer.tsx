import { useState } from 'react';
import GameBoard from '../models/GameBoard';
import Cell from './Cell';

const GameContainer = () => {
  const [playerBoard, setPlayerBoard] = useState(new GameBoard());
  const [cpuBoard, setCpuBoard] = useState(new GameBoard());

  const gameContainerStyles: React.CSSProperties = {
    flex: '1',
    display: 'flex',
  };

  const rowStyles: React.CSSProperties = {
    display: 'flex',
  };

  return (
    <div style={gameContainerStyles}>
      <div>
        <p>Your Fleet</p>
        <div>
          {playerBoard.grid.map((row) => {
            return (
              <div style={rowStyles}>
                {row.map((cell) => {
                  return <Cell cell={cell} />;
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
                  return <Cell cell={cell} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
