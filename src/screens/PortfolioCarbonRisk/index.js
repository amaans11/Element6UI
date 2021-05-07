import React from 'react';
import { useSelector } from 'react-redux';
import {  Grid } from '@material-ui/core';
import RiskContributor from './RiskContributor';

function PortfolioCarbonRisk() {
	const isVisible = useSelector((state) => state.auth.isVisible);

	return (
		<div className="tabs-section">
			<Grid container>
				{isVisible && <Grid item xs={3} />}
				<Grid item xs={isVisible ? 9 : 12}>
					<RiskContributor />
				</Grid>
			</Grid>
		</div>
	);
}
export default PortfolioCarbonRisk;
