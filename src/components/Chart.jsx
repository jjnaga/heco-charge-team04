import React from 'react';
import styled from "styled-components";


// const getReconcileData = `
//   query MyQuery {
//     chargedata_reconcile {
//       amount
//       duration
//       endtime
//       energy
//       id
//       input
//       inputdate
//       payment
//       port
//       session
//       starttime
//       station
//     }
//   }
// `;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      station: 'test',
      start: 'mm/dd/yyyy hh:mm:ss',
      end: '',
      out: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //will update and refresh the class props live
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert('date: ' + this.state.station + " "
      + this.state.start + " "
      + this.state.end);
    event.preventDefault();
    //builds input statement for R script
    this.setState({
      out: `
    Station: \"${this.state.station}\"
    Start date: \"${this.state.start}\"
    End date: \"${this.state.end}\"
    `});
  }

  // console.log(data);
  render() {

    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <label>station</label>
          <input type="text" name="station" onChange={this.handleChange} />
          <br />
          <label>start</label>
          <input type="text" name="start" onChange={this.handleChange} />
          <br />
          <label>end</label>
          <input type="text" name="end" onChange={this.handleChange} />
          <br />
          <input type="submit" value="Submit" />
          <br />
          {this.state.out}
        </form>
      </Container>
    );
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
          top: 0;
          z-index: 1;
          background: white;
          border-radius: 20px;
        
        
          // flexbox
          display: flex;
          flex-direction: column;
        `;


export default Chart;