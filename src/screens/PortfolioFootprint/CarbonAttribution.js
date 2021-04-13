import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarbonAttribution } from '../../redux/actions/footprintActions';
import ColumnChart from '../../components/ChartsComponents/ColumnChart';

const CarbonAttribution = ({}) => {
	const currentPortfolio = useSelector((state) => state.auth.currentPortfolio);
	const currentBenchmark = useSelector((state) => state.auth.currentBenchmark);
	const currentYear = useSelector((state) => state.auth.currentYear);
	const currentCurrency = useSelector((state) => state.auth.currentCurrency);
	const currentQuarter = useSelector((state) => state.auth.currentQuarter);
	const currentUser = useSelector((state) => state.auth.currentUser);
	const filterItem = useSelector((state) => state.auth.filterItem);
	const carbonAttribution = useSelector((state) => state.footprint.carbonAttribution);

	const [ chartData, setChartData ] = useState([]);
	const [ categories, setCategories ] = useState([]);

	const dispatch = useDispatch();

	const fetchDetails = async () => {
		const { sector, footprintMetric, marketValue, assetClass, inferenceType, emission } = filterItem;

		const data = {
			client: currentUser.client,
			user: currentUser.userName,
			portfolio: currentPortfolio.label,
			portfolio_date: currentPortfolio.value,
			benchmark: currentBenchmark.label,
			benchmark_date: currentBenchmark.value,
			year: currentYear,
			quarter: currentQuarter,
			currency: currentCurrency,
			sector: sector,
			asset_type: assetClass,
			interference_type: inferenceType,
			emissions: emission,
			metric: footprintMetric,
			market_value: marketValue,
			quarter_fundamentals: 'Q1',
			quarter_emissions: 'Q1',
			version_fundamentals: '1',
			version_emissions: '11'
		};
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
				<ColumnChart categories={categories} data={chartData} chartKey="CARBON_ATTRIBUTION" />
		</React.Fragment>
	);
};
export default CarbonAttribution;
