import React from 'react';
import PropTypes from 'prop-types';
import {
  YMaps, Map, Placemark, ZoomControl,
} from '@pbe/react-yandex-maps';
import './MapContainer.scss';

const MapContainer = ({ mapCoord, placemarkCoords }) => {
  let curentCoord = '66.529927, 66.613034';
  const cleanCoord = (coord) => (
    coord.replace(/\[|\]/g, '').split(',').map(Function.prototype.call, String.prototype.trim)
  );

  try {
    curentCoord = cleanCoord(mapCoord);
  } catch (error) {
    console.log(error);
  }

  const placeMarkOptions = (coord) => (
    {
      geometry: coord,
      options: {
        iconLayout: 'default#image',
        iconImageHref: '/images/geo-top.png',
        iconImageSize: [25, 32],
      },
    }
  );

  const getRef = (ref) => {
    if (ref) {
      ref.behaviors.disable('scrollZoom');
    }
  };

  return (
    <YMaps>
      <Map
        instanceRef={getRef}
        className="map"
        height="100%"
        width="100%"
        state={{
          center: curentCoord,
          zoom: 15,
          behaviors: ['scrollZoom'],
        }}
        defaultState={{
          center: curentCoord,
          zoom: 15,
          controls: false,
        }}
        options={{
          suppressMapOpenBlock: true,
          suppressObsoleteBrowserNotifier: true,
          yandexMapAutoSwitch: true,
          yandexMapDisablePoiInteractivity: true,
        }}
      >
        {placemarkCoords ? (
          placemarkCoords.map((coord) => (
            <Placemark
              {...placeMarkOptions(cleanCoord(coord))}
            />
          ))
        ) : (
          <Placemark
            {...placeMarkOptions(curentCoord)}
          />
        )}
        <ZoomControl />
      </Map>
    </YMaps>
  );
};

MapContainer.propTypes = {
  mapCoord: PropTypes.string,
  placemarkCoords: PropTypes.arrayOf([PropTypes.string]),
};

MapContainer.defaultProps = {
  mapCoord: '66.529927, 66.613034',
  placemarkCoords: null,
};

export default MapContainer;
