import React from 'react';
import DataTable from '../../components/Table/DataTable';
import { backgroundCells } from '../../util/TableHeadConfig';

const tableData = [
	{
		shortName: 'VICI Properties',
		isin: 'US8781232874AD',
		sasb_industry: 'Insurance',
		disclousre: '3.0',
		portfolio_weight: '0.428'
	},
	{
		shortName: 'MDU RES Group',
		isin: 'US8781232874AD',
		sasb_industry: 'SOftware & IT Services',
		disclousre: '2.1',
		portfolio_weight: '0.11'
	},
	{
		shortName: 'FOX CORP A',
		isin: 'US8781232874AD',
		sasb_industry: 'Construction Material',
		disclousre: '2.3',
		portfolio_weight: '0.234'
	},
	{
		shortName: 'BLACK KNIGHT',
		isin: 'US8781232874AD',
		sasb_industry: 'Insurance',
		disclousre: '4.3',
		portfolio_weight: '0.111'
	}
];
const Background = () => {
	return (
		<React.Fragment>
			<DataTable data={tableData} columns={backgroundCells} tableHeading="BACKGROUND" />
		</React.Fragment>
	);
};

export default Background;
