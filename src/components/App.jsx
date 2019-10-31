/**
 * Stateless: https://medium.com/@npverni/how-to-declare-react-components-in-2017-2a90d9f7984c
 * 
 */
import React, { Component } from 'react';
import Maps from "./Maps";
import Overview from "./Overview";
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 21.45,
        lng: -157.80
      },
      zoom: 10,
      location: "kalihi",
    }
    this.updateCurrentOverviewLocation = this.updateCurrentOverviewLocation.bind(this);
  }

  updateCurrentOverviewLocation(newLocation) {
    this.setState(state => ({
      location: newLocation,
    }))
  }

  render() {
    const stations = require("../db.js");

    const { location, center, zoom } = this.state;

    return (
      <div id="container">
        <Maps
          center={center}
          zoom={zoom}
          stations={stations}
          handler={this.updateCurrentOverviewLocation}
        />
        <Overview location={location} />
      </div>
    );
  }
}

export default App;
