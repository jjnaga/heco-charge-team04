import React from 'react';
import GoogleMapReact from 'google-map-react';
import Maps from "./Maps";
import '../css/App.css';

class App extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <Maps center={this.props.center} zoom={this.props.zoom} />
    );
  }
}

export default App;
