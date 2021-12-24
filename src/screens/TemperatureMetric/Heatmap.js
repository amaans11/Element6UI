/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';
import {get} from 'lodash'
import { getHeatmapData } from '../../redux/actions/tempMetricActions';
import HeatmapChart from '../../components/ChartsComponents/HeatmapChart';
import getRequestData from '../../util/RequestData';

const Scope3Heatmap = () => {
	const dispatch = useDispatch();

	const auth = useSelector((state) => state.auth);
	const heatmapData = useSelector((state) => state.tempMetric.heatmapData);

	const [ chartData, setChartData ] = useState([]);
	const [ yCategories, setYCategories ] = useState([]);
	const [ xCategories, setXCategories ] = useState([]);

	const { loading, filterItem, userInfo } = auth;
	const { scoreType, emission } = filterItem;
	const trial = get(userInfo,'trial',false)

	const fetchDetails = async () => {
		const data = getRequestData('TEMP_HEATMAP', auth);
		await dispatch(getHeatmapData(data));
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			getChartData();
		},
		[ heatmapData ]
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
		let chartData = [];
		let xCategories = [];
		let yCategories = [];

		if (heatmapData && heatmapData['data'] && Object.keys(heatmapData['data']).length > 0) {
			const score = getScoreType();

			const res = heatmapData['data'][score][emission];

			if (res.length > 0) {
				res.map((data) => {
					if (!xCategories.includes(data.x)) {
						xCategories.push(data.x);
					}
					if (!yCategories.includes(data.y)) {
						yCategories.push(data.y);
					}
					const xValue = xCategories.indexOf(data.x);
					const yValue = yCategories.indexOf(data.y);

					chartData.push([ xValue, yValue, data.z ]);
				});
			}
		}

		setChartData(chartData);
		setYCategories(yCategories);
		setXCategories(xCategories);
	};
	return (
		<React.Fragment>
			{loading ? (
				<CircularProgress />
			) : heatmapData.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{heatmapData.error}
				</Box>
			) : (
				<React.Fragment>
					<Box >
					<HeatmapChart
						chartKey="PORT_HEATMAP"
						yAxisCategories={yCategories}
						data={chartData}
						xAxisCategories={xCategories}
						isSectoral={true}
						isExportEnabled={!trial}
					/>
					</Box>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default Scope3Heatmap;
