import React, { useState } from 'react'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Grid, Tabs, Tab } from '@material-ui/core'
import TabPanel from './../../components/TabPanel'
import { tempMetricTabs } from '../../util/tabs-config'
import { setTabValue } from '../../redux/actions/authActions'
import PortTemperatureScore from './PortTemperatureScore'
import CompanyAnalysis from './CompanyAnalysis'
import Attribution from './Attribution'
import Heatmap from './Heatmap'
import ContributionAnalysis from './ContributionAnalysis'
import SectoralTempScore from './SectoralTempScore'

const useStyles = makeStyles((theme) => ({
  tabPane: {
    width: 1200,
  },
}))

function TemperatureMetric() {
  const tabValue = useSelector((state) => state.auth.tabValue)
  const isVisible = useSelector((state) => state.auth.isVisible)

  const [value, setValue] = useState(tabValue)

  const classes = useStyles()
  const dispatch = useDispatch()

  const handleChange = async (event, newValue) => {
    await dispatch(setTabValue(newValue))
    setValue(newValue)
  }

  return (
    <div className="tabs-section">
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={9}>
          <Paper position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              inkBarStyle={{ background: 'blue' }}
            >
              {' '}
              {tempMetricTabs &&
                tempMetricTabs.map((e, i) => (
                  <Tab label={e} {...e} style={{ fontSize: 11 }} />
                ))}
            </Tabs>
          </Paper>

          <TabPanel value={value} index={0}>
            <PortTemperatureScore />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CompanyAnalysis />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Attribution />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <SectoralTempScore />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ContributionAnalysis />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Heatmap />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  )
}
export default TemperatureMetric
