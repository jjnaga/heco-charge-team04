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
import BadData from "./BadData";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  Area,
  Bar
} from "recharts";
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

const MobileOverview = ({
  stationData,
  toggleReconcile,
  toggleChart,
  toggleTrans
}) => {
  let [{ fetching, error, data }] = useQuery({ query: getRecentData });
  if (fetching) return "Fetching";
  else if (error) {
    console.log(error);
    return "error";
  } else {
    let chargedata = data.chargedata;
    console.log(chargedata);

    return (
      <>
        <Message>
          <Message.Header>New Reconcile Items</Message.Header>
          <BadData />
        </Message>
        <Container>
          {/*         <LieChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 0, right: 30, left: -80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart> */}
          <Header size="large">HECO Monitoring</Header>
          <Header size="medium">
            <Clock
              format={"hh:mm:ss"}
              ticking={true}
              timezone={"Pacific/Honolulu"}
            />{" "}
          </Header>
          <Progress percent={25} progress color="green">
            Overall Congestion
          </Progress>
          <Usage />
        </Container>
      </>
    );
  }
};

const Container = styled.div`
  position: relative;
  margin: 25px;
  padding: 10px;
  height: 95vh;
  top: 0;
  z-index: 2;
  border-radius: 20px;

  // flexbox
  display: flex;
  flex-direction: column;
`;

const Menu = styled.div`
  margin-top: auto;
`;

export default MobileOverview;
