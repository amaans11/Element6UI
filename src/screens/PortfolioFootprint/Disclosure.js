/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import {some} from 'lodash'
import { getDisclosureData } from '../../redux/actions/footprintActions';
import ColumnChart from '../../components/ChartsComponents/ColumnChart';
import StackedBar from '../../components/ChartsComponents/StackedBar';
import getRequestData from '../../util/RequestData';

const categories = [ 'Portfolio Disclosure', 'Benchmark Disclosure' ];

const Disclosure = () => {
	const auth = useSelector((state) => state.auth);
	const portDisclosure = useSelector((state) => state.footprint.portDisclosure);
	const benchDisclosure = useSelector((state) => state.footprint.benchDisclosure);

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

		if (portDisclosure['data'] && benchDisclosure['data']) {
			const portData =
				portDisclosure && Object.keys(portDisclosure).length > 0 ? portDisclosure['data']['Scope3_disc'] : [];
			const benchData =
				benchDisclosure && Object.keys(benchDisclosure).length > 0
					? benchDisclosure['data']['Scope3_disc']
					: [];



			for(let i=0;i<=15 ; i++){
				let portValue=0;
				let benchValue =0;

				if(portData && portData.length > 0){
					const isPortExist= some(portData,{'Disclosed.S3':i})

					if(isPortExist){
						const index=portData.findIndex(x=>x['Disclosed.S3'] == i)

						portValue=portData[index]['Portfolio']
					}
				}
				if(benchData && benchData.length > 0){
					const isBenchExist= some(benchData,{'Disclosed.S3':i})
					if(isBenchExist){
						const index=benchData.findIndex(x=>x['Disclosed.S3'] == i)
						benchValue=benchData[index]['Portfolio']
					}
				}
				portValues.push(portValue)
				benchValues.push(benchValue)

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
					<div style={{font:'inherit'}}>
						This chart highlights the number of Scope 3 categories disclosed out of a possible 15 for
						company holdings with the portfolio and benchmark as a percentage. This relates to the issuers
						that Urgentem has directly analysed. A key area of engagement with companies is to encourage
						disclosure of Scope 3 emissions. Disclosure of Scope 3 emissions reduces the error in estimating
						carbon risk exposure and allows companies to address areas of high carbon intensity within their
						value chain. Scope 3 data is becoming increasingly available and is a critical part of
						understanding company and portfolio-level carbon risks - as it generally accounts for around 85%
						of a typical company's total emissions.
					</div>
				</Box>
			)}
		</React.Fragment>
	);
};
export default Disclosure;
