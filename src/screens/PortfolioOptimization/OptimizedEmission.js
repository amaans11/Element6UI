/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Slider, Typography,Button, CircularProgress } from '@material-ui/core';
import {get} from 'lodash'
import {setReweightData,setLoading} from '../../redux/actions/authActions';
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar';
import {getPortOptimizationData} from '../../redux/actions/optimizationActions'
import getRequestData from '../../util/RequestData';

const categories = [ 'Scope 1+2', 'Scope 3', 'Scope 1+2+3' ];

const PortfolioOptimization = () => {
	const dispatch = useDispatch();

	const optimizationData = useSelector((state) => state.optimization.optimizationData);
	const auth = useSelector((state) => state.auth);

	const { reweightFactor,loading,userInfo } = auth

	const trial = get(userInfo,'trial',false)
	
	const [ yAxisTitle, setYAxisTitle ] = useState('');
	const [ lineChartData, setLineChartData ] = useState([]);
	const [ tableData, setTableData ] = useState([]);
	const [ intensityData, setIntensityData ] = useState([]);
	const [ weightCategories, setWeightCategories ] = useState([]);
	const [ contribCategories, setContribCategories ] = useState([]);
	const [ weightData, setWeightData ] = useState([]);
	const [ contribData, setContribData ] = useState([]);
	const [reWeightFactor,setReweightfactor]=useState(reweightFactor)


	const formatDate = (currentDate) => {
		const year = currentDate.toString().slice(0, 4);
		const month = currentDate.toString().slice(4, 6) - 1;
		const date = currentDate.toString().slice(6, 8);
		return { year, month, date };
	};
	const handleReweightFactor=(event,newValue)=>{
		setReweightfactor(newValue)
	}
	const submitReweightFactor=()=>{
		dispatch(setReweightData(reWeightFactor))
	}
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
		let count = 0;

		if (
			response['portfolio'] &&
			response['portfolio']['table'] &&
			Object.keys(response['portfolio']['table'].length > 0)
		) {
			const data = response['portfolio']['table'];
			Object.keys(data).map((key) => {
				const tableKey = getTableKey(key);
				if (!key.includes('3Y')) {
					tableData[count] = {
						name: tableKey,
						portfolio: parseFloat(data[key]).toFixed(2)
					};
					count++;
				}
			});
		}
		if (
			response['benchmark'] &&
			response['benchmark']['table'] &&
			Object.keys(response['benchmark']['table'].length > 0)
		) {
			const data = response['benchmark']['table'];
			count = 0;
			Object.keys(data).map((key) => {
				if (!key.includes('3Y')) {
					tableData[count] = {
						...tableData[count],
						benchmark: parseFloat(data[key]).toFixed(2)
					};
					count++;
				}
			});
		}
		if (response['tilted'] && response['tilted']['table'] && Object.keys(response['tilted']['table'].length > 0)) {
			const data = response['tilted']['table'];
			count = 0;

			Object.keys(data).map((key) => {
				if (!key.includes('3Y')) {
					tableData[count] = {
						...tableData[count],
						tilted: parseFloat(data[key]).toFixed(2)
						
					};
					count++;
				}
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
		const intensityPortSc12 = parseFloat(response['tilted']['Intensities']['portfolio']['Scope_12'].toFixed(2));
		const intensityPortSc123 = parseFloat(response['tilted']['Intensities']['portfolio']['Scope_123'].toFixed(2));
		const intensityPortSc3 = parseFloat(response['tilted']['Intensities']['portfolio']['Scope_3'].toFixed(2));

		const intensityTiltedSc12 = parseFloat(response['tilted']['Intensities']['tilted']['Scope_12'].toFixed(2));
		const intensityTiltedSc123 = parseFloat(response['tilted']['Intensities']['tilted']['Scope_123'].toFixed(2));
		const intensityTiltedSc3 = parseFloat(response['tilted']['Intensities']['tilted']['Scope_3'].toFixed(2));

		const benchmarkTiltedSc12 = parseFloat(response['benchmark']['Intensities']['benchmark']['Scope_12'].toFixed(2));
		const benchmarkTiltedSc123 = parseFloat(response['benchmark']['Intensities']['benchmark']['Scope_123'].toFixed(2));
		const benchmarkTiltedSc3 = parseFloat(response['benchmark']['Intensities']['benchmark']['Scope_3'].toFixed(2));


		intensityData = [
			{
				name: 'Portfolio',
				data: [ intensityPortSc12, intensityPortSc3, intensityPortSc123 ]
			},
			{
				name: 'Tilted',
				data: [ intensityTiltedSc12, intensityTiltedSc3, intensityTiltedSc123 ]
			},
			{
				name: 'Benchmark',
				data: [ benchmarkTiltedSc12, benchmarkTiltedSc3, benchmarkTiltedSc123 ]
			}
		];
		return intensityData;
	};
	const getData = async () => {

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
			},
			{
				name: 'Benchmark',
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
			},
			{
				name: 'Benchmark',
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
			const benchmarkSectorWeights = response['benchmark']['Intensities']['benchmark']['sector_weight'];
			const portSectorContribs = response['tilted']['Intensities']['portfolio']['sectoral_contribution'];
			const tiltedSectorContribs = response['tilted']['Intensities']['tilted']['sectoral_contribution'];
			const benchmarkSectorContribs = response['benchmark']['Intensities']['benchmark']['sectoral_contribution'];

			console.log("benchmarkSectorWeights",benchmarkSectorWeights)
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
			if (benchmarkSectorWeights && Object.keys(benchmarkSectorWeights).length > 0) {
				Object.keys(benchmarkSectorWeights).map((key) => {
					weightData[2]['data'].push(benchmarkSectorWeights[key]);
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
			if (benchmarkSectorContribs && Object.keys(benchmarkSectorContribs).length > 0) {
				Object.keys(benchmarkSectorContribs).map((key) => {
					contribData[2]['data'].push(benchmarkSectorContribs[key]);
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

		await dispatch(setLoading(false));

	};
	const fetchDetails = async () => {
		await dispatch(setLoading(true));
		const data = getRequestData('PORTFOLIO_OPTIMIZATION', auth);
		await dispatch(getPortOptimizationData(data));
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
	return (
		<React.Fragment>
			{loading ? <CircularProgress /> : optimizationData.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{optimizationData.error}
				</Box>
			) : (
				<Box>
					<Box >
						<HorizontalBar
							categories={categories}
							data={intensityData}
							chartKey="PORT_OPTIMIZATION_INTENSITY"
							yAxisTitle={yAxisTitle}
							isExportEnabled={!trial}
						/>
					</Box>
					<Grid container>
						<Grid item xs={12}>
							<HorizontalBar
								categories={weightCategories}
								data={weightData}
								chartKey="PORT_OPTIMIZATION_WEIGHT"
								isExportEnabled={!trial}
							/>
						</Grid>
						<Grid item xs={12}>
							<HorizontalBar
								categories={contribCategories}
								data={contribData}
								chartKey="PORT_OPTIMIZATION_CONTRIB"
								yAxisTitle={yAxisTitle}
								isExportEnabled={!trial}
							/>
						</Grid>
					</Grid>
				</Box>
			)}
		</React.Fragment>
	);
};
export default PortfolioOptimization;
