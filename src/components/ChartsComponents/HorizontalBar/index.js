import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CONFIG from '../../../util/config';

function HorizontalBar({ data, categories, chartKey, yAxisTitle, subtitle, loading, chartTitle,isExportEnabled ,isEnabled,isFundOfFunds}) {
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
	const options = {
		chart: {
			type: 'bar',
			height:350
		},
		title: {
			text: title,
			align: 'left',
			x:5,
			y: 15,
			style:{
				fontFamily:"Roboto, Helvetica, Arial, sans-serif",
			}
		},
		subtitle: {
			text: subtitle ? subtitle : null,
			align: 'left'
		},
		xAxis: {
			categories: categories,
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
				}
			}
		},
		yAxis: {
			gridLineWidth: 0,
			title: {
				text: yAxis,
				align: 'high',
				x:-10,
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
				}
			}
		},
		tooltip: {
			formatter: function() {
				const item=isFundOfFunds ? 'Sector Intensity' : chartKey === 'FUND_TARGET_SETTINGS' ? this.colorIndex === 0 ? 'allowance' : 'contribution' : this.colorIndex === 0 ? 'portfolio' : 'benchmark'
				// eslint-disable-next-line
				return '<b>' + this.x + '</b>' + '<br/>' + '<b>' + item + ' : ' + '</b>'  + new Intl.NumberFormat().format(this.y) + ' (' + tooltipUnit  + ')';
			}
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: false
				}
			},
			series: {
				dataLabels: {
					enabled: true,
					color: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
					style: {
						fontWeight: 'normal',
						shadow: false,
					},

				},
				borderWidth: 1,
				borderColor: currentTheme === 'dark' ? '#000000' : '#FFFFFF'
			}
		},
		legend: {
			enabled:isEnabled === 'false' ? false : true,
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			y: 30,
			floating: true,
			borderWidth: 1,
			borderColor:currentTheme === 'dark' ? '#303030' : '#F5F5F5',
			backgroundColor:currentTheme === 'dark' ? '#303030' : '#F5F5F5',
			shadow: false,
			itemStyle:{
				fontFamily:"Roboto, Helvetica, Arial, sans-serif",
				fontSize:12,
				color:currentTheme === 'dark' ? '#F5F5F5' : '#303030',
			}
		},
		credits: {
			enabled: false
		},
		exporting: {
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
		series: data
	};

	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
}

export default HorizontalBar;
