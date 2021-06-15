import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box,CircularProgress,Grid } from '@material-ui/core';
import DataTable from '../../components/Table/DataTable';
import getRequestData from '../../util/RequestData';
import { coalPowerCells } from '../../util/TableHeadConfig';
import { getCoalPowerData } from '../../redux/actions/strandedAssetActions';
import ColumnChart from '../../components/ChartsComponents/ColumnChart';

const CoalPower = () => {
	const dispatch = useDispatch();

	const [ chartData, setChartData ] = useState([]);
	const [ tableData, setTableData ] = useState([]);

	const coalPower = useSelector((state) => state.stranded.coalPower);
	const auth = useSelector((state) => state.auth);
	const {loading}=auth

	const fetchDetails = async () => {
		const data = getRequestData('COAL_POWER', auth);
		await dispatch(getCoalPowerData(data));
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			getData();
		},
		[ coalPower ]
	);

	const getData = () => {
		let chartData = [];
		let tableData = [];

		if (coalPower['data'] && Object.keys(coalPower['data']).length > 0) {
            
            const portValue=coalPower['data']['chart']['portfolio']
            const benchValue=coalPower['data']['chart']['benchmark']
			chartData = [
				{
					name: '',
					data: [ portValue,benchValue]
				}
			];
			tableData=coalPower['data']['table']
		}
		setChartData(chartData);
		setTableData(tableData);
	};
	return (
		<React.Fragment>
			{loading ? <CircularProgress /> : coalPower.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{coalPower.error}
				</Box>
			) : (
				<React.Fragment>
					<Grid container>
						<Grid item xs={6}>
							<ColumnChart
								categories={['portfolio','benchmark']}
								data={chartData}
								chartKey="COAL_POWER"
							/>
						</Grid>
						<Grid item xs={6}>
							<DataTable
								data={tableData}
								columns={coalPowerCells}
                                tableHeading="COAL_POWER"
							/>
						</Grid>
					</Grid>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default CoalPower;
