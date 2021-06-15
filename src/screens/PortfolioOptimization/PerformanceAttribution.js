/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';
import { map } from 'lodash';
import { getPerformanceAttrData } from '../../redux/actions/optimizationActions';
import ColumnChart from '../../components/ChartsComponents/ColumnChart';
import getRequestData from '../../util/RequestData';

const PerformanceAttribution = () => {
	const dispatch = useDispatch();
	const [ chartData, setChartData ] = useState([]);
	const [ categories, setCategories ] = useState([]);

	const auth = useSelector((state) => state.auth);
	const perfAttributionData = useSelector((state) => state.optimization.perfAttributionData);

	const {loading}=auth;

	const getData = () => {
		let chartData = [];
		let categories = [];

		if (perfAttributionData && perfAttributionData['data'] && perfAttributionData['data'].length > 0) {
			perfAttributionData['data'].map((response, index) => {
                let res=response['points'];
				let values = map(res, 'y');
				if (index === 0) {
					categories = map(res, 'x');
				}
				chartData.push({
					name: response['name'],
					data: values
				});
			});
		}
		setChartData(chartData);
		setCategories(categories);
	};
	const fetchDetails = async () => {
        const data=getRequestData('PERFORMANCE_ATTRIBUTION',auth)
		await dispatch(getPerformanceAttrData(data));
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			getData();
		},
		[ perfAttributionData ]
	);
	return (
		<React.Fragment>
			{loading ? <CircularProgress /> : perfAttributionData.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{perfAttributionData.error}
				</Box>
			) : (
				<Box>
					<ColumnChart categories={categories} data={chartData} chartKey="PERFORMANCE_ATTRIBUTION" />
				</Box>
			)}
		</React.Fragment>
	);
};
export default PerformanceAttribution;
