import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

Highcharts.setOptions({
  colors: Highcharts.getOptions().colors.map(function (color) {
    return {
      radialGradient: {
        cx: 0.4,
        cy: 0.3,
        r: 0.5,
      },
      stops: [
        [0, color],
        [1, Highcharts.color(color).brighten(-0.2).get("rgb")],
      ],
    };
  }),
});

const options = {
  chart: {
    type: "bar",
  },
  title: {
    text: "Historic World Population by Region",
  },
  subtitle: {
    text:
      'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>',
  },
  xAxis: {
    categories: ["Africa", "America", "Asia", "Europe", "Oceania"],
    title: {
      text: null,
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: "Population (millions)",
      align: "high",
    },
    labels: {
      overflow: "justify",
    },
  },
  tooltip: {
    valueSuffix: " millions",
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true,
      },
    },
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "top",
    x: -40,
    y: 80,
    floating: true,
    borderWidth: 1,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
    shadow: true,
  },
  credits: {
    enabled: false,
  },
  series: [],
};

function Scatter3d({ data }) {
  options.series = data;
  const [optionData, setOptionData] = useState(options);
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={optionData} />
    </div>
  );
}

export default Scatter3d;
