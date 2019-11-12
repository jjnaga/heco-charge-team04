import React from "react";
import GoogleMapReact from 'google-map-react';
import { useQuery } from "urql";

// const Maps = (center, zoom) => (

//   {
//       < Query query = { getStations } >
//     {({ fetching, data, error }) => {
//   if (fetching) {
//     return "Loading";
//   }
//   else if (error) {
//     return error;
//   }

//   return (
//     <div class="buttons">
//       {data.stations.map(({ latitude, longitude, name }) => (
//         <button lat={latitude} lng={longitude} name={name}>{name}</button>
//       ))}
//     </div>
//   )
// }
//         }
//       </Query >
//     }
//   </GoogleMapReact >
// )

const Maps = ({ center, zoom, handler }) => {

  const sendLocation = (name) => {
    console.log("working");
    handler(name);
  }

  const [res] = useQuery({
    query: `{stations {latitude, longitude, name}}`,
  });

  const { fetching, error, data } = res;
  if (fetching) {
    return "Loading";
  } else if (error) {
    console.log(`Error Message: ${error}`);
    return "Error";
  }
  else {
    return (
      // TODO 11/5: we can't iterate components as far as I can tell, and this sucks.
      // TODO 11/5: nvm we can, we just need to wrap child component paramater in an object
      // FROM: const App = (name) =>
      // TO:   const App = ({name}) =>
      <div className="map" style={{ height: '100vh', width: "100vw", position: "relative" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCiaKYomT-1e-Pe1l_D6cRDvwXsxCEhu-I" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {
            data.stations.map((data, index) => (
              <button
                key={index}
                lat={data.latitude}
                lng={data.longitude}
                onClick={() => sendLocation(data.name)}
              >
                {data.name}
              </button>
            ))
          }
        </GoogleMapReact>
      </div >
    )
  }
}

export default Maps;