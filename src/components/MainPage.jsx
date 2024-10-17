import { useEffect, useState } from 'react';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Tile as TileLayer } from 'ol/layer';
import OSM from 'ol/source/OSM';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import 'ol/ol.css';
import { MapService } from '../services/mapService';
import './mainPage.css'

function MainPage() {
  const [points, setPoints] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initialMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [],
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([92.8644, 56.0162]),
        zoom: 14,
      }),
    });

    setMap(initialMap);

    return () => initialMap.setTarget(undefined);
  }, []);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const data = await MapService.getAll();
        setPoints(data);
      } catch (error) {
        console.error('Ошибка при загрузке точек:', error);
      }
    };

    fetchPoints();
  }, []);

  useEffect(() => {
    if (map && points.length > 0) {
      const features = points.map(point => {
        const [lon, lat] = point.coordinates;
        const feature = new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          name: point.name,
        });
        return feature;
      });
      const vectorSource = map.getLayers().item(1).getSource();
      vectorSource.clear();
      vectorSource.addFeatures(features);
    }
  }, [map, points]);

  return (
    <div className='Main_Block'>
      <h1>Welcome!</h1>
      <div className='Map_Block' id="map"></div>
    </div>
  );
}

export default MainPage;
