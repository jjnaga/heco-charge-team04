import React from "react";
import GoogleMapReact from 'google-map-react';
import Station from "./Station";
import PropTypes from 'prop-types';

class Maps extends React.Component {
  render() {
    const { center, zoom, stations } = this.props;

    const items = [];

    for (const [index, value] of stations.entries()) {
      items.push(<Station lat={value.lat} lng={value.lng}></Station>)
    }

    return (
      <div className="map" style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCiaKYomT-1e-Pe1l_D6cRDvwXsxCEhu-I" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {items}
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
  stations: PropTypes.array.isRequired,
}

export default Maps;