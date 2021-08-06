import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Grid, Tabs, Tab } from '@material-ui/core'
import TabPanel from './../../components/TabPanel'
import { forwardTabs } from '../../util/tabs-config'
import { setTabValue } from '../../redux/actions/authActions'
import PortAlignment from './PortAlignment'
import TargetSetting from './TargetSetting'
import CompanyProfile from './CompanyProfile'
import CarbonAdjustedReturns from './CarbonAdjustedReturns'

function ForwardLookingAnalysis() {
  const tabValue = useSelector((state) => state.auth.tabValue)
  const isVisible = useSelector((state) => state.auth.isVisible)
  const [value, setValue] = useState(tabValue)

  const dispatch = useDispatch()

  const handleChange = async (event, newValue) => {
    await dispatch(setTabValue(newValue))
    setValue(newValue)
  }

  return (
    <div className="tabs-section">
      <Grid container>
        {isVisible && <Grid item xs={3} />}
        <Grid item xs={isVisible ? 9 : 12}>
          <Paper position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              fullWidth="true"
              inkBarStyle={{ background: 'blue' }}
            >
              {forwardTabs &&
                forwardTabs.map((e, i) => (
                  <Tab label={e} {...e} style={{ fontSize: 11 }} />
                ))}
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <PortAlignment />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TargetSetting />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CompanyProfile />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <CarbonAdjustedReturns />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  )
}
export default ForwardLookingAnalysis
