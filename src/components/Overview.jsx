import React from "react";
import { Container, Progress, Header, Item, Button } from "semantic-ui-react";
import PropTypes from 'prop-types';
import styled from "styled-components";

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


class Overview extends React.Component {

  /*https://blog.logrocket.com/the-new-react-lifecycle-methods-in-plain-approachable-language-61a2105859f3/*/
  componentDidMount() {
    console.log("I'm mounted");
  }

  componentWillUpdate() {

  }

  component

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


Overview.propTypes = {
  location: PropTypes.string.isRequired,
}


export default Overview;