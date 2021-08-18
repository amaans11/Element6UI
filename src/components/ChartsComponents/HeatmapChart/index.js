import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CONFIG from '../../../util/config';

function Heatmap({ data, xAxisCategories, chartKey, yAxisCategories, chartTitle, isSectoral,tabValue}) {
	let title = chartTitle;
	if (!chartTitle) {
		title = CONFIG['CHART'][chartKey]['TITLE'];
	}
	const currentTheme = localStorage.getItem('appTheme');

	console.log("yAxisCategories",yAxisCategories)

	let options = {
		chart: {
			type: 'heatmap',
			height:630 
		},
		title: {
			text: title,
			x:5,
			y:15,
			align: 'left',
			style:{
				fontFamily:"Roboto, Helvetica, Arial, sans-serif",
			}
		},
		xAxis: {
			categories: xAxisCategories,
			title: {
				text: null,
				style:{
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
					fontSize:12,
					fontFamily:"Roboto, Helvetica, Arial, sans-serif",
				}
			},
			labels: {
				style: {
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
					fontSize:12,
					fontFamily:"Roboto, Helvetica, Arial, sans-serif",
				},
				formatter: function () {
					return this.value.replace(/ /g, '<br />')
				},
				rotation:0
			}
		},

		yAxis: {
			categories: yAxisCategories,
			reversed: true,
			title: {
				text: null,
				style:{
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
					fontSize:12,
					fontFamily:"Roboto, Helvetica, Arial, sans-serif",
				}
			},
			labels: {
				style: {
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
					fontSize:12,
					fontFamily:"Roboto, Helvetica, Arial, sans-serif",				}
			}
		},
		colorAxis: {
			min: 0,
			max:100,
			minColor: currentTheme === 'dark' ? '#8bbc21':'#a7f7c1',
			maxColor: '#ff4d4f',
			reversed:false
		},
		legend: {
			align: 'right',
			layout: 'vertical',
			verticalAlign: 'top',
			y: 30,
			symbolHeight: chartKey === 'SCOPE3_HEATMAP' ? 540 : 150,
		},
		tooltip: {
			formatter: function() {
				const xValue = xAxisCategories[this.point.options.x];
				const yValue = yAxisCategories[this.point.options.y];
				const zValue = this.point.options.value;

				// eslint-disable-next-line
				return xValue + '<br />' + yValue + '<br />' + '<b>' + zValue + '</b>';
			}
		},
		series: [
			{
				borderWidth: 0.4,
				data: data
			}
		],
		plotOptions: {
			series: {
				dataLabels: {
					enabled: true,
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
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
	console.log(JSON.stringify(options))
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
