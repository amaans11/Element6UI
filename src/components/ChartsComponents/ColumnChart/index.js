import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import CONFIG from '../../../util/config'

function ColumnChart({ data, categories,chartKey,yAxisTitle,subtitle,isLegend,isExportEnabled }) {
  const title =CONFIG['CHART'][chartKey]['TITLE']
  let yAxis=yAxisTitle;
  let legend = isLegend === false ? isLegend : true

  if(!yAxisTitle){
    yAxis=CONFIG['CHART'][chartKey]['Y_AXIS_TITLE']
  }
  let xAxisTitle=''
  if(CONFIG['CHART'][chartKey]['X_AXIS_TITLE']){
    xAxisTitle=CONFIG['CHART'][chartKey]['X_AXIS_TITLE']
  }

  const currentTheme = localStorage.getItem('appTheme');

  const options = {
    chart: {
      type: "column",
      height:550,
      zoomType: 'xy'
    },
    title: {
      text: title,
      align:'left',
      x:5,
			y: 15,
			margin:30,
      style:{
				fontFamily:"Roboto, Helvetica, Arial, sans-serif",
			}
    },
    subtitle:{
        text: subtitle ? subtitle : null,
        align:'left',
    },
    xAxis: {
        categories: categories,
        title: {
          text: xAxisTitle ? xAxisTitle : '',
          style:{
            color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
            fontSize:12,
            fontFamily:"Roboto, Helvetica, Arial, sans-serif",
          }
        },
        labels: {
          style:{
            color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
            fontSize:12,
            fontFamily:"Roboto, Helvetica, Arial, sans-serif",
          }
        },
      },
    yAxis: {
      gridLineColor: currentTheme === 'dark' ? '#403e38' : 'rgb(221,221,221)',
      title: {
          text:yAxis ,
          align: "high",
          style:{
            color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
            fontSize:12,
            fontFamily:"Roboto, Helvetica, Arial, sans-serif",
          }
        },
        labels: {
          overflow: "justify",
          style:{
            color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
            fontSize:12,
            fontFamily:"Roboto, Helvetica, Arial, sans-serif",
          }
        },
      },
      
    plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        },
        series: {
            dataLabels: {
                enabled: false,
                color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
                style: {
                    fontWeight: 'normal',
                    shadow: false
                }
            },
            borderWidth: 1,
            borderColor: currentTheme === 'dark' ? '#000000' : '#FFFFFF'
        }
      },
      legend: {
        enabled:legend,
        align: 'right',
        verticalAlign: 'top',
        itemStyle:{
            color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
            fontFamily:"Roboto, Helvetica, Arial, sans-serif",
          fontSize:12
        }
    },
    credits: {
      enabled: false
  },
    series: data,exporting: {
			enabled:isExportEnabled,
			buttons: {
			  contextButton: {
				menuItems: [
				  'printChart',
				  'separator',
				  'downloadPNG',
				  'downloadJPEG',
				  'downloadPDF',
				  'downloadSVG',
				  'separator',
				  'downloadCSV',
				  'downloadXLS',
				  'openInCloud',
				],
			  },
			},
		  },
  };
  
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default ColumnChart;
