import CellModel from "../models/Cell";
import GameState from "../models/GameState";
import GameBoard from "../models/GameBoard";
import ShipDirection from "../models/ShipDirection";

const Cell = ({
  shipDirection,
  setHoveredCell,
  hoveredCell,
  cell,
  gameState,
  player,
  gameBoard,
  onClick,
}: {
  shipDirection: ShipDirection;
  setHoveredCell: React.Dispatch<React.SetStateAction<undefined | CellModel>>;
  hoveredCell?: CellModel;
  cell: CellModel;
  gameState: GameState;
  player: boolean;
  gameBoard: GameBoard;
  onClick: () => void;
}) => {
  const handleMouseEnter = () => {
    setHoveredCell(cell);
  };

  const handleMouseLeave = () => {
    setHoveredCell(undefined);
  };

  const getIsHovered = () => {
    const ship = gameBoard.peekShipQueue();
    if (player && gameState === GameState.SetUp) {
      if (hoveredCell && ship) {
        if (shipDirection == ShipDirection.Horizontal) {
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
  };

  const cellStyles: React.CSSProperties = {
    margin: "1px",
    width: "42px",
    height: "42px",
    borderRadius: "4px",
    backgroundColor:
      player && cell.ship != null
        ? "#A3A3A3"
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
        (gameState === GameState.Playing && !player)
          ? handleMouseEnter
          : undefined
      }
      onMouseLeave={
        (gameState === GameState.SetUp && player) ||
        (gameState === GameState.Playing && !player)
          ? handleMouseLeave
          : undefined
      }
    ></div>
  );
};

export default Cell;
