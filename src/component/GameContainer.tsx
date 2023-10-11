import { useState } from 'react';
import GameBoard from '../models/GameBoard';
import Cell from './Cell';
import { isReturnStatement } from 'typescript';

const GameContainer = () => {
  const [playerBoard, setPlayerBoard] = useState(new GameBoard());
  const [cpuBoard, setCpuBoard] = useState(new GameBoard());

  const rowStyles: React.CSSProperties = {
    display: 'flex',
  };

  return (
    <>
      <div>
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
          <div></div>
        </div>
      </div>
    </>
  );
};

export default GameContainer;
