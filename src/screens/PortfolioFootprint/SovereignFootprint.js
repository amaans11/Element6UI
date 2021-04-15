import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import { getSovereignFootprint } from '../../redux/actions/footprintActions';
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar';
import DataTable from '../../components/Table/DataTable';

const headCells = [
	{
		name: 'Type',
		selector: 'name',
		sortable: true,
		right: false
	},
	{
		name: 'Emissions Intensity of GDP (tCO2/1,000 $USD)',
		selector: 'gdpData',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.gdpData)}</div>
	},
	{
		name: 'Emissions Intensity of Population (tCO2/person)',
		selector: 'popData',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.popData)}</div>
	}
];

const SovereignFootprint = ({}) => {
	const currentPortfolio = useSelector((state) => state.auth.currentPortfolio);
	const currentBenchmark = useSelector((state) => state.auth.currentBenchmark);
	const currentYear = useSelector((state) => state.auth.currentYear);
	const currentCurrency = useSelector((state) => state.auth.currentCurrency);
	const currentQuarter = useSelector((state) => state.auth.currentQuarter);
	const currentUser = useSelector((state) => state.auth.currentUser);
	const sovFootprint = useSelector((state) => state.footprint.sovFootprint);

	const [ gdpChartData, setGdpChartData ] = useState([]);
	const [ popChartData, setPopChartData ] = useState([]);
	const [ categories, setCategories ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ tableData, setTableData ] = useState([]);

	const dispatch = useDispatch();

	const fetchDetails = async () => {
		setLoading(true);
		const data = {
			client: currentUser.client,
			user: currentUser.userName,
			portfolio: currentPortfolio.label,
			portfolio_date: currentPortfolio.value,
			benchmark: currentBenchmark.label,
			benchmark_date: currentBenchmark.value,
			currency: currentCurrency,
			year: currentYear,
			quarter: currentQuarter,
			country_type: 'dom',
			fundamentals_quarter: 'Q1',
			version_fundamentals: '1',
			asset_type: 'Sov'
		};
		await dispatch(getSovereignFootprint(data));
		setLoading(false);
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
		console.log('tableData1>>', tableData);

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
			{sovFootprint.error ? (
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
						columns={headCells}
						tableHeading="SOVEREIGN_FOOTPRINT"
						loading={loading}
					/>
				</Box>
			)}
		</React.Fragment>
	);
};
export default SovereignFootprint;
