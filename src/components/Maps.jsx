import React from "react"
import GoogleMapReact from "google-map-react"
import { useQuery } from "urql"

import { gql } from "../utils"

// Old version
const _Maps = ({ center, zoom, handler }) => {
  const sendLocation = name => {
    console.log("working")
    handler(name)
  }

  // While not required, it's best practice to place React hooks as high as
  // possible in the component definition.
  const [res] = useQuery({
    query: `{stations {latitude, longitude, name}}`
  })

  const { fetching, error, data } = res
  // Because you are returning in your conditions,
  // you don't need to use an else.
  // When possible, keep your branching as flat and simple as they
  // can be.
  if (fetching) {
    return "Loading"
  } else if (error) {
    console.log(`Error Message: ${error}`)
    return "Error"
  } else {
    return (
      <div
        className="map"
        style={{ height: "100vh", width: "100vw", position: "relative" }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCiaKYomT-1e-Pe1l_D6cRDvwXsxCEhu-I" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {data.stations.map((data, index) => (
            <button
              key={index}
              lat={data.latitude}
              lng={data.longitude}
              onClick={() => sendLocation(data.name)}
            >
              {data.name}
            </button>
          ))}
        </GoogleMapReact>
      </div>
    )
  }
}

// Statically extract your query, this prevents it from being
// recreated on every render.
const query = gql`
  query allStations {
    stations {
      latitude
      longitude
      name
    }
  }
`

// Refactored version
const Maps = ({ center, zoom, handler }) => {
  const [{ fetching, error, data }] = useQuery({
    query
  })

  const sendLocation = name => handler(name)

  if (fetching) return "Loading"
  if (error) return "Error"

  return (
    <div
      className="map"
      style={{ height: "100vh", width: "100vw", position: "relative" }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCiaKYomT-1e-Pe1l_D6cRDvwXsxCEhu-I" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {data.stations.map((data, index) => (
          <button
            key={index}
            lat={data.latitude}
            lng={data.longitude}
            onClick={() => sendLocation(data.name)}
          >
            {data.name}
          </button>
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Maps
