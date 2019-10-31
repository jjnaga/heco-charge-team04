import React from "react";
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';


class Maps extends React.Component {
  render() {
    const { center, zoom, stations, handler } = this.props;
    console.log(handler);
    return (
      <div className="map" style={{ height: '100vh', width: "100vw", position: "relative" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCiaKYomT-1e-Pe1l_D6cRDvwXsxCEhu-I" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {stations.stations.map((station, index) => (
            <div
              key={index}
              lat={station.lat}
              lng={station.lng}
            >
              {<button onClick={() => handler(station.station)}>{station.station}</button>}
            </div>
          ))}
        </GoogleMapReact>
      </div >
    )
  }
}

Maps.propTypes = {
  center: PropTypes.exact({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  zoom: PropTypes.number.isRequired,
  stations: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
}

export default Maps;