/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Box,CircularProgress} from  '@material-ui/core'
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

	const portfolioEmission = useSelector((state) => state.footprint.portfolioEmission);
	const auth =useSelector(state=>state.auth);
	const {filterItem,loading}=auth;


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
			intensityTableData = [
				{
					name: 'Portfolio Avg GHG Intensity',
					Sc12: response[0][0]['Portfolio_Avg_Intensity']['Sc12'],
					Sc3: response[0][0]['Portfolio_Avg_Intensity']['Sc3'],
					Sc123: response[0][0]['Portfolio_Avg_Intensity']['Sc123']
				},
				{
					name: 'Benchmark Avg GHG Intensity',
					Sc12: response[1][0]['Benchmark_Avg_Intensity']['Sc12'],
					Sc3: response[1][0]['Benchmark_Avg_Intensity']['Sc3'],
					Sc123: response[1][0]['Benchmark_Avg_Intensity']['Sc123']
				},
				{
					name: 'Portfolio Max GHG Intensity',
					Sc12: response[0][1]['Portfolio_Max_Intensity']['Sc12'],
					Sc3: response[0][1]['Portfolio_Max_Intensity']['Sc3'],
					Sc123: response[0][1]['Portfolio_Max_Intensity']['Sc123']
				},
				{
					name: 'Benchmark Max GHG Intensity',
					Sc12: response[1][1]['Benchmark_Max_Intensity']['Sc12'],
					Sc3: response[1][1]['Benchmark_Max_Intensity']['Sc3'],
					Sc123: response[1][1]['Benchmark_Max_Intensity']['Sc123']
				}
			];
		}
		setChartData(intensityChartData);
		setTableData(intensityTableData);
		setYAxisTitle(yTitle);
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
					/>
					<DataTable
						data={tableData}
						columns={portEmissionCells}
						tableHeading="PORTFOLIO_INTENSITY"
					/>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default PortfolioEmission;
