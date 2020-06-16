import React from "react";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import axios from "axios";
import store from "../store/configureStore";
import { cleanBestMatches } from "../utils/search";

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbolData: [],
      chartData: {},
      loading: false,
      symbols: [
        {
          label: "International Business Machines Corporation (IBM)",
          value: "IBM",
        },
        {
          label: "Facebook (FB)",
          value: "FB",
        },

        {
          label: "Alphabet Inc. (GOOGL)",
          value: "GOOGL",
        },
      ],
    };
  }

  getData = (symbol) => {
    symbol = symbol["value"];
    var stockData = {};
    var indexData = {};

    this.setState({ loading: true });

    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NFTY&apikey= JRGRXX6G44NWEAK1`
      )
      .then((response) => {
        indexData = response.data;
      })
      .then(() => {
        axios
          .get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey= JRGRXX6G44NWEAK1`
          )
          .then((response) => {
            stockData = response.data;
          })
          .then(() => {
            this.setState({
              symbolData: [indexData, stockData],
            });
          })
          .then(() => {
            this.setState({ loading: false });
            // dispatching action
            store.dispatch({
              type: "GET_SYMBOL_DATA",
              symbolData: this.state.symbolData,
            });
          });
      })
      .then(() => {
        this.setState({ loading: false });
        store.subscribe(() => {
          console.log("subscribe", store.getState());
        });
      });
  };

  fetchSymbols = (searchTerm) => {
    if (searchTerm.trim() === "") {
      return;
    }
    axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=JRGRXX6G44NWEAK1`
      )
      .then((response) => {
        if (response["data"] && response["data"]["bestMatches"]) {
          let bestMatches = response["data"]["bestMatches"];
          this.setState({
            symbols: cleanBestMatches(bestMatches),
          });
        }
      });
  };

  render() {
    return (
      <div>
        <Select
          cacheOptions
          options={this.state.symbols}
          onChange={this.getData}
          noOptionsMessage={() => "Search Stock Symbol. Ex: IBM"}
          onInputChange={this.fetchSymbols}
        />
        <Form.Text className="text-muted"
        >
          {this.state.loading
            ? "Fetching data..."
            : "Select or Search stock symbols like IBM, APPL, etc.,. Be gentle, Alpha Vantage Standard API only allows 5 requests/min and 500/day :)"}
        </Form.Text>
      </div>
    );
  }
}
