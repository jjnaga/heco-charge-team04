import React from "react";
import { Container, Progress, Header, Button } from "semantic-ui-react";
import PropTypes from 'prop-types';
import styled from "styled-components";

class Overview extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <Container>
        <JjnContainer>
          <Header size="large">{location}</Header>
          <Progress percent={44} progress />

          <Menu>
            <Button.Group width='3'>
              <Button >Reconciliation</Button>
              <Button >Charts</Button>
              <Button >Documentation</Button>
            </Button.Group>
          </Menu>
        </JjnContainer>
      </Container >
    )
  }
}

const JjnContainer = styled.div`
  left: 0;
  margin: 20px;
  padding: 15px;
  width: 300px; // no idea what this does
  height: 95vh;
  top: 0;
  position: fixed;
  z-index: 1;
  background: white;
  border-radius: 20px;

  // flexbox
  display: flex;
  flex-direction: column;
`;

const Menu = styled.div`
  margin-top: auto;
`;


Overview.propTypes = {
  location: PropTypes.string.isRequired,
}


export default Overview;