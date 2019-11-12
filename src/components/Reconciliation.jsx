import React from 'react';
import styled from "styled-components";
import { Popup, Progress, Header, Button, Item } from "semantic-ui-react";
import PropTypes from 'prop-types';
import { useQuery } from "urql";


const getReconcileData = `
  query MyQuery {
    chargedata_reconcile {
      amount
      duration
      endtime
      energy
      id
      input
      inputdate
      payment
      port
      session
      starttime
      station
    }
  }
`;

const Reconcilliation = ({ toggle }) => {
  const [{ fetching, error, data }] = useQuery({ query: getReconcileData });
  if (fetching) return "Fetching";
  else if (error) {
    console.log(error);
    return "error";
  }

  else {
    let reconcileData = data.chargedata_reconcile;
    console.log(reconcileData);

    return (
      <Container className="reconcile" >
        <Item.Group divided>
          {reconcileData.map(row => {
            let { station, duration, starttime, endtime, energy, id } = row;
            starttime = new Date(starttime);
            console.log(starttime);
            console.log(typeof starttime);
            return (
              <Item>
                <Item.Content>
                  <Item.Header as='a'>{station}</Item.Header>
                  <Item.Meta>{`${starttime.toLocaleString()}`}</Item.Meta>
                </Item.Content>
              </Item>
            )
          })}
        </Item.Group>
      </Container>
    )
  }
}

// const ExitContainer = styled.div`
//   margin-left: auto;
// `;

// const Header = styled.div`
//   display: flex;
//   width: 100%;
// `;

const Container = styled.div`
  margin: 25px;
  padding: 10px;
  height: 95vh;
  width: 30vw;
  top: 0;
  z-index: 1;
  background: white;
  border-radius: 20px;


  // flexbox
  display: flex;
  flex-direction: column;
`;


export default Reconcilliation;