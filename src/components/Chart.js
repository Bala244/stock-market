import Highcharts from "highcharts/highstock";
import React from "react";
import Alert from "react-bootstrap/Alert";

import store from "../store/configureStore";

import StockChart from "./Stock";

require("highcharts/indicators/indicators")(Highcharts);
require("highcharts/indicators/pivot-points")(Highcharts);
require("highcharts/indicators/ema")(Highcharts);
require("highcharts/indicators/macd")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);

var { cleanStockData, stockOptions } = require("../utils/chart");

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      nftyData: {},
      stockData: {},
      symbol: null,
      error: false,
    };
  }

  // cleaning data
  getData = () => {
    if (store.getState().state[1]["Meta Data"]) {
      this.setState({ error: false });
      this.setState({
        data: store.getState().state,
        nftyData: cleanStockData(store.getState().state[0]),
        stockData: cleanStockData(store.getState().state[1]),
        symbol: store.getState().state[1]["Meta Data"]["2. Symbol"],
      });
    } else {
      this.setState({ error: true });
    }
  };

  componentDidMount() {
    store.subscribe(this.getData);
  }

  renderCharts = () => (
    <div className="chart"style={{padding:"50px"}}>
      <h3>{this.state.symbol}</h3>
      <StockChart
        highcharts={Highcharts}
        options={stockOptions(this.state.stockData, this.state.symbol)}
      />
      <h3 className="text">NFTY</h3>
      <StockChart
        highcharts={Highcharts}
        options={stockOptions(this.state.nftyData, "NFTY")}
      />
    </div>
  );

  render() {
    return (
      <div>
        {this.state.error ? (
          <Alert className="text" variant={"danger"}>
            Oops! Something went wrong. Alpha Vantage did not send a valid
            response.
          </Alert>
        ) : null}
        {Object.keys(this.state.stockData).length !== 0
          ? this.renderCharts()
          : null}{" "}
      </div>
    );
  }
}



