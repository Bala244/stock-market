var cleanStockData = (stockData) => {
  let timeSeriesData = stockData["Time Series (Daily)"];
  let ohlc = [];

  Object.keys(timeSeriesData).forEach(function (key) {
    let date = Date.parse(key);
    let open = parseFloat(timeSeriesData[key]["1. open"]);
    let high = parseFloat(timeSeriesData[key]["2. high"]);
    let low = parseFloat(timeSeriesData[key]["3. low"]);
    let close = parseFloat(timeSeriesData[key]["4. close"]);

    ohlc.push([date, open, high, low, close]);
  });
  return ohlc.reverse();
};

const stockOptions = (data, symbol) => {
  return {
    yAxis: [
      {
        height: "75%",
        labels: { align: "right", x: -3 },
        title: { text: `${symbol}` },
      },
      {
        top: "75%",
        height: "25%",
        labels: { align: "right", x: -3 },
        offset: 0,
        title: { text: "MACD" },
      },
    ],
    series: [
      {
        data: data,
        type: "spline",
        name: `${symbol} Stock Price`,
        id: `${symbol}`,
      },
      {
        type: "pivotpoints",
        linkedTo: `${symbol}`,
        zIndex: 0,
        lineWidth: 1,
        dataLabels: {
          overflow: "none",
          crop: false,
          y: 4,
          style: { fontSize: 9 },
        },
      },
      { type: "macd", yAxis: 1, linkedTo: `${symbol}` },
    ],
  };
};

exports.cleanStockData = cleanStockData;
exports.stockOptions = stockOptions;
