import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';


const YandexMap = () => {
  return (
        <YMaps
          enterprise
          query={{
            apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY,
          }}
        >
        <Map
          defaultState={{
            center: [53.211967, 50.177475],
            zoom: 16,
          }}
          style={{width: "100%", height:"100%"}}
        >
          <Placemark geometry={[53.211967, 50.177475]} />
        </Map>
      </YMaps>
  );
};

export default YandexMap