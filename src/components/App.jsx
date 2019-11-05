/**
 * Stateless: https://medium.com/@npverni/how-to-declare-react-components-in-2017-2a90d9f7984c
 https://medium.com/tkssharma/build-graphql-application-with-node-js-react-js-part-2-404cd93c357b* 
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
        lat: 21.475,
        lng: -158.10
      },
      zoom: 11,
      location: "",
    }
    this.updateCurrentOverviewLocation = this.updateCurrentOverviewLocation.bind(this);
  }

  updateCurrentOverviewLocation(newLocation) {
    this.setState(state => ({
      location: newLocation,
    }))
  }

  render() {
    const { location, center, zoom } = this.state;

    return (
      <div>
        <Maps
          center={center}
          zoom={zoom}
          handler={this.updateCurrentOverviewLocation}
        />
        <Overview location={location} />
      </div>
    );
  }
}

export default App;
