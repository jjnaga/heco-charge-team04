import React from "react";
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import gql from "graphql-tag";
import Station from "./Station.jsx";
import { Query } from "react-apollo";

class Maps extends React.Component {
  render() {
    const { center, zoom, stations, handler } = this.props;

    const [result] = useQuery({
      query: `{stations: {
        name,
        latitude,
        longitude,
      }}`,
    })


    return (
      <div className="map" style={{ height: '100vh', width: "100vw", position: "relative" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCiaKYomT-1e-Pe1l_D6cRDvwXsxCEhu-I" }}
          defaultCenter={center}
          defaultZoom={zoom}
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
  handler: PropTypes.func.isRequired,
}

export default Maps;