import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CONFIG from '../../../util/config';

function LineChart({ data, chartKey, yAxisTitle, subtitle,chartTitle,isCustomHeight }) {
	let title = chartTitle
	if(!chartTitle){
		 title = CONFIG['CHART'][chartKey]['TITLE'];
	}
	let yAxis = yAxisTitle;
	if (!yAxisTitle) {
		yAxis = CONFIG['CHART'][chartKey]['Y_AXIS_TITLE'];
	}
	const currentTheme = localStorage.getItem('appTheme');

	const options = {
		chart: {
			type: 'spline',
      		height:isCustomHeight ? 589 : 500
		},
		title: {
			text: title,
			align: 'left',
			x:5,
			y: 15,
			margin:30,
			style:{
				fontFamily:"Roboto, Helvetica, Arial, sans-serif",
			}
		},
		subtitle: {
			text: subtitle ? subtitle : null,
			align: 'left'
		},
		xAxis: {
			type: 'datetime',
			title: {
				text: 'Year',
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
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: yAxis,
				align: 'high',
				style:{
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
					fontSize:12,
					fontFamily:"Roboto, Helvetica, Arial, sans-serif",
				}
			},
			labels: {
				overflow: 'justify',
				style:{
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
					fontSize:12,
					fontFamily:"Roboto, Helvetica, Arial, sans-serif",
				}
			},
		},
		legend: {
			enabled: true,
			itemStyle:{
				color:currentTheme === 'dark' ? '#FFFFFF' : '#000000',
				fontSize:14,
				fontFamily:"Roboto, Helvetica, Arial, sans-serif",
			}
		},
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				marker: {
					enabled: true
				},
			}
		},
		
		series: data
	};

	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
}

export default LineChart;
