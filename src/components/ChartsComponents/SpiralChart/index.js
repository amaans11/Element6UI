import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CONFIG from '../../../util/config';

function SpiralChart({ data, chartKey, subtitle, chartTitle }) {
	let title = chartTitle;
	if (!chartTitle) {
		title = CONFIG['CHART'][chartKey]['TITLE'];
	}
	const currentTheme = localStorage.getItem('appTheme');

	const options = {
		chart: {
			type: 'column',
			inverted: true,
			polar: true
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
			tickInterval: 1,
			title: {
				text: null
			},
			labels: {
				enabled:false,
				allowOverlap: true,
				style: {
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000'
				}
			}
		},
		yAxis: {
			max: 5,
			tickInterval: 1,
			labels: {
				style: {
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000'
				}
			},
			showLastLabel: true
		},
		legend: {
			enabled: false,
		},
		tooltip: {
			formatter: function() {
				const xValue = this.point.x === 0 ? 'Portfolio' : this.point.x === 1 ? 'Benchmark' : 'Default Score';
				const yValue = this.point.options.y;

				// eslint-disable-next-line
				return '<b>' + xValue + ':' + '</b>' + yValue  ;
			}
		},

		plotOptions: {
			series: {
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
					enabled: true,
					inside: true,
					allowOverlap: true
				}
			}
		},
		series: [
			{
				colorByPoint: true,
				data: data
			}
		]
	};

	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
}

export default SpiralChart;
