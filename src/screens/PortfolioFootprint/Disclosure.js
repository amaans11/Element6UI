import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
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

	const [ stackedChartData, setStackedChartData ] = useState([]);
	const [ columnChartData, setColumnChartData ] = useState([]);
	const [ columnCategories, setColumnCategories ] = useState([]);

	const dispatch = useDispatch();

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
