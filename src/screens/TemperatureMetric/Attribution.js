import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';
import { getTempAttribution } from '../../redux/actions/tempMetricActions';
import ColumnChart from '../../components/ChartsComponents/ColumnChart';
import getRequestData from '../../util/RequestData';

const Attribution = ({}) => {
	const tempAttribution = useSelector((state) => state.tempMetric.tempAttribution);
	const auth = useSelector((state) => state.auth);

	const {loading}=auth;
	const { scoreType, emission } = auth.filterItem;

	const [ chartData, setChartData ] = useState([]);
	const [ categories, setCategories ] = useState([]);

	const dispatch = useDispatch();

	const fetchDetails = async () => {
		const data = getRequestData('TEMP_ATTRIBUTION', auth);
		await dispatch(getTempAttribution(data));
	};
	const getScoreType = () => {
		if (scoreType == 'shortTerm') {
			return 'short';
		} else if (scoreType == 'longTerm') {
			return 'long';
		} else {
			return 'mid';
		}
	};

	const getChartData = () => {
		const score = getScoreType();
		const data = tempAttribution && tempAttribution['data'] ? tempAttribution['data'][score] : {};
		let chartData = [];
		let categories = [];

		console.log('data', data);
		if (data && data.length > 0) {
			data.map((res) => {
				console.log('res>>', res);
				let xValue = res['points'][0]['x'];
				let yValue = res['points'][0]['y'][emission];

				chartData.push({
					name: res['name'],
					data: [ yValue ]
				});
				categories.push(xValue);
			});
		}
		setChartData(chartData);
		setCategories(categories);
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			getChartData();
		},
		[ tempAttribution ]
	);

	console.log('chartData', chartData);
	console.log('categories', categories);

	return (
		<React.Fragment>
			{loading ? (
				<CircularProgress />
			) : tempAttribution.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{tempAttribution.error}
				</Box>
			) : (
				<ColumnChart categories={categories} data={chartData} chartKey="TEMP_ATTRIBUTION" />
			)}
		</React.Fragment>
	);
};
export default Attribution;
