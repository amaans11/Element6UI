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
			plotBorderWidth: 1,
			zoomType: 'xy'
		},
		legend: {
			enabled: false
		},
		title: {
			text: title,
			align: 'left',
			y: 25
		},
		subtitle: {
			text: subtitle ? subtitle : null,
			align: 'left'
		},
		xAxis: {
			gridLineWidth: 1,
			title: {
				text: xAxisTitle
			},
			labels: {
				style: {
					color: currentTheme == 'dark' ? '#FFFFFF' : '#000000'
				}
			}
		},

		yAxis: {
			startOnTick: false,
			endOnTick: false,
			title: {
				text: yAxisTitle
			},
			labels: {
				style: {
					color: currentTheme == 'dark' ? '#FFFFFF' : '#000000'
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
					enabled: true,
					format: '{point.company}',
					color: currentTheme == 'dark' ? '#FFFFFF' : '#000000',
					style: {
						fontWeight: 'normal',
						shadow: false
					}
				},
				borderWidth: 1,
				borderColor: currentTheme == 'dark' ? '#000000' : '#FFFFFF'
			}
		},
		series: [
			{
				data: data,
				color: '#1890ff'
			}
		]
	};

	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
}

export default ColumnChart;
