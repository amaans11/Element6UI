import React, { useState,useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { Paper, Grid,Tabs,Tab } from '@material-ui/core';
import TabPanel from './../../components/TabPanel';
import { footprintTabs } from '../../util/tabs-config';
import PortfolioEmission from './PortfolioEmission';

function PortfolioFootprint() {
	const [ value, setValue ] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className="tabs-section">
			<Grid container>
				<Grid item xs={3} />
				<Grid item xs={9}>
					<Paper position="static" color="default">
						<Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
							{footprintTabs &&
								footprintTabs.map((e, i) => <Tab label={e} {...e} style={{ width: 40 }} />)}
						</Tabs>
					</Paper>
					<TabPanel value={0} index={0}>
                        <PortfolioEmission />
					</TabPanel>
				</Grid>
			</Grid>
		</div>
	);
}
export default PortfolioFootprint;
