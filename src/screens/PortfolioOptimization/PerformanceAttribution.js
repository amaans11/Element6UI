import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import { map,pluck } from 'lodash';
import { getPerformanceAttrData } from '../../redux/actions/optimizationActions';
import ColumnChart from '../../components/ChartsComponents/ColumnChart';

const PerformanceAttribution = () => {
	const dispatch = useDispatch();
	const [ chartData, setChartData ] = useState([]);
	const [ categories, setCategories ] = useState([]);

	const filterItem = useSelector((state) => state.auth.filterItem);
	const currentPortfolio = useSelector((state) => state.auth.currentPortfolio);
	const currentBenchmark = useSelector((state) => state.auth.currentBenchmark);
	const currentCurrency = useSelector((state) => state.auth.currentCurrency);
	const currentUser = useSelector((state) => state.auth.currentUser);
	const perfAttributionData = useSelector((state) => state.optimization.perfAttributionData);

	const getData = () => {
		let chartData = [];
		let categories = [];
        console.log("perfAttributionData",perfAttributionData)

		if (perfAttributionData && perfAttributionData['data'] && perfAttributionData['data'].length > 0) {
			perfAttributionData['data'].map((response, index) => {
                let res=response['points'];
                console.log("res",res)
				let values = map(res, 'y');
				if (index == 0) {
					categories = map(res, 'x');
				}
				chartData.push({
					name: response['name'],
					data: values
				});
			});
		}
        console.log("chartdata",chartData)
        console.log("categories",categories)

		setChartData(chartData);
		setCategories(categories);
	};
	const fetchDetails = async () => {
		const { sector, assetClass } = filterItem;
		const data = {
			client: currentUser.client,
			user: currentUser.userName,
			portfolio: currentPortfolio.label,
			portfolio_date: currentPortfolio.value,
			benchmark: currentBenchmark.label,
			benchmark_date: currentBenchmark.value,
			asset_type: assetClass,
			sector: sector,
			currency: currentCurrency,
			quarter_fundamentals: "Q1",
			quarter_emissions: "Q1",
			version_fundamentals: "1",
			version_emissions: "11",
			attribution_type: 'PerformanceAttribution',
			req_year: 1
		};
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
			{perfAttributionData.error ? (
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
