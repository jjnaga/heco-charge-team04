import React from "react";
import { useQuery } from "urql";
import {
  Container,
  Popup,
  Progress,
  Header,
  Button,
  Item,
  Icon
} from "semantic-ui-react";
import styled from "styled-components";

const getHealthData = `
query MyQuery {
  stations {
    name
    numPorts
    portsInUse
  }
}

`;

const Usage = () => {
  let [{ fetching, error, data }] = useQuery({ query: getHealthData });
  if (fetching) return "Fetching";
  else if (error) {
    console.log(error);
    return "error";
  } else {
    let stations = data.stations;
    let numPorts = 7;
    let portsInUse = 0;
    console.log(stations);

    stations.forEach(data => {
      if (data.portsInUse) portsInUse++;
    });
    console.log(portsInUse);
    console.log((portsInUse / numPorts) * 100);

    return (
      <Container>
        {stations.map(data => {
          let { name, numPorts, portsInUse } = data;
          return (
            <Container>
              <Item>
                <Item.Header>{name}</Item.Header>.
                <Progress percent={portsInUse * 100} />
              </Item>
            </Container>
          );
        })}
      </Container>
    );
  }
};

export default Usage;
