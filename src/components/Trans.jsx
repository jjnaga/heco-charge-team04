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
    chargedata(limit: 5, order_by: {endtime: desc}) {
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
    console.log(chargedata);
    return <Container />;
  }
};
//
// const ExitContainer = styled.div`
//   margin-left: auto;
// `;

// const Header = styled.div`
//   display: flex;
//   width: 100%;
// `;

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
