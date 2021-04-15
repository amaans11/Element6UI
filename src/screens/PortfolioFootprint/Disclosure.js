import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { getDisclosureData } from '../../redux/actions/footprintActions';
import { map } from 'lodash';
import ColumnChart from '../../components/ChartsComponents/ColumnChart';
import StackedBar from '../../components/ChartsComponents/StackedBar';

const categories = [ 'Portfolio Disclosure', 'Benchmark Disclosure' ];

const Disclosure = ({}) => {
	const currentPortfolio = useSelector((state) => state.auth.currentPortfolio);
	const currentBenchmark = useSelector((state) => state.auth.currentBenchmark);
	const currentUser = useSelector((state) => state.auth.currentUser);
	const portDisclosure = useSelector((state) => state.footprint.portDisclosure);
	const benchDisclosure = useSelector((state) => state.footprint.benchDisclosure);

	const [ stackedChartData, setStackedChartData ] = useState([]);
	const [ stackedCategories, setStackedCategories ] = useState([]);
	const [ columnChartData, setColumnChartData ] = useState([]);
	const [ columnCategories, setColumnCategories ] = useState([]);

	const dispatch = useDispatch();

	const fetchDetails = async () => {
		const data = {
			client: currentUser.client,
			user: currentUser.userName,
			fundamentals_quarter: 'Q1',
			emissions_quarter: 'Q1',
			version_fundamentals: '1',
			version_emissions: '11',
			emissions_quarter: 'Q1',
			version_emissions: '11'
		};
		const portData = {
			...data,
			portfolio: currentPortfolio.label,
			portfolio_date: currentPortfolio.value
		};
		const benchData = {
			...data,
			portfolio: currentBenchmark.label,
			portfolio_date: currentBenchmark.value
		};
		await dispatch(getDisclosureData(portData, 'portfolio'));
		await dispatch(getDisclosureData(benchData, 'benchmark'));
	};

	const getColumnChartData = () => {
		let chartData = [];
		let portValues = [];
		let benchValues = [];
		let categories = [];

		if (portDisclosure['data'] && benchDisclosure['data']) {
			const portData =
				portDisclosure && Object.keys(portDisclosure).length > 0 ? portDisclosure['data']['Scope3_disc'] : [];
			const benchData =
				benchDisclosure && Object.keys(benchDisclosure).length > 0
					? benchDisclosure['data']['Scope3_disc']
					: [];

			if (portData && portData.length > 0) {
				portData.map((res) => {
					portValues.push(res['Portfolio']);
					categories.push(res['Disclosed.S3']);
				});
			}
			if (benchData && benchData.length > 0) {
				benchValues = map(benchData, 'Portfolio');
			}
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
	return (
		<React.Fragment>
			{portDisclosure.error ? (
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
				</Box>
			)}
		</React.Fragment>
	);
};
export default Disclosure;
