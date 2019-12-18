/**
 * Stateless: https://medium.com/@npverni/how-to-declare-react-components-in-2017-2a90d9f7984c
 https://medium.com/tkssharma/build-graphql-application-with-node-js-react-js-part-2-404cd93c357b* 
 */
import React, { Component } from "react";
import Maps from "./Maps";
import Chart from "./Chart";
import Trans from "./Trans";
import Overview from "./Overview";
import Reconcilliation from "./Reconciliation";
import styled from "styled-components";
import { useQuery } from "urql";
import "../css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 21.475,
        lng: -158.1
      },
      zoom: 11,
      showReconcilliation: false,
      showChart: false,
      showTrans: false,
      stationData: null
    };
    this.updateStationData = this.updateStationData.bind(this);
    this.toggleReconcilliation = this.toggleReconcilliation.bind(this);
    this.toggleChart = this.toggleChart.bind(this);
    this.toggleTrans = this.toggleTrans.bind(this);
  }

  updateStationData(location) {
    const [{ data }] = useQuery({
      query: `{chargedata(where: {station: {_eq: ${location}}}) { starttime, endtime, duration, energy, amount }}`
    }).then(this.setState(prevState => ({ stationData: data.data })));
  }

  toggleReconcilliation() {
    this.setState(prevState => ({
      showReconcilliation: !prevState.showReconcilliation
    }));
  }

  toggleChart() {
    this.setState(prevState => ({ showChart: !prevState.showChart }));
  }

  toggleTrans() {
    this.setState(prevState => ({ showTrans: !prevState.showTrans }));
  }

  render() {
    const {
      center,
      zoom,
      showChart,
      showReconcilliation,
      stationData,
      showTrans
    } = this.state;

    return (
      <div>
        {/* flexbox to center two containers */}
        <Flexbox>
          <Overlay>
            <Maps
              center={center}
              zoom={zoom}
              handler={this.updateStationData}
            />
          </Overlay>
          <Content>
            <FlexLeft>
              <Overview
                data={stationData}
                toggleReconcile={this.toggleReconcilliation}
                toggleChart={this.toggleChart}
                toggleTrans={this.toggleTrans}
              />
            </FlexLeft>
            <FlexRight>
              {/* only show reconciliation when 'showReconcilliation' is true */}
              {showReconcilliation && (
                <Reconcilliation toggle={this.toggleReconcilliation} />
              )}
              {/* only show reconciliation when 'showReconcilliation' is true */}
              {showChart && <Chart toggle={this.toggleReconcilliation} />}
              {/* only show Transactions when 'transactions' is true */}
              {showTrans && <Trans toggle={this.toggleTrans} />}
            </FlexRight>
          </Content>
        </Flexbox>
      </div>
    );
  }
}

const Flexbox = styled.div`
  // flexbox
  display: grid;
  flex-direction: row;
  width: 100%;
`;

const Overlay = styled.div`
  grid-area: 1/1;
`;

const Content = styled.div`
  grid-area: 1/1;
  display: flex;
  width: 100%;
`;

const FlexLeft = styled.div`
  width: 300px;
`;

const FlexRight = styled.div`
  flex-grow: 1;
`;

export default App;
