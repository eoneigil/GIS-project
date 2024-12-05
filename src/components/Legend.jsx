import './Legend.css'; // Можно создать стиль для легенды

const Legend = () => {
  return (
    <div className="legend">
      <h3>Легенда</h3>
      <div className="legend-item">
        <img src="/quest-point.png" alt="Quest" className="legend-icon" />
        <span>Квесты</span>
      </div>
      <div className="legend-item">
        <img src="/karaoke-point.png" alt="Karaoke" className="legend-icon" />
        <span>Караоке</span>
      </div>
    </div>
  );
};

export default Legend;
