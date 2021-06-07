import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid, Tabs, Tab } from '@material-ui/core';
import TabPanel from './../../components/TabPanel';
import { nlpTabs } from '../../util/tabs-config';
import { setTabValue } from '../../redux/actions/authActions';
import Background from './Background';
import ArticleAnalysis from './ArticleAnalysis';
import PortfolioOverview from './PortfolioOverview';
import SectorOverview from './SectorOverview';

function NLP() {
	const tabValue = useSelector((state) => state.auth.tabValue);
	const isVisible = useSelector((state) => state.auth.isVisible);
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
							{nlpTabs && nlpTabs.map((e, i) => <Tab label={e} {...e} />)}
						</Tabs>
					</Paper>
					<TabPanel value={value} index={0}>
                        <SectorOverview />
                    </TabPanel>
					<TabPanel value={value} index={1}>
                        <PortfolioOverview />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ArticleAnalysis />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Background />
                    </TabPanel>
				</Grid>
			</Grid>
		</div>
	);
}
export default NLP;
