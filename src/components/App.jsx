/**
 * Stateless: https://medium.com/@npverni/how-to-declare-react-components-in-2017-2a90d9f7984c
 * 
 */
import React, { Component } from 'react';
import Maps from "./Maps";
import Overview from "./Overview";
import '../css/App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://charge-data.herokuapp.com/v1/graphql"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 21.475,
        lng: -158.10
      },
      zoom: 11,
      location: "Kalihi",
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
      <ApolloProvider client={client}>
        <Maps
          center={center}
          zoom={zoom}
          stations={stations}
          handler={this.updateCurrentOverviewLocation}
        />
        <Overview location={location} />
      </ApolloProvider >
    );
  }
}

export default App;
