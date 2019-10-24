import React from "react";
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

class Maps extends React.Component {
  render() {
    const { center, zoom } = this.props;

    return (
      <div className="map" style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCiaKYomT-1e-Pe1l_D6cRDvwXsxCEhu-I" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >

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