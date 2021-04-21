import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getScope3Data } from '../../redux/actions/scope3Actions';
import HeatmapChart from '../../components/ChartsComponents/HeatmapChart';
import DataTable from '../../components/Table/DataTable';

const useStyles = makeStyles(() => ({
	formControl: {
		width: 200,
		margin: 15
	}
}));

const headCells = [
	{
		name: 'Company Name',
		selector: 'security',
		sortable: true,
		right: false,
		wrap: true
	},
	{
		name: 'Purchased Goods and Services',
		selector: 'purchased',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.purchased == -1 || row.purchased == -999999 ? 'NA' : new Intl.NumberFormat().format(row.purchased)}
			</div>
		)
	},
	{
		name: 'Capital Goods',
		selector: 'capital',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.capital == -1 || row.capital == -999999 ? 'NA' : new Intl.NumberFormat().format(row.capital)}
			</div>
		)
	},
	{
		name: 'Fuel and Energy Related Activities',
		selector: 'fuel',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>{row.fuel == -1 || row.fuel == -999999 ? 'NA' : new Intl.NumberFormat().format(row.fuel)}</div>
		)
	},
	{
		name: 'Upstream Transport and Distribution',
		selector: 'upstreamTransport',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.upstreamTransport == -1 || row.upstreamTransport == -999999 ? (
					'NA'
				) : (
					new Intl.NumberFormat().format(row.upstreamTransport)
				)}
			</div>
		)
	},
	{
		name: 'Waste Generated',
		selector: 'waste"',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>{row.waste == -1 || row.waste == -999999 ? 'NA' : new Intl.NumberFormat().format(row.waste)}</div>
		)
	},
	{
		name: 'Business Travel',
		selector: 'business',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.business == -1 || row.business == -999999 ? 'NA' : new Intl.NumberFormat().format(row.business)}
			</div>
		)
	},
	{
		name: 'Employee Commuting',
		selector: 'employee',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.employee == -1 || row.employee == -999999 ? 'NA' : new Intl.NumberFormat().format(row.employee)}
			</div>
		)
	},
	{
		name: 'Upstream Leased Assets',
		selector: 'upstreamLeased',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.upstreamLeased == -1 || row.upstreamLeased == -999999 ? (
					'NA'
				) : (
					new Intl.NumberFormat().format(row.upstreamLeased)
				)}
			</div>
		)
	},
	{
		name: 'Downstream Transport Distribution',
		selector: 'downstreamTransport',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.downstreamTransport == -1 || row.downstreamTransport == -999999 ? (
					'NA'
				) : (
					new Intl.NumberFormat().format(row.downstreamTransport)
				)}
			</div>
		)
	},
	{
		name: 'Processing of Sold Products',
		selector: 'processing',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.processing == -1 || row.processing == -999999 ? (
					'NA'
				) : (
					new Intl.NumberFormat().format(row.processing)
				)}
			</div>
		)
	},
	{
		name: 'Use of Sold Products',
		selector: 'useSolid',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.useSolid == -1 || row.useSolid == -999999 ? 'NA' : new Intl.NumberFormat().format(row.useSolid)}
			</div>
		)
	},
	{
		name: 'End of Life Treatment of Sold Products',
		selector: 'endOfLife',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.endOfLife == -1 || row.endOfLife == -999999 ? 'NA' : new Intl.NumberFormat().format(row.endOfLife)}
			</div>
		)
	},
	{
		name: 'Downstream Leased Assets',
		selector: 'downstreamLease',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.downstreamLease == -1 || row.downstreamLease == -999999 ? (
					'NA'
				) : (
					new Intl.NumberFormat().format(row.downstreamLease)
				)}
			</div>
		)
	},
	{
		name: 'Franchises',
		selector: 'franchise',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.franchise == -1 || row.franchise == -999999 ? 'NA' : new Intl.NumberFormat().format(row.franchise)}
			</div>
		)
	},
	{
		name: 'Investments',
		selector: 'investments',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.investments == -1 || row.investments == -999999 ? (
					'NA'
				) : (
					new Intl.NumberFormat().format(row.investments)
				)}
			</div>
		)
	}
];

const SectoralScope3Heatmap = ({}) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [ chartData, setChartData ] = useState([]);
	const [ tableData, setTableData ] = useState([]);
	const [ materialityType, setMatType ] = useState('matPort');
	const [ yCategories, setYCategories ] = useState([]);
	const [ xCategories, setXCategories ] = useState([]);
	const [ currentSector, setCurrentSector ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const filterItem = useSelector((state) => state.auth.filterItem);
	const currentPortfolio = useSelector((state) => state.auth.currentPortfolio);
	const currentUser = useSelector((state) => state.auth.currentUser);
	const heatmapData = useSelector((state) => state.scope3.heatmapData);

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
		const { sector, footprintMetric, marketValue, assetClass, inferenceType, emission } = filterItem;
		setLoading(true);
		const data = {
			client: currentUser.client,
			user: currentUser.userName,
			database: currentUser.client + '_Portfolios',
			portfolio: currentPortfolio.label,
			portfolio_date: currentPortfolio.value,
			interference_type: inferenceType,
			emissions: emission,
			sector: sector,
			asset_type: assetClass,
			country_type: 'inc',
			fundamentals_quarter: 'Q1',
			emissions_quarter: 'Q1',
			version_fundamentals: '1',
			version_emissions: '11'
		};
		await dispatch(getScope3Data(data));
		setLoading(false);
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			if (heatmapData && heatmapData['data'] && Object.keys(heatmapData['data']).length > 0) {
				const sectorName = heatmapData['data']['SectorList'][0];
				getChartData(materialityType, sectorName);
			}
		},
		[ heatmapData ]
	);
	const handleMaterialityChange = (e) => {
		const matType = e.target.value;
		setMatType(matType);
		getChartData(matType,currentSector);
	};
	const handleSectorChange = (e) => {
		const sectorName = e.target.value;
		getChartData(materialityType, sectorName);
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

					if (!xCategories.includes(data.y)) {
						xCategories.push(data.y);
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
			{heatmapData.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{heatmapData.error}
				</Box>
			) : (
				<React.Fragment>
					<Grid container>
						<Grid item xs={4}>
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel>Select Sector</InputLabel>
								<Select
									value={materialityType}
									label="Select Sector"
									value={currentSector}
									onChange={handleSectorChange}
								>
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
					/>
					<DataTable
						data={tableData}
						columns={headCells}
						tableHeading="SECTORAL_SCOPE3_HEATMAP"
						loading={loading}
						isScroll={true}
					/>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default SectoralScope3Heatmap;
