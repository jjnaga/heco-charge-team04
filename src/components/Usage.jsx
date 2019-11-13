import React from 'react';
import { useQuery } from "urql";
import { Container, Popup, Progress, Header, Button, Item, Icon } from "semantic-ui-react";
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
  }
  else {
    let stations = data.stations;
    let numPorts = 7;
    let portsInUse = 0;
    console.log(stations);

    stations.forEach(data => {
      if (data.portsInUse) portsInUse++;
    })
    console.log(portsInUse);
    console.log(portsInUse / numPorts * 100);

    return (
      <Popup flowing content="test" position="bottom right" offset="50, 0px"
        trigger={
          <Progress percent={Math.floor(portsInUse / numPorts * 100)} progress color="red">Active Ports</Progress>
        }
      >
        <Container>
          {stations.map(data => {
            let { name, numPorts, portsInUse } = data;
            return (
              <Container>
                <Item>
                  <Item.Header>{name}</Item.Header>.
                  <Progress percent={portsInUse * 100}></Progress>
                </Item>
              </Container>
            )
          })}
        </Container>
      </Popup>
    )
  }
}






export default Usage;