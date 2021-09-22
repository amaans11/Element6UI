/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';
import { some, findIndex,get } from 'lodash';
import DataTable from '../../components/Table/DataTable';
import getRequestData from '../../util/RequestData';
import BubbleChart from '../../components/ChartsComponents/BubbleChart';
import { getCompanyAnalysisData } from '../../redux/actions/tempMetricActions';
import { companyAnalysisCells } from '../../util/TableHeadConfig';

const getEmissionValue = (emission) => {
	switch (emission) {
		case 'Sc12':
			return 'S1+2';
		case 'Sc123':
			return 'S1+2+3';
		case 'Sc3':
			return 'S3';
		default:
			return 'S1+2';
	}
};

const CompanyAnalysis = () => {
	const dispatch = useDispatch();

	const companyData = useSelector((state) => state.tempMetric.companyData);
	const auth = useSelector((state) => state.auth);
	const { loading,filterItem,userInfo } = auth;
	const {emission}=filterItem;
	const trial = get(userInfo,'Trial',false)

	const emissionLabel=getEmissionValue(emission)

	const [ chartData, setChartData ] = useState([]);
	const [ tableData, setTableData ] = useState([]);

	const fetchDetails = async () => {
		const data = getRequestData('COMPANY_ANALYSIS', auth);
		await dispatch(getCompanyAnalysisData(data));
	};
	useEffect(() => {
		fetchDetails();
	}, []);

	useEffect(
		() => {
			getData();
		},
		[ companyData ]
	);

	const getData = () => {
		let tableData = [];
		let chartData = [];

		if (companyData && companyData['data'] && companyData['data'].length > 0) {
			companyData['data'].map((data) => {
				if (some(chartData, { name: data['sector'] })) {
					const index = findIndex(chartData, { name: data['sector'] });
					const xVal = data['temperature_score'];
					const yVal = data['emission_intensity'];
					const zVal = data['weight'];
					chartData[index]['data'].push(({x:xVal,y:yVal,z:zVal ,company:data['company_name']}));
				} else {
					const xVal = data['temperature_score'];
					const yVal = data['emission_intensity'];
					const zVal = data['weight'];

					chartData = [
						...chartData,
						{
							name: data['sector'],
							data:[{x:xVal,y:yVal,z:zVal,company:data['company_name']}]
						}
					];
				}
			});
			tableData = [ ...companyData['data'] ];
		}
		setTableData(tableData);
		setChartData(chartData);
	};

	console.log("chartData>>",chartData)
	return (
		<React.Fragment>
			{loading ? (
				<CircularProgress />
			) : companyData.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{companyData.error}
				</Box>
			) : (
				<React.Fragment>
					<BubbleChart
						chartKey="COMPANY_ANALYSIS"
						data={chartData}
						xAxisLabel="Temperature Score"
						yAxisLabel="S1+2 GHG Emissionsm (tCO2e)"
						zAxisLabel="Weight"
						yAxisTitle={`${emissionLabel} GHG Emissions (tCo2e)`}
						isExportEnabled={!trial}
					/>
					<DataTable data={tableData} columns={companyAnalysisCells} tableHeading="COMPANY_ANALYSIS" />
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default CompanyAnalysis;
