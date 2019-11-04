import React from "react";
import { Container, Message, Progress, Header, Item, Button } from "semantic-ui-react";
import PropTypes from 'prop-types';
import styled from "styled-components";

const Transaction = (energy, duration, amount, starttime, endtime) => {
  return (
    <Message>
      <Message.Header>{energy}</Message.Header>
    </Message>
  );
}

export default Transaction;

