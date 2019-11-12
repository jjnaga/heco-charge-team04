import React from "react"
import styled from "styled-components"
import { Item } from "semantic-ui-react"
import { useQuery } from "urql"
import { gql } from "../utils"

const getReconcileData = gql`
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
`

// Old
const _Reconcilliation = ({ toggle }) => {
  const [{ fetching, error, data }] = useQuery({ query: getReconcileData })

  // Same as before.
  if (fetching) return "Fetching"
  else if (error) {
    console.log(error)
    return "error"
  } else {
    let reconcileData = data.chargedata_reconcile
    console.log(reconcileData)

    return (
      <Container className="reconcile">
        <Item.Group divided>
          {reconcileData.map(row => {
            // Same as before:
            let { station, duration, starttime, endtime, energy, id } = row

            // Same as before, just assign a new variable
            starttime = new Date(starttime)

            return (
              <Item>
                <Item.Content>
                  <Item.Header as="a">{station}</Item.Header>
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

// New
const Reconcilliation = ({ toggle }) => {
  const [{ fetching, error, data }] = useQuery({ query: getReconcileData })

  // Same as before.
  if (fetching) return "Fetching"
  if (error) return "error"

  return (
    <Container className="reconcile">
      <Item.Group divided>
        {data.chargedata_reconcile.reconcileData.map(row => {
          const { station, starttime, id } = row
          const startDate = new Date(starttime)

          return (
            <Item key={id}>
              <Item.Content>
                <Item.Header as="a">{station}</Item.Header>
                <Item.Meta>{startDate.toLocaleString()}</Item.Meta>
              </Item.Content>
            </Item>
          )
        })}
      </Item.Group>
    </Container>
  )
}

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
`

export default Reconcilliation
