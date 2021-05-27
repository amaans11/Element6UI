import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { getDisclosureData } from '../../redux/actions/footprintActions';
import { map } from 'lodash';
import ColumnChart from '../../components/ChartsComponents/ColumnChart';
import StackedBar from '../../components/ChartsComponents/StackedBar';
import getRequestData from '../../util/RequestData';

const categories = [ 'Portfolio Disclosure', 'Benchmark Disclosure' ];

const Disclosure = ({}) => {
	const auth = useSelector((state) => state.auth);
	const portDisclosure = useSelector((state) => state.footprint.portDisclosure);
	const benchDisclosure = useSelector((state) => state.footprint.benchDisclosure);

	console.log('portDisclosure1>>', portDisclosure);
	console.log('benchDisclosure1>>', benchDisclosure);

	const [ stackedChartData, setStackedChartData ] = useState([]);
	const [ columnChartData, setColumnChartData ] = useState([]);
	const [ columnCategories, setColumnCategories ] = useState([]);

	const dispatch = useDispatch();
	const { loading } = auth;

	const fetchDetails = async () => {
		const portData = getRequestData('PORT_DISCLOSURE', auth);
		const benchData = getRequestData('BENCH_DISCLOSURE', auth);

		await dispatch(getDisclosureData(portData, 'portfolio'));
		await dispatch(getDisclosureData(benchData, 'benchmark'));
	};

	const getColumnChartData = () => {
		let chartData = [];
		let portValues = [];
		let benchValues = [];
		let categories = [];

		console.log('portDisclosure', portDisclosure);
		console.log('benchDisclosure', benchDisclosure);

		if (portDisclosure['data'] && benchDisclosure['data']) {
			const portData =
				portDisclosure && Object.keys(portDisclosure).length > 0 ? portDisclosure['data']['Scope3_disc'] : [];
			const benchData =
				benchDisclosure && Object.keys(benchDisclosure).length > 0
					? benchDisclosure['data']['Scope3_disc']
					: [];

			console.log('portData', portData);
			console.log('benchData', benchData);

			if (portData && portData.length > 0) {
				portData.map((res) => {
					portValues.push(res['Portfolio']);
					categories.push(res['Disclosed.S3']);
				});
			}

			if (benchData && benchData.length > 0) {
				benchData.map((res) => {
					const key = res['Disclosed.S3'];
					benchValues[key] = res['Portfolio'];
				});
			}
			benchValues = Array.from(benchValues, (item) => item || 0);
			console.log('benchValues', benchValues);
			chartData = [
				{
					name: 'portfolio',
					data: portValues
				},
				{
					name: 'benchmark',
					data: benchValues
				}
			];

			setColumnChartData(chartData);
			setColumnCategories(categories);
		}
	};
	const getStackedChartData = () => {
		let chartData = [];

		if (portDisclosure['data'] && benchDisclosure['data']) {
			const portData =
				portDisclosure && Object.keys(portDisclosure).length > 0 ? portDisclosure['data']['Scope12_disc'] : [];
			const benchData =
				benchDisclosure && Object.keys(benchDisclosure).length > 0
					? benchDisclosure['data']['Scope12_disc']
					: [];

			if (portData && portData.length > 0) {
				portData.map((res, index) => {
					console.log('res>>', res);
					console.log('benchData>>', index);
					console.log('benchData1>>', benchData);

					let portValue = res['Proportion'];
					let benchValue = benchData && benchData.length > 0 && benchData[index]['Proportion'];

					chartData.push({
						name: res['Disclosure'],
						data: [ portValue, benchValue ]
					});
				});
			}
		}
		setStackedChartData(chartData);
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			getStackedChartData();
			getColumnChartData();
		},
		[ portDisclosure, benchDisclosure ]
	);
	console.log('stackedChartData', stackedChartData);
	return (
		<React.Fragment>
			{loading ? (
				<CircularProgress />
			) : portDisclosure.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{portDisclosure.error}
				</Box>
			) : benchDisclosure.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{benchDisclosure.error}
				</Box>
			) : (
				<Box>
					<StackedBar categories={categories} data={stackedChartData} chartKey="DISCLOSURE_SCOPE12" />
					<ColumnChart categories={columnCategories} data={columnChartData} chartKey="DISCLOSURE_SCOPE3" />
					<Typography>
						This chart highlights the number of Scope 3 categories disclosed out of a possible 15 for
						company holdings with the portfolio and benchmark as a percentage. This relates to the issuers
						that Urgentem has directly analysed. A key area of engagement with companies is to encourage
						disclosure of Scope 3 emissions. Disclosure of Scope 3 emissions reduces the error in estimating
						carbon risk exposure and allows companies to address areas of high carbon intensity within their
						value chain. Scope 3 data is becoming increasingly available and is a critical part of
						understanding company and portfolio-level carbon risks - as it generally accounts for around 85%
						of a typical company's total emissions.
					</Typography>
				</Box>
			)}
		</React.Fragment>
	);
};
export default Disclosure;
