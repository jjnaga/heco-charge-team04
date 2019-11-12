import React from "react";
import { Container, Message, Progress, Header, Item, Button } from "semantic-ui-react";
import PropTypes from 'prop-types';
import styled from "styled-components";


const Transaction = ({ starttime, energy }) => {
  console.log(starttime);
  console.log(energy);
  return (
    <div>
      <Item>
        <Item.Image size='tiny' src='#' />
        <Item.Content>
          <Item.Header as='a'>{starttime}</Item.Header>
          <Item.Meta>Energy: {energy}</Item.Meta>
        </Item.Content>
      </Item>
    </div>
  );
}

export default Transaction;

