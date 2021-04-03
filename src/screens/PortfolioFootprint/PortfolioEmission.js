import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPortfolioEmission } from '../../redux/actions/footprintActions';
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar';

const PortfolioEmission = ({}) => {
	const dispatch = useDispatch();

	const fetchDetails = async () => {
		const data = {
			asset_type: 'CB',
			benchmark: 'BMW_Sample_Benchmark',
			benchmark_date: 20200930,
			client: 'test3',
			currency: 'USD',
			emissions_quarter: 'Q1',
			footprint_metric: 'Revenue',
			fundamentals_quarter: 'Q1',
			market_value: 'Equity',
			portfolio: 'BMW_Sample_Benchmark',
			portfolio_date: 20200930,
			quarter: 'Q1',
			sector: 'SASB',
			version: '',
			version_emissions: '11',
			version_fundamentals: '1',
			year: '2020'
		};
		await dispatch(getPortfolioEmission(data));
	};
	useEffect(() => {
		fetchDetails();
	}, []);

	const horizontalBarData = [
		{
			name: 'portfolio',
			data: [ 107, 31, 635 ]
		},
		{
			name: 'Benchmark',
			data: [ 133, 156, 947 ]
		}
	];
	const categories = [ 'Scope 1+2', 'Scope 3', 'Scope 1+2+3' ];

	return (
		<React.Fragment>
			<HorizontalBar categories={categories} data={horizontalBarData} chartKey="PORTFOLIO_INTENSITY" />
		</React.Fragment>
	);
};

export default PortfolioEmission;
