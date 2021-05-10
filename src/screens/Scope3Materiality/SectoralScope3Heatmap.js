import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getScope3Data } from '../../redux/actions/scope3Actions';
import HeatmapChart from '../../components/ChartsComponents/HeatmapChart';
import DataTable from '../../components/Table/DataTable';
import getRequestData from '../../util/RequestData';
import { sectoralScope3Cells } from '../../util/TableHeadConfig';

const useStyles = makeStyles(() => ({
	formControl: {
		width: 200,
		margin: 15
	}
}));

const SectoralScope3Heatmap = ({}) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [ chartData, setChartData ] = useState([]);
	const [ tableData, setTableData ] = useState([]);
	const [ yCategories, setYCategories ] = useState([]);
	const [ xCategories, setXCategories ] = useState([]);
	const [ currentSector, setCurrentSector ] = useState('');

	const auth = useSelector((state) => state.auth);
	const filterItem = useSelector((state) => state.auth.filterItem);
	const heatmapData = useSelector((state) => state.scope3.heatmapData);

	const { materiality,loading } = filterItem;

	const getCategoryKey = (category) => {
		switch (category) {
			case 'Category_1':
				return 0;
			case 'Category_2':
				return 1;
			case 'Category_3':
				return 2;
			case 'Category_4':
				return 3;
			case 'Category_5':
				return 4;
			case 'Category_6':
				return 5;
			case 'Category_7':
				return 6;
			case 'Category_8':
				return 7;
			case 'Category_9':
				return 8;
			case 'Category_10':
				return 9;
			case 'Category_11':
				return 10;
			case 'Category_12':
				return 11;
			case 'Category_13':
				return 12;
			case 'Category_14':
				return 13;
			case 'Category_15':
				return 14;
			default:
				return 0;
		}
	};
	const fetchDetails = async () => {
		const data = getRequestData('SECTORAL_SCOPE3_MATERILITY', auth);
		await dispatch(getScope3Data(data));
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			if (heatmapData && heatmapData['data'] && Object.keys(heatmapData['data']).length > 0) {
				const sectorName = heatmapData['data']['SectorList'][0];
				getChartData(materiality, sectorName);
			}
		},
		[ heatmapData, materiality ]
	);
	const handleSectorChange = (e) => {
		const sectorName = e.target.value;
		getChartData(materiality, sectorName);
	};

	const getChartData = (materialityType, currentSectorName) => {
		const { emission, sector } = filterItem;

		let chartData = [];
		let xCategories = [];
		let tableData = [];
		let res = [];

		let sectorList = heatmapData['data']['SectorList'];
		const key = `${sector}${emission}Port`;
		const tableResponse = heatmapData['data']['Table']['Sector_Categories'];

		if (materialityType == 'matPort') {
			res = heatmapData['data'][key][0]['PortfolioScaled'];
		} else {
			res = heatmapData['data'][key][1]['SectorScaled'];
		}
		if (res.length > 0) {
			res.map((data) => {
				const sectorName = sector == 'SASB' ? data['SASB_SICS_Sector'] : data['GICS_SECTOR_NAME'];

				if (sectorName == currentSectorName) {
					const xValue = getCategoryKey(data.y);
					const yValue = sectorList.indexOf(sectorName);
					chartData.push([ xValue, yValue, data.z ]);

					const xLabel = data.n.replaceAll('_', ' ');
					if (!xCategories.includes(xLabel)) {
						xCategories.push(xLabel);
					}
				}
			});
		}
		if (tableResponse && tableResponse.length > 0) {
			tableResponse.map((table) => {
				tableData.push({
					security: table['Security_Name'],
					business: table['Business Travel'],
					capital: table['Capital Goods'],
					downstreamLease: table['Downstream Leased Assets'],
					downstreamTransport: table['Downstream Transport Distribution'],
					employee: table['Employee Commuting'],
					endOfLife: table['End of Life Treatment of Sold Products'],
					franchise: table['Franchises'],
					fuel: table['Fuel and Energy Related Activities'],
					investments: table['Investments'],
					processing: table['Processing of Sold Products'],
					purchased: table['Purchased Goods and Services'],
					upstreamLeased: table['Upstream Leased Assets'],
					upstreamTransport: table['Upstream Transport and Distribution'],
					useSolid: table['Use of Sold Products'],
					waste: table['Waste Generated']
				});
			});
		}

		setChartData(chartData);
		setYCategories(sectorList);
		setXCategories(xCategories);
		setTableData(tableData);
		setCurrentSector(currentSectorName);
	};

	return (
		<React.Fragment>
			{loading ? (
				<CircularProgress />
			) : heatmapData.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{heatmapData.error}
				</Box>
			) : (
				<React.Fragment>
					<Grid container>
						<Grid item xs={4}>
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel>Select Sector</InputLabel>
								<Select label="Select Sector" value={currentSector} onChange={handleSectorChange}>
									{yCategories.length > 0 &&
										yCategories.map((sector) => <MenuItem value={sector}>{sector}</MenuItem>)}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<HeatmapChart
						chartKey="SECTORAL_SCOPE3_HEATMAP"
						yAxisCategories={yCategories}
						data={chartData}
						xAxisCategories={xCategories}
						isSectoral={true}
					/>
					<DataTable
						data={tableData}
						columns={sectoralScope3Cells}
						tableHeading="SECTORAL_SCOPE3_HEATMAP"
						isScroll={true}
					/>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default SectoralScope3Heatmap;
