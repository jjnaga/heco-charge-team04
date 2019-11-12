import React, { useState } from "react"
import styled from "styled-components"

// old
class _Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      station: "test",
      start: "mm/dd/yyyy hh:mm:ss",
      end: "",
      out: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    //will update and refresh the class props live
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    alert(
      "date: " +
        this.state.station +
        " " +
        this.state.start +
        " " +
        this.state.end
    )
    event.preventDefault()
    //builds input statement for R script
    this.setState({
      out: `
    Station: \"${this.state.station}\"
    Start date: \"${this.state.start}\"
    End date: \"${this.state.end}\"
    `
    })
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
    )
  }
}

// New
const Chart = () => {
  const [state, setState] = useState({
    station: "test",
    start: "mm/dd/yyyy hh:mm:ss",
    end: ""
  })

  const handleChange = event => {
    setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    // Build escaped string for R script
    const escapedString = JSON.stringify(state)

    // TODO: Send this escapedString to your R server.
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <label>station</label>
          <input type="text" name="station" onChange={handleChange} />
        </InputGroup>

        <InputGroup>
          <label>start</label>
          <input type="text" name="start" onChange={handleChange} />
        </InputGroup>

        <InputGroup>
          <label>end</label>
          <input type="text" name="end" onChange={handleChange} />
        </InputGroup>

        <input type="submit" value="Submit" />
      </form>
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

  // flexbox
  display: flex;
  flex-direction: column;
`

// Some basic styles instead of using <br /> tags.
const InputGroup = styled.div`
  display: block;
  margin-bottom: 1rem;

  label {
    margin-right: 1rem;
  }
`

export default Chart
