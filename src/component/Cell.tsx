import CellModel from '../models/Cell';

const Cell = ({ cell }: { cell: CellModel }) => {
  const cellStyles: React.CSSProperties = {
    borderStyle: 'solid',
    width: '32px',
    height: '32px',
  };

  return (
    <div style={cellStyles}>
      <p>{cell.ship?.name ?? ''}</p>
    </div>
  );
};

export default Cell;
