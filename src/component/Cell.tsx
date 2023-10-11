import CellModel from '../models/Cell';
import { useState } from 'react';

const Cell = ({ cell }: { cell: CellModel }) => {
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
    backgroundColor: isHover ? '#E4E4E7' : '#F5F5F5',
  };

  return (
    <div
      style={cellStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p>{cell.ship?.name ?? ''}</p>
    </div>
  );
};

export default Cell;
