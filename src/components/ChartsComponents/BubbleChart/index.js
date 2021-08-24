import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CONFIG from '../../../util/config';

function ColumnChart({ data, chartKey, yAxisTitle, subtitle, xAxisTitle, xAxisLabel, yAxisLabel, zAxisLabel }) {
	const title = CONFIG['CHART'][chartKey]['TITLE'];

	const currentTheme = localStorage.getItem('appTheme');
	const options = {
		chart: {
			type: 'bubble',
			zoomType: 'xy',
			borderWidth:0
		},
		title: {
			text: title,
			align: 'left',
			y: 25,
			style:{
				fontFamily:"Roboto, Helvetica, Arial, sans-serif",
			}
		},
		subtitle: {
			text: subtitle ? subtitle : null,
			align: 'left'
		},
		xAxis: {
			gridLineWidth: 1,
			gridLineColor: currentTheme === 'dark' ? '#403e38' : 'rgb(221,221,221)',
			title: {
				text: xAxisTitle,
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
			startOnTick: false,
			endOnTick: false,
			gridLineColor: currentTheme === 'dark' ? '#403e38' : 'rgb(221,221,221)',
			title: {
				text: yAxisTitle,
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
			maxPadding: 0.2
		},
		tooltip: {
			useHTML: true,
			headerFormat: '<table>',
			pointFormat:
				'<tr><th colspan="2"><h3>{point.company}</h3></th></tr>' +
				'<tr><th>' +
				xAxisLabel +
				':</th><td>{point.x}</td></tr>' +
				'<tr><th>' +
				yAxisLabel +
				':</th><td>{point.y}</td></tr>' +
				'<tr><th>' +
				zAxisLabel +
				':</th><td>{point.z}</td></tr>',
			footerFormat: '</table>',
			followPointer: true
		},
		plotOptions: {
			series: {
				dataLabels: {
					enabled: false,
					// format: '{point.company}',
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
					style: {
						fontWeight: 'normal',
						shadow: false
					}
				},
				borderWidth: 1,
				borderColor: currentTheme === 'dark' ? '#000000' : '#FFFFFF',
			}
		},
		legend: {
			itemStyle:{
				color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
				fontFamily:"Roboto, Helvetica, Arial, sans-serif",
				fontSize:12
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

export default ColumnChart;
