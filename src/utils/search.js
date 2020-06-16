const cleanBestMatches = (bestMatches) => {
  return bestMatches.map((match) => {
    return {
      value: match["1. symbol"],
      label: `${match["2. name"]} (${match["1. symbol"]})`,
    };
  });
};

exports.cleanBestMatches = cleanBestMatches;
