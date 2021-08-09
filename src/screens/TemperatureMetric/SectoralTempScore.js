/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, CircularProgress } from '@material-ui/core';
import getRequestData from '../../util/RequestData';
import { getSectoralTempScore } from '../../redux/actions/tempMetricActions';
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar';

const SectoralTempScore = () => {
	const dispatch = useDispatch();

	const auth = useSelector((state) => state.auth);
	const sectoralTempScore = useSelector((state) => state.tempMetric.sectoralTempScore);

	const [ chartData, setChartData ] = useState([]);
	const [ chartCategories, setChartCategories ] = useState([]);
	const { filterItem, loading } = auth;
	const { scoreType, emission } = filterItem;

	const fetchDetails = async () => {
		const data = getRequestData('SECTORAL_TEMP_SCORE', auth);
		await dispatch(getSectoralTempScore(data));
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			getChartData();
		},
		[ sectoralTempScore ]
	);
	const getScoreType = () => {
		if (scoreType === 'shortTerm') {
			return 'short';
		} else if (scoreType === 'longTerm') {
			return 'long';
		} else {
			return 'mid';
		}
	};

	const getChartData = () => {
		let chartCategories = [];
        let portValues =[]
        let benchValues = []
        let chartData =[]

		if (
			sectoralTempScore &&
			sectoralTempScore['data'] &&
			Object.keys(sectoralTempScore['data']).length > 0
		) {
			const score = getScoreType();
			const res = sectoralTempScore['data'][score][emission];
            if(res && Object.keys(res).length > 0){
                Object.keys(res).map(sector=>{
                    const portValue = res[sector]['portfolio_score'] ? res[sector]['portfolio_score'] : 0
                    const benchValue = res[sector]['benchmark_score'] ? res[sector]['benchmark_score'] : 0
                    portValues.push(portValue)
                    benchValues.push(benchValue)
                    chartCategories.push(sector)
                })
            }
		}
        chartData = [
			{
				name: 'portfolio',
				data: portValues
			},
			{
				name: 'benchmark',
				data: benchValues
			}
		];
		setChartData(chartData);
		setChartCategories(chartCategories);
	};

	return (
		<React.Fragment>
			{loading ? (
				<CircularProgress />
			) : sectoralTempScore.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{sectoralTempScore.error}
				</Box>
			) : (
				<React.Fragment>
					<HorizontalBar
						categories={chartCategories}
						data={chartData}
						chartKey="CONTRIBUTION_ANALYSIS"
						isLegend={false}
					/>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default SectoralTempScore;
