import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box,CircularProgress } from '@material-ui/core';
import { getSovereignFootprint } from '../../redux/actions/footprintActions';
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar';
import DataTable from '../../components/Table/DataTable';
import getRequestData from '../../util/RequestData';
import {sovFootprintCells} from '../../util/TableHeadConfig';

const SovereignFootprint = ({}) => {
    const auth=useSelector(state=>state.auth)
	const sovFootprint = useSelector((state) => state.footprint.sovFootprint);

	const [ gdpChartData, setGdpChartData ] = useState([]);
	const [ popChartData, setPopChartData ] = useState([]);
	const [ categories, setCategories ] = useState([]);
	const [ tableData, setTableData ] = useState([]);

	const dispatch = useDispatch();
	const {loading}=auth

	const fetchDetails = async () => {
        const data=getRequestData('SOVEREIGN_FOOTPRINT',auth)
		await dispatch(getSovereignFootprint(data));
	};

	const getTableData = () => {
		const data = sovFootprint && Object.keys(sovFootprint).length > 0 ? sovFootprint['data']['Sovereign_plot'] : [];

		let tableData = [];
		if (data && Object.keys(data).length > 0) {
			tableData = [
				{
					name: 'Portfolio',
					gdpData: data['Portfolio']['Footprint'][0],
					popData: data['Portfolio']['Footprint'][1]
				},
				{
					name: 'Benchmark',
					gdpData: data['Benchmark']['Footprint'][0],
					popData: data['Benchmark']['Footprint'][1]
				}
			];
		}
		setTableData(tableData);
	};

	const getSovChartData = () => {
		const data = sovFootprint && Object.keys(sovFootprint).length > 0 ? sovFootprint['data']['Sovereign_plot'] : [];

		let portGdpData = [];
		let portPopulationData = [];
		let benchGdpData = [];
		let benchPopulationData = [];
		let categories = [];
		let gdpChartData = [];
		let popChartData = [];

		if (data && Object.keys(data).length > 0) {
			const portData = data['Portfolio']['Countries'];
			const benchData = data['Portfolio']['Countries'];

			if (portData && portData.length > 0) {
				portData.map((res) => {
					categories.push(res.Country);
					portGdpData.push(res.weighted_GDP);
					portPopulationData.push(res.weighted_POP);
				});
			}

			if (benchData && benchData.length > 0) {
				benchData.map((res) => {
					categories.push(res.Country);
					benchGdpData.push(res.weighted_GDP);
					benchPopulationData.push(res.weighted_POP);
				});
			}
		}
		gdpChartData = [
			{
				name: 'portfolio',
				data: portGdpData
			},
			{
				name: 'benchmark',
				data: benchGdpData
			}
		];
		popChartData = [
			{
				name: 'portfolio',
				data: portPopulationData
			},
			{
				name: 'benchmark',
				data: benchPopulationData
			}
		];
		setGdpChartData(gdpChartData);
		setPopChartData(popChartData);
		setCategories(categories);
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			getTableData();
			getSovChartData();
		},
		[ sovFootprint ]
	);

	return (
		<React.Fragment>
			{loading ? <CircularProgress /> : sovFootprint.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{sovFootprint.error}
				</Box>
			) : (
				<Box>
					<Grid container>
						<Grid item xs={6}>
							<HorizontalBar categories={categories} data={gdpChartData} chartKey="SOV_GDP_CHART" />
						</Grid>
						<Grid item xs={6}>
							<HorizontalBar categories={categories} data={popChartData} chartKey="SOV_POP_CHART" />
						</Grid>
					</Grid>
					<DataTable
						data={tableData}
						columns={sovFootprintCells}
						tableHeading="SOVEREIGN_FOOTPRINT"
					/>
				</Box>
			)}
		</React.Fragment>
	);
};
export default SovereignFootprint;
