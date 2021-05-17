import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box,CircularProgress } from '@material-ui/core';
import { getCarbonAttribution } from '../../redux/actions/footprintActions';
import ColumnChart from '../../components/ChartsComponents/ColumnChart';
import getRequestData from '../../util/RequestData';

const CarbonAttribution = ({}) => {
	const carbonAttribution = useSelector((state) => state.footprint.carbonAttribution);
	const auth = useSelector((state) => state.auth);
	const {loading}=auth

	const [ chartData, setChartData ] = useState([]);
	const [ categories, setCategories ] = useState([]);

	const dispatch = useDispatch();

	const fetchDetails = async () => {
        const data = getRequestData('CARBON_ATTRIBUTION', auth);
		await dispatch(getCarbonAttribution(data));
	};

	const getChartData = () => {
		const data = carbonAttribution && Object.keys(carbonAttribution).length > 0 ? carbonAttribution['data'] : [];
		let chartData = [];
		let categories = [];

		if (data && data.length > 0) {
			data.map((res) => {
				let xValue = res['points'][0]['x'];
				let yValue = res['points'][0]['y'];

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
		[ carbonAttribution ]
	);

	return (
		<React.Fragment>
			{loading ? <CircularProgress /> : carbonAttribution.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{carbonAttribution.error}
				</Box>
			) : (
				<ColumnChart categories={categories} data={chartData} chartKey="CARBON_ATTRIBUTION" />
				
			)}
		</React.Fragment>
	);
};
export default CarbonAttribution;
