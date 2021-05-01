import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Grid, Tabs, Tab } from '@material-ui/core';
import TabPanel from './../../components/TabPanel';
import { carbonRiskTabs } from '../../util/tabs-config';
import { setTabValue } from '../../redux/actions/authActions';
import RiskContributor from './RiskContributor';

function PortfolioCarbonRisk() {
	const isVisible = useSelector((state) => state.auth.isVisible);
	const tabValue = useSelector((state) => state.auth.tabValue);

	const [ value, setValue ] = useState(tabValue);

	const dispatch = useDispatch();

	const handleChange = async (event, newValue) => {
		await dispatch(setTabValue(newValue));
		setValue(newValue);
	};

	return (
		<div className="tabs-section">
			<Grid container>
				{isVisible && <Grid item xs={3} />}
				<Grid item xs={isVisible ? 9 : 12}>
					<Paper position="static" color="default">
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="fullWidth"
						>
							{carbonRiskTabs && carbonRiskTabs.map((e, i) => <Tab label={e} {...e} />)}
						</Tabs>
					</Paper>
					<TabPanel value={value} index={0}>
						<RiskContributor />
					</TabPanel>
				</Grid>
			</Grid>
		</div>
	);
}
export default PortfolioCarbonRisk;
