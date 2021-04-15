import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getScope3Data } from '../../redux/actions/scope3Actions';
import HeatmapChart from '../../components/ChartsComponents/HeatmapChart';

const useStyles = makeStyles(() => ({
	formControl: {
		width: 200,
		margin: 15
	}
}));
const Scope3Heatmap = ({}) => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const [ chartData, setChartData ] = useState([]);
	const [ materialityType, setMatType ] = useState('matPort');
	const [ yCategories, setYCategories ] = useState([]);
	const [ xCategories, setXCategories ] = useState([]);

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
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			getChartData(materialityType);
		},
		[ heatmapData ]
	);
	const handleMaterialityChange = (e) => {
		const materiality = e.target.value;
		setMatType(materiality);
		getChartData(materiality);
	};

	const getChartData = (matType) => {
		const { emission, sector } = filterItem;

		let chartData = [];
		let xCategories = [];
		let sectorList = [];

		if (heatmapData && heatmapData['data'] && Object.keys(heatmapData['data']).length > 0) {
			const key = `${sector}${emission}Port`;
			sectorList = heatmapData['data']['SectorList'];

			let res = [];

			if (matType == 'matPort') {
				res = heatmapData['data'][key][0]['PortfolioScaled'];
			} else {
				res = heatmapData['data'][key][1]['SectorScaled'];
			}
			if (res.length > 0) {
				res.map((data) => {
					const sectorName = sector == 'SASB' ? data['SASB_SICS_Sector'] : data['GICS_SECTOR_NAME'];

					const xValue = getCategoryKey(data.y);
					const yValue = sectorList.indexOf(sectorName);
					chartData.push([ xValue, yValue, data.z ]);

					if (!xCategories.includes(data.y)) {
						xCategories.push(data.y);
					}
				});
			}
		}

		setChartData(chartData);
		setYCategories(sectorList);
		setXCategories(xCategories);
	};

	return (
		<React.Fragment>
			{heatmapData.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{heatmapData.error}
				</Box>
			) : (
				<React.Fragment>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel>Materiality Type</InputLabel>
						<Select value={materialityType} label="Materiality Type" onChange={handleMaterialityChange}>
							<MenuItem value="matPort">Portfolio</MenuItem>
							<MenuItem value="matSector">Sector</MenuItem>
						</Select>
					</FormControl>
					<HeatmapChart
						chartKey="SCOPE3_HEATMAP"
						yAxisCategories={yCategories}
						data={chartData}
						xAxisCategories={xCategories}
					/>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default Scope3Heatmap;
