import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { some, findIndex } from 'lodash';
import { getRiskContributorData } from '../../redux/actions/riskContributionActions';
import getRequestData from '../../util/RequestData';
import BubbleChart from '../../components/ChartsComponents/BubbleChart';
import { riskContribCells } from '../../util/TableHeadConfig';
import DataTable from '../../components/Table/DataTable';

const RiskContributor = ({}) => {
	const dispatch = useDispatch();

	const auth = useSelector((state) => state.auth);
	const riskContribData = useSelector((state) => state.risk.riskContribData);

	const { year, intensityScope } = auth.filterItem;

	const [ chartData, setChartData ] = useState([]);
	const [ tableData, setTableData ] = useState([]);

	useEffect(() => {
		fetchDetails();
	}, []);

	useEffect(
		() => {
			if (riskContribData && riskContribData['data'] && Object.keys(riskContribData['data']).length > 0) {
				getChartData(riskContribData['data']);
			}
		},
		[ riskContribData ]
	);

	const fetchDetails = async () => {
		const data = getRequestData('RISK_CONTRIBUTOR', auth);
		await dispatch(getRiskContributorData(data));
	};

	const getChartData = (response) => {
		let tableData = [];
		let chartData = [];

		response['Data'].map((res) => {
			tableData.push({
				company: res['Company'],
				isin: res['ISIN'],
				sasb_sector: res['SASB_Sector'],
				weight: res['Weight'],
				annualized_return:
					year == '1Y'
						? res['ContributionAnnualised1Y']
						: year == '3Y' ? res['ContributionAnnualised3Y'] : res['ContributionAnnualised5Y'],
				annualized_risk:
					year == '1Y'
						? res['ContributionRisk1Y']
						: year == '3Y' ? res['ContributionRisk3Y'] : res['ContributionRisk5Y'],
				intensity: intensityScope == 'Sc12' ? res['ContribSc12'] : res['ContribSc123']
			});
			if (some(chartData, { name: res['SASB_Sector'] })) {
				const index = findIndex(chartData, { name: res['SASB_Sector'] });
				const xVal =
					year == '1Y'
						? res['ContributionRisk1Y']
						: year == '3Y' ? res['ContributionRisk3Y'] : res['ContributionRisk5Y'];
				const yVal =
					year == '1Y'
						? res['ContributionAnnualised1Y']
						: year == '3Y' ? res['ContributionAnnualised3Y'] : res['ContributionAnnualised5Y'];
				const zVal = intensityScope == 'Sc12' ? res['ContribSc12'] : res['ContribSc123'];
				chartData[index]['data'].push([ xVal, yVal, zVal ]);
			} else {
				const xVal =
					year == '1Y'
						? res['ContributionRisk1Y']
						: year == '3Y' ? res['ContributionRisk3Y'] : res['ContributionRisk5Y'];
				const yVal =
					year == '1Y'
						? res['ContributionAnnualised1Y']
						: year == '3Y' ? res['ContributionAnnualised3Y'] : res['ContributionAnnualised5Y'];
				const zVal = intensityScope == 'Sc12' ? res['ContribSc12'] : res['ContribSc123'];

				chartData = [
					...chartData,
					{
						name: res['SASB_Sector'],
						data: [ [ xVal, yVal, zVal ] ]
					}
				];
			}
		});
		setTableData(tableData);
		setChartData(chartData);
	};

	return (
		<React.Fragment>
			{riskContribData.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{riskContribData.error}
				</Box>
			) : (
				<Box>
					<BubbleChart
						chartKey="RISK_CONTRIBUTOR"
						data={chartData}
						xAxisLabel="Contribution to Intensity"
						yAxisLabel="Contribution to Annualized Risk"
						zAxisLabel="Contribution to Annualized Return"
						xAxisTitle={`Contribution to Annualized Risk (${year})`}
						yAxisTitle={`Contribution to Annualized Return (${year})`}
					/>
					<DataTable data={tableData} columns={riskContribCells} tableHeading="RISK_CONTRIBUTOR" />
				</Box>
			)}
		</React.Fragment>
	);
};

export default RiskContributor;
