import React from 'react';
import GoogleMapReact from 'google-map-react';
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
      <div className="App" style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCiaKYomT-1e-Pe1l_D6cRDvwXsxCEhu-I" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <div>hi</div>
        </GoogleMapReact>
      </div >
    );
  }
}

export default App;
