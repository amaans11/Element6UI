import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';
import { getScope3Data } from '../../redux/actions/scope3Actions';
import HeatmapChart from '../../components/ChartsComponents/HeatmapChart';
import getRequestData from '../../util/RequestData';

const Scope3Heatmap = ({ tabValue }) => {
	const dispatch = useDispatch();

	const auth = useSelector((state) => state.auth);
	const filterItem = useSelector((state) => state.auth.filterItem);
	const heatmapData = useSelector((state) => state.scope3.heatmapData);

	const [ chartData, setChartData ] = useState([]);
	const [ yCategories, setYCategories ] = useState([]);
	const [ xCategories, setXCategories ] = useState([]);

	const { materiality, loading } = filterItem;

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
		const data = getRequestData('SCOPE3_MATERILITY', auth);
		await dispatch(getScope3Data(data));
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			getChartData(materiality);
		},
		[ heatmapData, materiality ]
	);

	const getChartData = (matType) => {
		console.log('matType', matType);
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

					const yLabel = data.y.replace('_', '');
					if (!xCategories.includes(yLabel)) {
						xCategories.push(yLabel);
					}
				});
			}
		}

		setChartData(chartData);
		setYCategories(sectorList);
		setXCategories(xCategories);
	};
	console.log('');

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
