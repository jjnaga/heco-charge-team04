import React from "react";
import { Popup, Progress, Header, Button, Item } from "semantic-ui-react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Clock from "react-live-clock";
import Usage from "./Usage";
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

const Overview = ({
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
      <Container>
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
        <Header size="small">Recent Transactions</Header>
        <Item.Group divided>
          {chargedata.map(row => {
            let { station, duration, starttime, endtime, energy, id } = row;
            starttime = new Date(starttime);
            console.log(starttime);
            console.log(typeof starttime);
            return (
              <Item>
                <Item.Content>
                  <Item.Header as="a">{station}</Item.Header>
                  <Item.Meta>{`${starttime.toLocaleString()}`}</Item.Meta>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
        <Menu>
          <Button.Group vertical width="3">
            <Button fluid onClick={toggleReconcile}>
              Reconciliation
            </Button>
            <Button fluid onClick={toggleChart}>
              Charts
            </Button>
            <Button fluid onClick={toggleTrans}>
              All Transactions
            </Button>
          </Button.Group>
        </Menu>
      </Container>
    );
  }
};

const Container = styled.div`
  position: relative;
  margin: 25px;
  padding: 10px;
  height: 95vh;
  top: 0;
  background: white;
  z-index: 2;
  border-radius: 20px;

  // flexbox
  display: flex;
  flex-direction: column;
`;

const Menu = styled.div`
  margin-top: auto;
`;

Overview.propTypes = {
  data: PropTypes.array,
  toggle: PropTypes.func.isRequired
};

export default Overview;
