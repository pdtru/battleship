import CellModel from '../models/Cell';
import { useState } from 'react';
import GameState from '../models/GameState';

const Cell = ({
  cell,
  gameState,
  player,
  onClick,
}: {
  cell: CellModel;
  gameState: GameState;
  player: boolean;
  onClick: () => void;
}) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const cellStyles: React.CSSProperties = {
    margin: '1px',
    width: '42px',
    height: '42px',
    borderRadius: '4px',
    backgroundColor:
      cell.ship != null ? '#A3A3A3' : isHover ? '#E4E4E7' : '#F5F5F5',
  };

  return (
    <div
      style={cellStyles}
      onClick={onClick}
      onMouseEnter={
        (gameState == GameState.SetUp && player) ||
        (gameState == GameState.Playing && !player)
          ? handleMouseEnter
          : undefined
      }
      onMouseLeave={
        (gameState == GameState.SetUp && player) ||
        (gameState == GameState.Playing && !player)
          ? handleMouseLeave
          : undefined
      }
    ></div>
  );
};

export default Cell;
