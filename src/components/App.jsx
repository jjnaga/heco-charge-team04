import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Maps from "./Maps";
import Station from "./Station";
import '../css/App.css';

class App extends React.Component {
  static defaultProps = {
    center: {
      lat: 21.45,
      lng: -157.80
    },
    zoom: 11,
    stations: [
      { lat: 21.444746, lng: -158.012664 },
      { lat: 21.311357, lng: -157.854239 },
      { lat: 21.282148, lng: -157.827381 }
    ],
  };

  render() {
    return (
      <div className="app">
        <Station />
        <Maps
          center={this.props.center}
          zoom={this.props.zoom}
          stations={this.props.stations}
        />
      </div>
    );
  }
}

export default App;
