import React from "react";
import {
  Popup,
  Progress,
  Header,
  Button,
  Item,
  Message
} from "semantic-ui-react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Clock from "react-live-clock";
import Usage from "./Usage";
import Maps from "./Maps";
import { useQuery } from "urql";

const getRecentData = `
query getRecentData {
  chargedata_reconcile(order_by: {endtime: desc}) {
    station
    id
    starttime
    endtime
    duration
    energy
  }
}
`;

const BadData = () => {
  let [{ fetching, error, data }] = useQuery({ query: getRecentData });
  if (fetching) return "Fetching";
  else if (error) {
    console.log(error);
    return "error";
  } else {
    let chargedata = data.chargedata_reconcile;
    console.log(chargedata);

    return (
      <Message.List>
        {chargedata.map(row => {
          let { station, duration, starttime, endtime, energy, id } = row;
          starttime = new Date(starttime);
          return (
            <Message.Item>{`Station ${station}, ${starttime}`}</Message.Item>
          );
        })}
      </Message.List>
    );
  }
};

export default BadData;
