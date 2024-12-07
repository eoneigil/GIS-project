import { useEffect, useState } from "react"
import './PointList.css'

const PointList = ({ points }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPoints, setFilteredPoints] = useState(points);

  useEffect(() => {
    setFilteredPoints(
      points.filter(
        (point) =>
          point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          point.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
          point.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, points]);

  return (
    <div className="Point_List">
      <h3>Спсисок Точек</h3>
      <input
        type="text"
        placeholder="Поиск"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredPoints.map((point) => (
          <li key={point.id}>
            <div>
              <strong>{point.name}</strong>
              <p>{point.category}</p>
              <p>{point.position}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PointList;