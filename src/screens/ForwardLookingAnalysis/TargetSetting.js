import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';
import { getTargetSetting } from '../../redux/actions/flmActions';
import getRequestData from '../../util/RequestData';
import ColumnChart from '../../components/ChartsComponents/ColumnChart';
import DataTable from '../../components/Table/DataTable';
import { targetSettingCells } from '../../util/TableHeadConfig';

const TargetSetting = ({}) => {
	const dispatch = useDispatch();

	const targetSetting = useSelector((state) => state.flm.targetSetting);
	const auth = useSelector((state) => state.auth);
	const { loading, filterItem } = auth;
	const { alignmentYear } = filterItem;

	const [ chartData, setChartData ] = useState([]);
	const [ tableData, setTableData ] = useState([]);
	const [ categories, setCategories ] = useState([]);

	useEffect(() => {
		fetchDetails();
	}, []);

	useEffect(
		() => {
			if (targetSetting && targetSetting['data'] && Object.keys(targetSetting['data']).length > 0) {
				getData();
			}
		},
		[ targetSetting ]
	);

	const fetchDetails = async () => {
		const data = getRequestData('TARGET_SETTING', auth);
		await dispatch(getTargetSetting(data));
	};

	const getData = () => {
		const data = targetSetting['data'];
		let chartData = [];
		let categories = [];
		let tableData = [];
		let portValues = [];
		let allowanceValues = [];
        console.log("data>>",data)

		if (data['Target_Setting_table'] && Object.keys(data['Target_Setting_table']).length > 0) {
			let allowanceData = data['Target_Setting_table']['Allowance'][alignmentYear];
			let portData = data['Target_Setting_table']['Portfolio']['intensity'];
			let annualRedData = data['Target_Setting_table']['AnnualReduction'][0][alignmentYear];

			if (Object.keys(allowanceData).length > 0) {
				Object.keys(allowanceData).map((sector) => {
					allowanceValues.push(allowanceData[sector]);
					categories.push(sector);
					tableData.push({
						sector: sector,
						port: portData[sector],
						allowance: allowanceData[sector],
						annualRed: annualRedData[sector]
					});
				});
			}
			if (Object.values(portData).length > 0) {
				Object.values(portData).map((value) => {
					portValues.push(value);
				});
			}
		}
		chartData = [
			{
				name: 'portfolio',
				data: portValues
			},
			{
				name: 'allowance',
				data: allowanceValues
			}
		];

		setChartData(chartData);
		setCategories(categories);
		setTableData(tableData);
	};

    console.log("chartData//",chartData)
    console.log("tableData//",tableData)

	return (
		<React.Fragment>
			{loading ? (
				<CircularProgress />
			) : targetSetting.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{targetSetting.error}
				</Box>
			) : (
				<Box>
					<ColumnChart categories={categories} data={chartData} chartKey="TARGET_SETTING" />
					<DataTable data={tableData} columns={targetSettingCells} tableHeading="TARGET_SETTING" />
				</Box>
			)}
		</React.Fragment>
	);
};

export default TargetSetting;
