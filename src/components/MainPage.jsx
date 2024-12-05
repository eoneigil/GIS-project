import { createContext, useEffect, useState } from 'react';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Tile as TileLayer } from 'ol/layer';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import './mainPage.css'
import Layer from './Layer';
import './Layer.css'

export const MapContext = createContext();

function MainPage() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initialMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
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

  

  
  return (
    <MapContext.Provider value={map}>
      <div className='Main_Block'>
        <h1>Welcome!</h1>
        <div className='Map_Block' id="map"></div>
        <Layer></Layer>
      </div>
    </MapContext.Provider>

  );
}

export default MainPage;
