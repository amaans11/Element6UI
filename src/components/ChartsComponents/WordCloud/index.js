import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  accessibility: {
    screenReaderSection: {
      beforeChartFormat:
        "<h5>{chartTitle}</h5>" +
        "<div>{chartSubtitle}</div>" +
        "<div>{chartLongdesc}</div>" +
        "<div>{viewTableButton}</div>",
    },
  },
  series: [
    {
      type: "wordcloud",
      data: data,
      name: "Occurrences",
    },
  ],
  title: {
    text: "Wordcloud of Lorem Ipsum",
  },
};

function SpiderWeb({ data }) {
  //options.series = data;
  const [optionData, setOptionData] = useState(options);
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={optionData} />
    </div>
  );
}

export default SpiderWeb;
