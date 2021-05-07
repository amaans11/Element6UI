import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CONFIG from '../../../util/config';

function PieChart({ data, chartKey, yAxisTitle, subtitle, loading, chartTitle }) {
	const title = CONFIG['CHART'][chartKey]['TITLE'];

	const options = {
		chart: {
            type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
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
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
		plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                    distance: -50,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 4
                    }
                }
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

export default PieChart;
