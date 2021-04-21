import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import LineChart from '../../components/ChartsComponents/Line';
import { getPortOptimizationData } from '../../redux/actions/optimizationActions';
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar';
import DataTable from '../../components/Table/DataTable';

const headCells = [
	{
		name: '',
		selector: 'name',
		sortable: true,
		right: false,
		wrap: true
	},
	{
		name: 'Portfolio',
		selector: 'portfolio',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.portfolio)}</div>
	},
	{
		name: 'Benchmark',
		selector: 'benchmark',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.benchmark)}</div>
	},
	{
		name: 'Tilted',
		selector: 'tilted',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.Sc123)}</div>
	}
];
const categories = [ 'Scope 1+2', 'Scope 3', 'Scope 1+2+3' ];

const PortfolioOptimization = () => {
	const dispatch = useDispatch();

	const [ loading, setLoading ] = useState(false);
	const [ yAxisTitle, setYAxisTitle ] = useState('');
	const [ lineChartData, setLineChartData ] = useState([]);
	const [ tableData, setTableData ] = useState([]);
	const [ intensityData, setIntensityData ] = useState([]);
	const [ weightCategories, setWeightCategories ] = useState([]);
	const [ contribCategories, setContribCategories ] = useState([]);
	const [ weightData, setWeightData ] = useState([]);
	const [ contribData, setContribData ] = useState([]);

	const filterItem = useSelector((state) => state.auth.filterItem);
	const currentPortfolio = useSelector((state) => state.auth.currentPortfolio);
	const currentBenchmark = useSelector((state) => state.auth.currentBenchmark);
	const currentCurrency = useSelector((state) => state.auth.currentCurrency);
	const currentUser = useSelector((state) => state.auth.currentUser);
	const optimizationData = useSelector((state) => state.optimization.optimizationData);

	const formatDate = (currentDate) => {
		const year = currentDate.toString().slice(0, 4);
		const month = currentDate.toString().slice(4, 6) - 1;
		const date = currentDate.toString().slice(6, 8);
		return { year, month, date };
	};
	const getTableKey = (key) => {
		switch (key) {
			case 'Annualised1Y':
				return 'Annualized (1Y)';
			case 'Annualised3Y':
				return 'Annualized (3Y)';
			case 'Annualised5Y':
				return 'Annualized (5Y)';
			case 'Return3Y':
				return 'Return (3Y)';
			case 'Return5Y':
				return 'Return (5Y)';
			case 'Risk1Y':
				return 'Risk (1Y)';
			case 'Risk3Y':
				return 'Risk (3Y)';
			case 'Risk5Y':
				return 'Risk (5Y)';
			case 'SharpeRatio1Y':
				return 'Sharpe Ratio (1Y)';
			case 'SharpeRatio3Y':
				return 'Sharpe Ratio (3Y)';
			case 'SharpeRatio5Y':
				return 'Sharpe Ratio (5Y)';
			default:
				return;
		}
	};
	const getTableData = (response) => {
		let tableData = [];

		if (
			response['portfolio'] &&
			response['portfolio']['table'] &&
			Object.keys(response['portfolio']['table'].length > 0)
		) {
			const data = response['portfolio']['table'];
			Object.keys(data).map((key, index) => {
				const tableKey = getTableKey(key);
				tableData[index] = {
					name: tableKey,
					portfolio: data[key]
				};
			});
		}
		if (
			response['benchmark'] &&
			response['benchmark']['table'] &&
			Object.keys(response['benchmark']['table'].length > 0)
		) {
			const data = response['benchmark']['table'];
			Object.keys(data).map((key, index) => {
				tableData[index] = {
					...tableData[index],
					benchmark: data[key]
				};
			});
		}
		if (response['tilted'] && response['tilted']['table'] && Object.keys(response['tilted']['table'].length > 0)) {
			const data = response['tilted']['table'];
			Object.keys(data).map((key, index) => {
				tableData[index] = {
					...tableData[index],
					tilted: data[key]
				};
			});
		}
		return tableData;
	};
	const getLineChartData = (response) => {
		let lineChartData = [
			{
				name: 'Portfolio',
				data: []
			},
			{
				name: 'Benchmark',
				data: []
			},
			{
				name: 'Tilted',
				data: []
			}
		];
		if (
			response['portfolio'] &&
			response['portfolio']['linechart'] &&
			Object.keys(response['portfolio']['linechart'].length > 0)
		) {
			const portDate = response['portfolio']['linechart'];
			Object.keys(portDate).map((currentDate) => {
				const { year, month, date } = formatDate(currentDate);
				lineChartData[0]['data'].push([ Date.UTC(year, month, date), portDate[currentDate] ]);
			});
		}
		if (
			response['benchmark'] &&
			response['benchmark']['linechart'] &&
			Object.keys(response['benchmark']['linechart'].length > 0)
		) {
			const benchDate = response['benchmark']['linechart'];
			Object.keys(benchDate).map((currentDate) => {
				const { year, month, date } = formatDate(currentDate);
				lineChartData[1]['data'].push([ Date.UTC(year, month, date), benchDate[currentDate] ]);
			});
		}
		if (
			response['tilted'] &&
			response['tilted']['linechart'] &&
			Object.keys(response['tilted']['linechart'].length > 0)
		) {
			const tiltedDate = response['tilted']['linechart'];
			Object.keys(tiltedDate).map((currentDate) => {
				const { year, month, date } = formatDate(currentDate);
				lineChartData[2]['data'].push([ Date.UTC(year, month, date), tiltedDate[currentDate] ]);
			});
		}
		return lineChartData;
	};
	const getIntensityData = (response) => {
		let intensityData = [];
		const intensityPortSc12 = response['tilted']['Intensities']['portfolio']['Scope_12'];
		const intensityPortSc123 = response['tilted']['Intensities']['portfolio']['Scope_123'];
		const intensityPortSc3 = response['tilted']['Intensities']['portfolio']['Scope_3'];

		const intensityTiltedSc12 = response['tilted']['Intensities']['tilted']['Scope_12'];
		const intensityTiltedSc123 = response['tilted']['Intensities']['tilted']['Scope_123'];
		const intensityTiltedSc3 = response['tilted']['Intensities']['tilted']['Scope_3'];

		intensityData = [
			{
				name: 'Portfolio',
				data: [ intensityPortSc12, intensityPortSc3, intensityPortSc123 ]
			},
			{
				name: 'Tilted',
				data: [ intensityTiltedSc12, intensityTiltedSc3, intensityTiltedSc123 ]
			}
		];
		return intensityData;
	};
	const getData = () => {
		let yAxisLabel = '';
		let lineChartData = [];
		let tableData = [];
		let intensityData = [];
		let weightCategories = [];
		let contribCategories = [];
		let weightData = [
			{
				name: 'Portfolio',
				data: []
			},
			{
				name: 'Tilted',
				data: []
			}
		];
		let contribData = [
			{
				name: 'Portfolio',
				data: []
			},
			{
				name: 'Tilted',
				data: []
			}
		];

		if (optimizationData && optimizationData['data'] && Object.keys(optimizationData['data'].length > 0)) {
			const response = optimizationData['data'];
			yAxisLabel = response['chart_label'];
			lineChartData = getLineChartData(response);
			tableData = getTableData(response);
			intensityData = getIntensityData(response);

			const portSectorWeights = response['tilted']['Intensities']['portfolio']['sector_weight'];
			const tiltedSectorWeights = response['tilted']['Intensities']['tilted']['sector_weight'];
			const portSectorContribs = response['tilted']['Intensities']['portfolio']['sectoral_contribution'];
			const tiltedSectorContribs = response['tilted']['Intensities']['tilted']['sectoral_contribution'];

			if (portSectorWeights && Object.keys(portSectorWeights).length > 0) {
				Object.keys(portSectorWeights).map((key) => {
					weightData[0]['data'].push(portSectorWeights[key]);
					weightCategories.push(key);
				});
			}
			if (tiltedSectorWeights && Object.keys(tiltedSectorWeights).length > 0) {
				Object.keys(tiltedSectorWeights).map((key) => {
					weightData[1]['data'].push(tiltedSectorWeights[key]);
				});
			}
			if (portSectorContribs && Object.keys(portSectorContribs).length > 0) {
				Object.keys(portSectorContribs).map((key) => {
					contribData[0]['data'].push(portSectorContribs[key]);
					contribCategories.push(key);
				});
			}
			if (tiltedSectorContribs && Object.keys(tiltedSectorContribs).length > 0) {
				Object.keys(tiltedSectorContribs).map((key) => {
					contribData[1]['data'].push(tiltedSectorContribs[key]);
				});
			}
		}
		setYAxisTitle(yAxisLabel);
		setLineChartData(lineChartData);
		setTableData(tableData);
		setIntensityData(intensityData);
		setWeightCategories(weightCategories);
		setContribCategories(contribCategories);
		setWeightData(weightData);
		setContribData(contribData);
	};
	const fetchDetails = async () => {
		const { sector, footprintMetric, marketValue, assetClass, emission, inferenceType } = filterItem;
		setLoading(true);
		const data = {
			client: currentUser.client,
			user: currentUser.userName,
			portfolio: currentPortfolio.label,
			portfolio_date: currentPortfolio.value,
			benchmark: currentBenchmark.label,
			benchmark_date: currentBenchmark.value,
			asset_type: assetClass,
			footprint_metric: footprintMetric,
			sector: sector,
			market_value: marketValue,
			emissions: emission,
			inference: inferenceType,
			currency: currentCurrency,
			strategy: 'momentum',
			fundamentals_quarter: 'Q1',
			emissions_quarter: 'Q1',
			version_fundamentals: '1',
			version_emissions: '11',
			reweight_factor: 1
		};
		await dispatch(getPortOptimizationData(data));
		setLoading(false);
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			getData();
		},
		[ optimizationData ]
	);
	console.log('lineChartData', JSON.stringify(lineChartData));
	return (
		<React.Fragment>
			{optimizationData.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{optimizationData.error}
				</Box>
			) : (
				<Box>
					<Grid container>
						<Grid item xs={6}>
							<LineChart data={lineChartData} chartKey="PORT_OPTIMIZATION" />
						</Grid>
						<Grid item xs={6}>
							<DataTable
								data={tableData}
								columns={headCells}
								tableHeading="PORT_OPTIMIZATION"
								loading={loading}
							/>
						</Grid>
					</Grid>
					<Box style={{ marginTop: 10 }}>
						<HorizontalBar
							categories={categories}
							data={intensityData}
							chartKey="PORT_OPTIMIZATION_INTENSITY"
							yAxisTitle={yAxisTitle}
						/>
					</Box>
					<Grid container>
						<Grid item xs={6}>
							<HorizontalBar
								categories={weightCategories}
								data={weightData}
								chartKey="PORT_OPTIMIZATION_WEIGHT"
							/>
						</Grid>
						<Grid item xs={6}>
							<HorizontalBar
								categories={contribCategories}
								data={contribData}
								chartKey="PORT_OPTIMIZATION_CONTRIB"
								yAxisTitle={yAxisTitle}
							/>
						</Grid>
					</Grid>
				</Box>
			)}
		</React.Fragment>
	);
};
export default PortfolioOptimization;
