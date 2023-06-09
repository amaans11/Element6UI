/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Box,CircularProgress} from  '@material-ui/core'
import {get} from 'lodash'
import { getPortfolioEmission } from '../../redux/actions/footprintActions';
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar';
import DataTable from '../../components/Table/DataTable';
import getRequestData from '../../util/RequestData';
import {portEmissionCells} from '../../util/TableHeadConfig';

const categories = [ 'Scope 1+2', 'Scope 3', 'Scope 1+2+3' ];

const PortfolioEmission = () => {
	const dispatch = useDispatch();

	const [ chartData, setChartData ] = useState([]);
	const [ tableData, setTableData ] = useState([]);
	const [ yAxisTitle, setYAxisTitle ] = useState('');
	const [ tableLabel, setTableLabel ] = useState('');


	const portfolioEmission = useSelector((state) => state.footprint.portfolioEmission);
	const auth =useSelector(state=>state.auth);
	const {filterItem,loading,userInfo}=auth;

	const {footprintMetric} = filterItem
	const trial = get(userInfo,'trial',false)

	const portEmissionCells = [
		{
			name: `Portfolios (${tableLabel})`,
			selector: 'name',
			sortable: true,
			right: false,
			wrap: true
		},
		{
			name: 'Scope 1+2',
			selector: 'Sc12',
			sortable: true,
			right: true,
			cell: (row) => <div>{new Intl.NumberFormat().format(row.Sc12)}</div>
		},
		{
			name: 'Scope 3',
			selector: 'Sc3',
			sortable: true,
			right: true,
			cell: (row) => <div>{new Intl.NumberFormat().format(row.Sc3)}</div>
		},
		{
			name: 'Scope 1+2+3',
			selector: 'Sc123',
			sortable: true,
			right: true,
			cell: (row) => <div>{new Intl.NumberFormat().format(row.Sc123)}</div>
		}
	];

	const fetchDetails = async () => {
		const data = getRequestData('PORTFOLIO_EMISSION', auth);
		await dispatch(getPortfolioEmission(data));
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			getData();
		},
		[ portfolioEmission ]
	);

	const getData = () => {
		const { inferenceType } = filterItem;

		let intensityChartData = [];
		let intensityTableData = [];
		let yTitle = '';
		let tableLabel = ''

		if (portfolioEmission['data'] && Object.keys(portfolioEmission['data']).length > 0) {
			let response = portfolioEmission['data']['data'];
			yTitle = portfolioEmission['data']['chart_name'];

			const intensityPortSc12 =
				inferenceType === 'Avg'
					? response[0][0]['Portfolio_Avg_Intensity']['Sc12']
					: response[0][1]['Portfolio_Max_Intensity']['Sc12'];
			const intensityPortSc123 =
				inferenceType === 'Avg'
					? response[0][0]['Portfolio_Avg_Intensity']['Sc123']
					: response[0][1]['Portfolio_Max_Intensity']['Sc123'];
			const intensityPortSc3 =
				inferenceType === 'Avg'
					? response[0][0]['Portfolio_Avg_Intensity']['Sc3']
					: response[0][1]['Portfolio_Max_Intensity']['Sc3'];

			const intensityBenchSc12 =
				inferenceType === 'Avg'
					? response[1][0]['Benchmark_Avg_Intensity']['Sc12']
					: response[1][1]['Benchmark_Max_Intensity']['Sc12'];
			const intensityBenchSc123 =
				inferenceType === 'Avg'
					? response[1][0]['Benchmark_Avg_Intensity']['Sc123']
					: response[1][1]['Benchmark_Max_Intensity']['Sc123'];
			const intensityBenchSc3 =
				inferenceType === 'Avg'
					? response[1][0]['Benchmark_Avg_Intensity']['Sc3']
					: response[1][1]['Benchmark_Max_Intensity']['Sc3'];

			intensityChartData = [
				{
					name: 'portfolio',
					data: [ intensityPortSc12, intensityPortSc3, intensityPortSc123 ]
				},
				{
					name: 'benchmark',
					data: [ intensityBenchSc12, intensityBenchSc3, intensityBenchSc123 ]
				}
			];
			tableLabel = response[0][0]['Portfolio_Avg_Intensity']['unit']
			intensityTableData = [
				{
					name: response[0][0]['Portfolio_Avg_Intensity']['name'],
					Sc12: response[0][0]['Portfolio_Avg_Intensity']['Sc12'],
					Sc3: response[0][0]['Portfolio_Avg_Intensity']['Sc3'],
					Sc123: response[0][0]['Portfolio_Avg_Intensity']['Sc123']
				},
				{
					name: response[1][0]['Benchmark_Avg_Intensity']['name'],
					Sc12: response[1][0]['Benchmark_Avg_Intensity']['Sc12'],
					Sc3: response[1][0]['Benchmark_Avg_Intensity']['Sc3'],
					Sc123: response[1][0]['Benchmark_Avg_Intensity']['Sc123']
				},
				{
					name: response[0][1]['Portfolio_Max_Intensity']['name'],
					Sc12: response[0][1]['Portfolio_Max_Intensity']['Sc12'],
					Sc3: response[0][1]['Portfolio_Max_Intensity']['Sc3'],
					Sc123: response[0][1]['Portfolio_Max_Intensity']['Sc123']
				},
				{
					name: response[1][1]['Benchmark_Max_Intensity']['name'],
					Sc12: response[1][1]['Benchmark_Max_Intensity']['Sc12'],
					Sc3: response[1][1]['Benchmark_Max_Intensity']['Sc3'],
					Sc123: response[1][1]['Benchmark_Max_Intensity']['Sc123']
				}
			];
		}
		console.log("intensityChartData",intensityChartData)
		setChartData(intensityChartData);
		setTableData(intensityTableData);
		setYAxisTitle(yTitle);
		setTableLabel(tableLabel)
	};
	return (
		<React.Fragment>
			{loading ? <CircularProgress /> : portfolioEmission.error ? (
				<Box align="center"  className="error-msg" style={{marginTop:20,fontSize:16}}>
					{portfolioEmission.error}
				</Box>
			) : (
				<React.Fragment>
					<HorizontalBar
						categories={categories}
						data={chartData}
						chartKey="PORTFOLIO_INTENSITY"
						yAxisTitle={yAxisTitle}
						isExportEnabled={!trial}
					/>
					<DataTable
						data={tableData}
						columns={portEmissionCells}
						tableHeading="PORTFOLIO_INTENSITY"
						isTrial={trial}
					/>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default PortfolioEmission;
