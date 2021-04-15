import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Box} from '@material-ui/core';
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar';
import { getPortfolioEmission } from '../../redux/actions/footprintActions';

const getEmissionIntesity = (type) => {
	switch (type) {
		case 'Sc12':
			return '12_sect';
		case 'Sc123':
			return '123_sect';
		case 'Sc3':
			return '3_sect';
		default:
			return '12_sect';
	}
};
const getContribEmission = (type) => {
	switch (type) {
		case 'Sc12':
			return '12';
		case 'Sc123':
			return '123';
		case 'Sc3':
			return '3';
		default:
			return '12';
	}
};
const CarbonEmission = ({}) => {
	const portfolioEmission = useSelector((state) => state.footprint.portfolioEmission);
	const filterItem = useSelector((state) => state.auth.filterItem);
	const currentPortfolio = useSelector((state) => state.auth.currentPortfolio);
	const currentBenchmark = useSelector((state) => state.auth.currentBenchmark);
	const currentYear = useSelector((state) => state.auth.currentYear);
	const currentCurrency = useSelector((state) => state.auth.currentCurrency);
	const currentQuarter = useSelector((state) => state.auth.currentQuarter);
	const currentUser = useSelector((state) => state.auth.currentUser);

	const [ sectorIntensityData, setIntensityData ] = useState([]);
	const [ contribData, setContribData ] = useState([]);
	const [ sectorWeightData, setSectorWeightData ] = useState([]);
	const [ categories, setCategories ] = useState([]);
	const [ yAxisTitle, setYTitle ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const { inferenceType, emission } = filterItem;

	const dispatch = useDispatch();

	useEffect(() => {
		fetchDetails();
	}, []);

	useEffect(
		() => {
            if(portfolioEmission && portfolioEmission['data'] && Object.keys(portfolioEmission['data']).length > 0){
                getSectorIntensity();
                getSectorContribution();
                getSectorWeight();
            }
		},
		[ portfolioEmission ]
	);

	const fetchDetails = async () => {
		const { sector, footprintMetric, marketValue, assetClass } = filterItem;
		setLoading(true);
		const data = {
			asset_type: assetClass,
			benchmark: currentBenchmark.label,
			benchmark_date: currentBenchmark.value,
			client: currentUser.client,
			currency: currentCurrency,
			emissions_quarter: 'Q1',
			footprint_metric: footprintMetric,
			fundamentals_quarter: 'Q1',
			market_value: marketValue,
			portfolio: currentPortfolio.label,
			portfolio_date: currentPortfolio.value,
			quarter: currentQuarter,
			sector: sector,
			version: '',
			version_emissions: '11',
			version_fundamentals: '1',
			year: currentYear
		};
		await dispatch(getPortfolioEmission(data));
		setLoading(false);
	};

	const getChartData = (portData, benchData, emission) => {
		let portfolio = [];
		let benchmark = [];
		let result = [];

		if (portData  && Object.keys(portData).length > 0) {
			Object.keys(portData).map((sector) => {
				const portValue = portData[sector][emission];
				portfolio.push(portValue);
			});
		}
		if (benchData && Object.keys(benchData).length > 0) {
			Object.keys(benchData).map((sector) => {
				const portValue = benchData[sector][emission];
				benchmark.push(portValue);
			});
		}
		result = [
			{
				name: 'Portfolio',
				data: [ ...portfolio ]
			},
			{
				name: 'Benchmark',
				data: [ ...benchmark ]
			}
		];
		return result;
	};

	const getSectorIntensity = () => {
		const emissionIntensity = getEmissionIntesity(emission);

		let response = portfolioEmission['data']['data'];
		let yTitle = portfolioEmission['data']['chart_name'];

		let result = [];
		let categories = [];

		if (response && response.length > 0) {
			let portData =
				inferenceType == 'Avg'
					? response[0][0]['Portfolio_Avg_SectorIntensity']
					: response[0][1]['Portfolio_Max_SectorIntensity'];
			let benchData =
				inferenceType == 'Avg'
					? response[1][0]['Benchmark_Avg_SectorIntensity']
					: response[1][1]['Benchmark_Max_SectorIntensity'];

			result = getChartData(portData, benchData, emissionIntensity);
			categories = Object.keys(portData);
		}

		setIntensityData(result);
		setCategories(categories);
		setYTitle(yTitle);
	};
	const getSectorContribution = () => {
		const emissionContrib = getContribEmission(emission);

		let response = portfolioEmission['data']['data'];

		let result = [];

		if (response && response.length > 0) {
			let portData =
				inferenceType == 'Avg'
					? response[0][0]['Portfolio_Avg_SectorContribution']
					: response[0][1]['Portfolio_Max_SectorContribution'];
			let benchData =
				inferenceType == 'Avg'
					? response[1][0]['Benchmark_Avg_SectorContribution']
					: response[1][1]['Benchmark_Max_SectorContribution'];

			result = getChartData(portData, benchData, emissionContrib);
			
		}

		setContribData(result);
	};
	const getSectorWeight = () => {
		let response = portfolioEmission['data']['data'];

		let result = [];

		if (response && response.length > 0) {
			let portData =
				inferenceType == 'Avg'
					? response[0][0]['Portfolio_Avg_SectorWeights']
					: response[0][1]['Portfolio_Max_SectorWeights'];
			let benchData =
				inferenceType == 'Avg'
					? response[1][0]['Benchmark_Avg_SectorWeights']
					: response[1][1]['Benchmark_Max_SectorWeights'];

			result = getChartData(portData, benchData, 'Weight');
		}

		setSectorWeightData(result);
	};

	return (
		<React.Fragment>
			{portfolioEmission.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{portfolioEmission.error}
				</Box>
			) : (
				<Box>
					<HorizontalBar
						categories={categories}
						data={sectorIntensityData}
						chartKey="SECTOR_INTENSITY"
						yAxisTitle={yAxisTitle}
					/>
					<HorizontalBar
						categories={categories}
						data={contribData}
						chartKey="SECTOR_CONTRIBUTION"
						yAxisTitle={yAxisTitle}
					/>
					<HorizontalBar
						categories={categories}
						data={sectorWeightData}
						chartKey="SECTOR_WEIGHT"
						yAxisTitle={yAxisTitle}
					/>
				</Box>
			)}
		</React.Fragment>
	);
};

export default CarbonEmission;
