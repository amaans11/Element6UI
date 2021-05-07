import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CONFIG from '../../../util/config';

function HorizontalBar({ data, categories, chartKey, yAxisTitle, subtitle, loading, chartTitle }) {
	let title = chartTitle;
	if (!chartTitle) {
		title = CONFIG['CHART'][chartKey]['TITLE'];
	}
	let yAxis = yAxisTitle;
	if (!yAxisTitle) {
		yAxis = CONFIG['CHART'][chartKey]['Y_AXIS_TITLE'];
	}
	const currentTheme = localStorage.getItem('appTheme');
	let tooltipUnit=CONFIG['CHART'][chartKey]['TOOLTIP_UNIT']

	if(!tooltipUnit){
		tooltipUnit=yAxis
	}
	console.log('data>>', data);

	const options = {
		chart: {
			type: 'bar'
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
			categories: categories,
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
			min: 0,
			gridLineWidth: 0,
			title: {
				text: yAxis,
				align: 'high',
				style: {
					color: currentTheme == 'dark' ? '#FFFFFF' : '#000000'
				}
			},
			labels: {
				style: {
					color: currentTheme == 'dark' ? '#FFFFFF' : '#000000'
				}
			}
		},
		tooltip: {
			formatter: function() {
				const item=this.colorIndex == 0 ? 'Portfolio' : 'Benchmark'
				return '<b>' + this.x + '</b>' + '<br/>' + '<b>' + item + ' : ' + '</b>'  + this.y + ' (' + tooltipUnit  + ')';
			}
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true
				}
			},
			series: {
				dataLabels: {
					enabled: true,
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
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 80,
			floating: true,
			borderWidth: 1,
			backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
			shadow: true
		},
		credits: {
			enabled: false
		},
		series: data
	};

	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
}

export default HorizontalBar;
