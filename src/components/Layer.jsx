import { useContext, useEffect, useState } from 'react';
import { MapContext } from './MainPage';
import { MapService } from '../services/mapService';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import ImageSlider from './Slider';
import Legend from './Legend';
import './Layer.css';
import './PointList.css'
import { Style, Icon } from 'ol/style';
import PointList from './PointList';

export default function Layer() {
  const map = useContext(MapContext);
  const [layer, setLayer] = useState();
  const [popupContent, setPopupContent] = useState(null);
  const [overlay, setOverlay] = useState(null);
  const [points, setPoints] = useState([])

  const [filters, setFilters] = useState({
    quest: true,
    karaoke: true,
    other: true
  })

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'quest':
        return '/quest-point.png';
      case 'karaoke':
        return '/karaoke-point.png';
      default:
        return '/icon.png';
    }
  };

  const fetchPoints = async () => {
    try {
      const data = await MapService.getAll();
      if (layer && data.length > 0) {
        setPoints(data);
        const features = data
          .filter(point => filters[point.category])
          .map(point => {
            const [lon, lat] = point.coordinates;
            const feature = new Feature({
              geometry: new Point(fromLonLat([lon, lat])),
              name: point.name,
              position: point.position,
              id: point.id,
              category: point.category
            });

            const iconSrc = getCategoryIcon(point.category);

            const style = new Style({
              image: new Icon({
                src: iconSrc,
                scale: 0.05,
                opacity: 1
              })
            })

            feature.setStyle(style);
            return feature;
          });
        const vectorSource = layer.getSource();
        vectorSource.clear();
        vectorSource.addFeatures(features);
      }
    } catch (error) {
      console.error('Ошибка при загрузке точек:', error);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, [filters, layer])

  useEffect(() => {
    if (!map) return;

    const layer = new VectorLayer({
      source: new VectorSource({
        features: [],
      }),
    });

    setLayer(layer);
    map.addLayer(layer);

    const overlay = new Overlay({
      element: document.getElementById('popup'),
      autoPan: true,
    });
    map.addOverlay(overlay);

    setOverlay(overlay);

    const onMapClick = async (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (f) => f);
      if (feature) {
        const id = feature.get('id');
        try {
          const data = await MapService.getById(id);
          setPopupContent(data);

          const coordinates = feature.getGeometry().getCoordinates();
          overlay.setPosition(coordinates);
        } catch (error) {
          console.error('Ошибка при получении данных точки:', error);
        }
      } else {
        overlay.setPosition(undefined);
      }
    };

    map.on('click', onMapClick);

    return () => {
      map.removeLayer(layer);
      map.un('click', onMapClick);
    };

  }, [map]);

  const HandleFilterChange = (category) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  return (
    <>
      <div id='popup' className='op-popup'>
        {popupContent ? (
          <div className='popup_view'>
            <div>{popupContent.name}</div>
            {popupContent.position && (
              <div>{popupContent.position}</div>
            )}
            {popupContent.description && (
              <div className='popup_descr'>{popupContent.description}</div>
            )}
            {popupContent.images?.length > 0 && (
              <ImageSlider images={popupContent.images} overlay={overlay} />
            )}
          </div>
        ) : (
          <p>PICK ME</p>
        )}
      </div>

      <Legend filters={filters} onFilterChange={HandleFilterChange}></Legend>
      <PointList points={points}></PointList>
    </>

  );
}
