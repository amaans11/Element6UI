import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CONFIG from '../../../util/config';

function LineChart({ data, chartKey, yAxisTitle, subtitle,chartTitle }) {
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
      		height:500
		},
		title: {
			text: title,
			align: 'left',
			x: 20,
			y: 25
		},
		subtitle: {
			text: subtitle ? subtitle : null,
			align: 'left'
		},
		xAxis: {
			type: 'datetime',
			title: {
				text: 'Date'
			},
			labels: {
				style: {
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000'
				}
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: yAxis,
				align: 'high',
				style: {
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000'
				}
			},
			labels: {
				overflow: 'justify',
				style: {
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000'
				}
			},
		},
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				marker: {
					enabled: false
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
