import React from 'react';
import {Grid} from '@material-ui/core'
import BubbleChart from '../../components/ChartsComponents/BubbleChart';
import LineChart from '../../components/ChartsComponents/Line';

const bubbleChartData = [
	{
		data: [
			{ x: 95, y: 95, z: 13.8, name: 'BE', company: 'AMZN' },
			{ x: 86.5, y: 102.9, z: 14.7, name: 'DE', company: 'ALPL' },
			{ x: 80.8, y: 91.5, z: 15.8, name: 'FI', company: 'AMZN' },
			{ x: 80.4, y: 102.5, z: 12, name: 'NL', company: 'TMKV' },
			{ x: 80.3, y: 86.1, z: 11.8, name: 'SE', company: 'AMZN' }
		]
	}
];
const lineChartData = [
	{
		name: '',
		data: [
			[ 1422748800000, 100 ],
			[ 1738368000000, 106 ],
			[ 1896134400000, 109 ],
			[ 2053900800000, 112 ],
			[ 2211667200000, 115 ],
			[ 2369520000000, 116 ],
			[ 2527286400000, 116 ],
			[ 2685052800000, 117 ]
		]
	}
];
const PortfolioOverview = () => {
	return (
		<React.Fragment>
			<Grid container>
				<Grid item xs={6}>
					<BubbleChart
						chartKey="PORTFOLIO_SENTIMENT"
						data={bubbleChartData}
						xAxisLabel="Sentiment"
						yAxisLabel=""
						zAxisLabel="Weight"
					/>
				</Grid>
				<Grid item xs={6}>
					<LineChart data={lineChartData} chartKey="PORTFOLIO_SENTIMENT_SERIES" />
				</Grid>
			</Grid>
			<Grid container>
				<Grid item xs={6}>
					<BubbleChart
						chartKey="BENCHMARK_SENTIMENT"
						data={bubbleChartData}
						xAxisLabel="Sentiment"
						yAxisLabel=""
						zAxisLabel="Weight"
					/>
				</Grid>
				<Grid item xs={6}>
					<LineChart data={lineChartData} chartKey="BENCHMARK_SENTIMENT_SERIES" />
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default PortfolioOverview;
