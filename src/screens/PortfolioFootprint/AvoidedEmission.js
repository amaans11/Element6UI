/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box,CircularProgress } from '@material-ui/core';
import {get} from 'lodash'
import { getAvoidedEmissions } from '../../redux/actions/footprintActions';
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar';
import DataTable from '../../components/Table/DataTable';
import filterConfig from '../../util/filter-config';
import getRequestData from '../../util/RequestData';
import {avoidedEmissionCells} from '../../util/TableHeadConfig';

const categories = [ 'Scope 1+2', 'Scope 3', 'Scope 1+2+3', 'Avoided Emissions', 'Net Emissions' ];

const AvoidedEmission = () => {
    const auth = useSelector((state) => state.auth);
	const avoidedEmissions = useSelector((state) => state.footprint.avoidedEmission);
    const {filterItem,loading,userInfo}=auth

	const [ chartData, setChartData ] = useState([]);
	const [ tableData, setTableData ] = useState([]);
	const [ yAxisTitle, setYAxisTitle ] = useState('');

	const trial = get(userInfo,'trial',false)

	const dispatch = useDispatch();

	const getTableData = () => {
		const data =
			avoidedEmissions && Object.keys(avoidedEmissions).length > 0
				? avoidedEmissions['data']['PF_Avoided_Emissions']
				: [];

		let tableData = [];
		if (data && data.length > 0) {
			tableData = [
				{
					name: data[1]['name'],
					Sc12: data[1]['Sc12'],
					Sc3: data[1]['Sc3'],
					Sc123: data[1]['Sc123'],
					avoidedEmissions: data[1]['AvoidedEmissions'],
					netEmissions: data[1]['NetEmissions']
				},
				{
					name: data[0]['name'],
					Sc12: data[0]['Sc12'],
					Sc3: data[0]['Sc3'],
					Sc123: data[0]['Sc123'],
					avoidedEmissions: data[0]['AvoidedEmissions'],
					netEmissions: data[0]['NetEmissions']
				}
			];
		}
		setTableData(tableData);
	};

	const getEmissionChartData = () => {
		const data =
			avoidedEmissions && Object.keys(avoidedEmissions).length > 0
				? avoidedEmissions['data']['PF_Avoided_Emissions']
				: [];
		let chartData = [];

		const title =
			avoidedEmissions && Object.keys(avoidedEmissions).length > 0
				? avoidedEmissions['data']['y_axis_title']
				: '';

		if (data && data.length > 0) {
			const portSc12 = data[1]['Sc12'];
			const portSc123 = data[1]['Sc123'];
			const portSc3 = data[1]['Sc3'];
			const portavoidedEmissions = data[1]['AvoidedEmissions'];
			const portnetEmissions = data[1]['NetEmissions'];
			const benchSc12 = data[0]['Sc12'];
			const benchSc123 = data[0]['Sc123'];
			const benchSc3 = data[0]['Sc3'];
			const benchavoidedEmissions = data[0]['AvoidedEmissions'];
			const benchnetEmissions = data[0]['NetEmissions'];

			chartData = [
				{
					name: 'portfolio',
					data: [ portSc12, portSc3, portSc123, portavoidedEmissions, portnetEmissions ]
				},
				{
					name: 'benchmark',
					data: [ benchSc12, benchSc3, benchSc123, benchavoidedEmissions, benchnetEmissions ]
				}
			];
		}
		setChartData(chartData);
		setYAxisTitle(title);
	};
	useEffect(() => {
		const fetchDetails = async () => {
			const data=getRequestData('AVOIDED_EMISSION', auth);
			await dispatch(getAvoidedEmissions(data));
		};
		fetchDetails()
	}, []);
	useEffect(
		() => {
			getTableData();
			getEmissionChartData();
		},
		[ avoidedEmissions ]
	);

	const { footprintMetric } = filterItem;
	let fpMetricOptions = filterConfig[1]['tagsList'];
	let metric = '';

	if (fpMetricOptions && fpMetricOptions.length > 0) {
		fpMetricOptions.map((option) => {
			if (option.value === footprintMetric) {
				metric = option.name;
			}
		});
	}
	const chartTitle = `Portfolio Intensity - ${metric}`;

	return (
		<React.Fragment>
			{loading ? <CircularProgress /> : avoidedEmissions.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{avoidedEmissions.error}
				</Box>
			) : (
				<Box>
					<HorizontalBar
						categories={categories}
						data={chartData}
						chartKey="AVOIDED_EMISSIONS"
						yAxisTitle={yAxisTitle}
						chartTitle={chartTitle}
						isExportEnabled={!trial}
					/>
					<DataTable
						data={tableData}
						columns={avoidedEmissionCells}
						tableHeading="AVOIDED_EMISSIONS"
						isTrial={trial}
					/>
				</Box>
			)}
		</React.Fragment>
	);
};
export default AvoidedEmission;
