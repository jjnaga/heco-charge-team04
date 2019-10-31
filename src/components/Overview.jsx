import React from "react";
import { Container, Progress, Header, Item } from "semantic-ui-react";
import PropTypes from 'prop-types';
import styled from "styled-components";

const JjnContainer = styled.div`
  right: 0;
  margin: 20px;
  padding: 15px;
  width: 300px; // no idea what this does
  height: 100vh;
  top: 0;
  position: fixed;
  z-index: 1;
  background: white;
  border-radius: 20px;
`;


class Overview extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <Container>
        <JjnContainer>
          <Header size="large">{location}</Header>
          <Progress percent={44} progress />
          <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />
            <Item.Content>
              <Item.Header>Arrowhead Valley Camp</Item.Header>
              <Item.Meta>
                <span className='price'>$1200</span>
                <span className='stay'>1 Month</span>
              </Item.Meta>
              <Item.Description>Test</Item.Description>
            </Item.Content>
          </Item>
        </JjnContainer>
      </Container >
    )
  }
}


Overview.propTypes = {
  location: PropTypes.string.isRequired,
}


export default Overview;