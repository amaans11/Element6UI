import React, { useState,useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Paper, Grid,Tabs,Tab } from '@material-ui/core';
import TabPanel from './../../components/TabPanel';
import { footprintTabs } from '../../util/tabs-config';
import PortfolioEmission from './PortfolioEmission';
import CarbonEmission from './CarbonEmission'
import SovereignFootprint from './SovereignFootprint'
import AvoidedEmission from './AvoidedEmission'
import Disclosure from './Disclosure'
import CarbonAttribution from './CarbonAttribution';
import { setTabValue } from '../../redux/actions/authActions';

function PortfolioFootprint() {
	const tabValue = useSelector((state) => state.auth.tabValue);
	const [ value, setValue ] = useState(tabValue);
	const dispatch=useDispatch()

	const handleChange = async(event, newValue) => {
		await dispatch(setTabValue(newValue))
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
					<TabPanel value={value} index={0}>
                        <PortfolioEmission />
					</TabPanel>
					<TabPanel value={value} index={1}>
                        <CarbonEmission />
					</TabPanel>
					<TabPanel value={value} index={2}>
                        <SovereignFootprint />
					</TabPanel>
					<TabPanel value={value} index={3}>
                        <CarbonAttribution />
					</TabPanel>
					<TabPanel value={value} index={4}>
                        <Disclosure />
					</TabPanel>
					<TabPanel value={value} index={5}>
                        <AvoidedEmission />
					</TabPanel>
				</Grid>
			</Grid>
		</div>
	);
}
export default PortfolioFootprint;
