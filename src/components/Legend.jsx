import './Legend.css';

const Legend = ({ filters, onFilterChange }) => {
  return (
    <div className="legend">
      <h3>Легенда</h3>
      <div className="legend-item">
        <input
          type="checkbox"
          checked={filters.quest}
          onChange={() => onFilterChange('quest')}
        />
        <img src="/quest-point.png" alt="Quest" className="legend-icon" />
        <span>Квесты</span>
      </div>
      <div className="legend-item">
        <input
          type="checkbox"
          checked={filters.karaoke}
          onChange={() => onFilterChange('karaoke')}
        />
        <img src="/karaoke-point.png" alt="Karaoke" className="legend-icon" />
        <span>Караоке</span>
      </div>
    </div>
  );
};

export default Legend;
