import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Paper, Grid,Tabs,Tab } from '@material-ui/core';
import TabPanel from './../../components/TabPanel';
import { scope3Tabs } from '../../util/tabs-config';
import { setTabValue } from '../../redux/actions/authActions';
import Scope3Heatmap from './Scope3Heatmap'
import SectoralScope3Heatmap from './SectoralScope3Heatmap';

function Scope3Materiality() {
	const tabValue = useSelector((state) => state.auth.tabValue);
    const isVisible = useSelector((state) => state.auth.isVisible);
	const [ value, setValue ] = useState(tabValue);
	const dispatch=useDispatch()

	const handleChange = async(event, newValue) => {
		await dispatch(setTabValue(newValue))
		setValue(newValue);
	};
    console.log("isVisible",isVisible)

	return (
		<div className="tabs-section">
			<Grid container>
				{isVisible && <Grid item xs={3} />}
				<Grid item xs={isVisible ? 9 : 12}>
					<Paper position="static" color="default">
						<Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
							{scope3Tabs &&
								scope3Tabs.map((e, i) => <Tab label={e} {...e} style={{ width: 1200 }} />)}
						</Tabs>
					</Paper>
                    <TabPanel value={value} index={0}>
                        <Scope3Heatmap 
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SectoralScope3Heatmap 
                        />
                    </TabPanel>
				</Grid>
			</Grid>
		</div>
	);
}
export default Scope3Materiality;
