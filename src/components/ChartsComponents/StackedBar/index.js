import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import CONFIG from '../../../util/config'

function StackedBar({ data, categories, chartKey, yAxisTitle, subtitle }) {
  const title = CONFIG['CHART'][chartKey]['TITLE']
  let yAxis = yAxisTitle
  if (!yAxisTitle) {
    yAxis = CONFIG['CHART'][chartKey]['Y_AXIS_TITLE']
  }
  let xAxis = ''
  if (CONFIG['CHART'][chartKey]['X_AXIS_TITLE']) {
    xAxis = CONFIG['CHART'][chartKey]['X_AXIS_TITLE']
  }
  const currentTheme = localStorage.getItem('appTheme')

  const options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: title,
      align: 'left',
      x: 5,
      y: 25,
    },
    subtitle: {
      text: subtitle ? subtitle : null,
      align: 'left',
    },
    xAxis: {
      categories: categories,
      title: {
        text: xAxis,
		style:{
			color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
			fontSize:14,
			fontFamily:"Roboto, Helvetica, Arial, sans-serif",
		}
      },
      labels: {
		style:{
			color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
			fontSize:14,
			fontFamily:"Roboto, Helvetica, Arial, sans-serif",
		}
      },
    },
    yAxis: {
      min: 0,
      gridLineWidth: 0,
      title: {
        text: yAxis,
        align: 'high',
        style:{
			color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
			fontSize:14,
			fontFamily:"Roboto, Helvetica, Arial, sans-serif",
		}
      },
      labels: {
        overflow: 'justify',
        style:{
			color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
			fontSize:14,
			fontFamily:"Roboto, Helvetica, Arial, sans-serif",
		}
      },
    },

    plotOptions: {
      series: {
        stacking: 'normal',
        dataLabels: {
          enabled: false,
          color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
          style: {
            fontWeight: 'normal',
            textOutline: 'none',
          },
        },
        borderWidth: 1,
        borderColor: currentTheme === 'dark' ? '#000000' : '#FFFFFF',
      },
    },
    legend: {
      reversed: true,
      itemStyle: {
        color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
      },
    },
    series: data,
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default StackedBar
