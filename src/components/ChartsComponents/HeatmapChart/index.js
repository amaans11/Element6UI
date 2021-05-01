import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { get } from 'lodash';
import CONFIG from '../../../util/config';

function Heatmap({ data, xAxisCategories, chartKey, yAxisCategories, chartTitle, isSectoral }) {
	let title = chartTitle;
	if (!chartTitle) {
		title = CONFIG['CHART'][chartKey]['TITLE'];
	}
	const currentTheme = localStorage.getItem('appTheme');

	let options = {
		chart: {
			type: 'heatmap'
		},
		title: {
			text: title,
			align: 'left'
		},
		xAxis: {
			categories: xAxisCategories,
			title: {
				text: null
			},
			labels: {
				style: {
					color: currentTheme == 'dark' ? '#FFFFFF' : '#000000'
				}
			}
		},

		yAxis: {
			categories: yAxisCategories,
			reversed: true,
			title: {
				text: null
			},
			labels: {
				style: {
					color: currentTheme == 'dark' ? '#FFFFFF' : '#000000'
				}
			}
		},
		colorAxis: {
			min: 0,
			minColor: '#b9c8fa',
			maxColor: '#597ef7'
		},
		legend: {
			align: 'right',
			layout: 'vertical',
			verticalAlign: 'top',
			y: 35,
			symbolHeight: 310
		},
		tooltip: {
			formatter: function() {
				console.log(this.point);
				const xValue = xAxisCategories[this.point.options.x];
				const yValue = yAxisCategories[this.point.options.y];
				const zValue = this.point.options.value;

				return xValue + '<br />' + yValue + '<br />' + '<b>' + zValue + '</b>';
			}
		},
		series: [
			{
				borderWidth: 1,
				data: data
			}
		],
		plotOptions: {
			series: {
				dataLabels: {
					enabled: true,
					color: currentTheme == 'dark' ? '#FFFFFF' : '#000000',
					style: {
						fontWeight: 'normal',
						textOutline: 'none'
					}
				}
			}
		}
	};
	if (isSectoral) {
		options = {
			...options,
			chart: {
				...options.chart,
				height: 250
			}
		};
	}

	console.log('options>>', options);
	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
}
Heatmap.defaultProps = {
	isSectoral: false
};

export default Heatmap;
