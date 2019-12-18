import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Card,
  Image,
  Popup,
  Progress,
  Header,
  Item,
  Form,
  Checkbox
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { useQuery } from "urql";

const getRecentData = `
  query getRecentData {
    chargedata(limit: 10, order_by: {endtime: desc}) {
      station
      id
      starttime
      endtime
      duration
      energy
    }
  }
`;

const getHealthData = `
  stations {
    name
    numPorts
    portsInUse
  }
`;

const Trans = ({ toggle }) => {
  let [{ fetching, error, data }] = useQuery({ query: getRecentData });
  if (fetching) return "Fetching";
  else if (error) {
    console.log(error);
    return "error";
  } else {
    let chargedata = data.chargedata;
    console.log("testetstest");
    console.log(chargedata);
    return (
      <Container>
        <Card.Group>
          {chargedata.map(row => {
            let { station, duration, starttime, endtime, energy, id } = row;
            starttime = new Date(starttime);
            return (
              <Card>
                <Card.Content>
                  <Card.Header as="h1">{id}</Card.Header>
                  <Card.Meta>{`${starttime.toLocaleString()}`}</Card.Meta>
                  <Card.Description>{energy}</Card.Description>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </Container>
    );
  }
};

const Container = styled.div`
  position: relative;
  margin: 25px;
  padding: 10px;
  height: 95vh;
  width: 30vw;
  top: 0;
  background: white;
  z-index: 2;
  border-radius: 20px;

  // flexbox
  display: flex;
  flex-direction: column;
`;

export default Trans;
