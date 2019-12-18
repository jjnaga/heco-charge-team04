import React, {useState} from 'react';
import styled from "styled-components";
import { Popup, Progress, Header, Button, Item, Form, Checkbox } from "semantic-ui-react";
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
  const [r_energy, setEnergy] = useState(0);
  const [r_duration, setDuration] = useState(0);
  const [r_amount, setAmount] = useState(0);
  if (fetching) return "Fetching";
  else if (error) {
    console.log(error);
    return "error";
  }

  else {
    let reconcileData = data.chargedata_reconcile;

    return (
      <Container className="reconcile" >
        <Item.Group divided>
          {reconcileData.map(row => {
            let { station, duration, starttime, endtime, energy, id, amount } = row;
            starttime = new Date(starttime);
            
            //update mutation
            const mutateReconcileData = `
              mutation updateReconcile {
                _typename
                update_chargedata_reconcile(where: {id: {_eq: \"${id}\"}}, 
                _set: {amount: "${r_amount}", duration: "${r_duration}", energy: "${r_energy}"}) {
                    returning {
                      id
                    }
                }
              }
            `;
            //on submission mutate the db
            const handleSubmit = () => {
            //  const [{ fetching, error, data }] = useQuery({ query: mutateReconcileData });
              alert(`id:\"${id}\" "${r_energy}\""${r_amount}\""${r_duration}\"submitted`);
            }
            const handleEnergyChange = e => {
              if ((e.target.value).match(/\d+\.{0,1}\d{0,2}/g != null)) {
              setEnergy(e.target.value);
              }
            }
            const handleDurationChange = e => {
              if ((e.target.value).match(/\d?\d:[0-5]\d:[0-5]\d/g != null)) {
                setDuration(e.target.value);
              }
            }
            const handleAmountChange = e => {
              if ((e.target.value).match(/\d+\.\d{2}/g != null)) {
              setAmount(e.target.value);
              }
              else
                alert(e.target.value," is in an invalid format");
            }
            //on change update props
            return (
              <Item>
                <Item.Content>
                  <Item.Header as='a'>{station}</Item.Header>
                  <Item.Meta>{`${starttime.toLocaleString()}`}</Item.Meta>
                  <Item.Content>id:{id}</Item.Content>
                </Item.Content>
                <Form>
                <Form.Field>
                  <label>Energy = {energy}</label>
                  <input type="text" name="energy" placeholder="Energy" onChange={handleEnergyChange} />
                </Form.Field>
                <Form.Field>
                  <label>Duration = {duration}</label>
                  <input type="text" name="duration" placeholder="Duration" onChange={handleDurationChange} />
                </Form.Field>
                <Form.Field>
                  <label>Amount = {amount}</label>
                  <input type="text" name="amount" placeholder="Amount" onChange={handleAmountChange} />
                </Form.Field>
                <button onClick={handleSubmit}>Submit</button>
              </Form>
              </Item>
              
            )
          })}
        </Item.Group>
      </Container>
    )
  }
}
//
// const ExitContainer = styled.div`
//   margin-left: auto;
// `;

// const Header = styled.div`
//   display: flex;
//   width: 100%;
// `;

const Container = styled.div`
  position: relative;
  margin: 25px;
  padding: 10px;
  height: 95vh;
  width: 30vw;
  top: 0;
  background: white;
  z-index: 2;
  border-radius: 20px;


  // flexbox
  display: flex;
  flex-direction: column;
`;


export default Reconcilliation;