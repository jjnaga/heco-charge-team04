import React from "react"
import { Popup, Progress, Header, Button, Item } from "semantic-ui-react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { useQuery } from "urql"

import { gql } from "../utils"

const getRecentData = gql`
  query getRecentData {
    chargedata(limit: 5, order_by: { endtime: desc }) {
      station
      id
      starttime
      endtime
      duration
      energy
    }
  }
`

// Old
const _Overview = ({ stationData, toggleReconcile, toggleChart }) => {
  const [{ fetching, error, data }] = useQuery({ query: getRecentData })

  // Just like in the other examples, reduce your conditional
  // branching if you are returning in your conditionals.
  if (fetching) return "Fetching"
  else if (error) return "error"
  else {
    // This is never re-assigned, so just use a const.
    // Also, this variable is never reused anywhere, so just
    // inline it.
    //
    // Also also, always camelCase your variable names.
    let chargedata = data.chargedata

    return (
      <Container>
        <Header size="large">HECO Monitoring</Header>
        <Popup
          content="test"
          position="bottom right"
          offset="50, 0px"
          trigger={
            <Progress percent={44} progress color="red">
              Overall Health
            </Progress>
          }
        />
        <Progress percent={25} progress color="green">
          Overall Congestion
        </Progress>
        <Header size="small">Recent Transactions</Header>
        <Item.Group divided>
          {chargedata.map(row => {
            // Reassigning a variable you just assigned is kinda... wonky.
            let { station, duration, starttime, endtime, energy, id } = row

            // If you need to derive a new value based on an existing one, just make a new variable instead.
            starttime = new Date(starttime)

            // You're missing a key on your <Item> component.
            return (
              <Item>
                <Item.Content>
                  <Item.Header as="a">{station}</Item.Header>
                  <Item.Meta>{`${starttime.toLocaleString()}`}</Item.Meta>
                </Item.Content>{" "}
              </Item>
            )
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
            <Button fluid>Documentation</Button>
          </Button.Group>
        </Menu>
      </Container>
    )
  }
}

// New
const Overview = ({ stationData, toggleReconcile, toggleChart }) => {
  const [{ fetching, error, data }] = useQuery({ query: getRecentData })

  if (fetching) return "Fetching"
  if (error) return "error"

  return (
    <Container>
      <Header size="large">HECO Monitoring</Header>

      <Popup
        content="test"
        position="bottom right"
        offset="50, 0px"
        trigger={
          <Progress percent={44} progress color="red">
            Overall Health
          </Progress>
        }
      />

      <Progress percent={25} progress color="green">
        Overall Congestion
      </Progress>

      <Header size="small">Recent Transactions</Header>

      <Item.Group divided>
        {data.chargedata.map(row => {
          const { station, starttime, id } = row
          const startDate = new Date(starttime)

          return (
            <Item key={id}>
              <Item.Content>
                <Item.Header as="a">{station}</Item.Header>
                <Item.Meta>{`${startDate.toLocaleString()}`}</Item.Meta>
              </Item.Content>
            </Item>
          )
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
          <Button fluid>Documentation</Button>
        </Button.Group>
      </Menu>
    </Container>
  )
}

const Container = styled.div`
  margin: 25px;
  padding: 10px;
  height: 95vh;
  top: 0;
  z-index: 1;
  background: white;
  border-radius: 20px;

  /** Once again, avoid redundant comments like this. The
  style definition is descriptive enough. */
  // flexbox
  display: flex;
  flex-direction: column;
`

const Menu = styled.div`
  margin-top: auto;
`

Overview.propTypes = {
  data: PropTypes.array,
  toggle: PropTypes.func.isRequired
}

export default Overview
