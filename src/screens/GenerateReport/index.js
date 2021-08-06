import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Grid,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NotificationManager } from 'react-notifications'
import { generateReport } from '../../redux/actions/authActions'
import getRequestData from '../../util/RequestData'

const useStyles = makeStyles(() => ({
  description: {
    paddingTop: 20,
    color: 'rgb(120,120,120)',
    fontSize: 16,
  },
}))
const GenerateReport = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [pages, setPages] = useState([])
  const [template, setTemplate] = useState('dark')

  const auth = useSelector((state) => state.auth)
  const { isVisible } = auth

  const handleCheckboxChange = (key, value) => {
    let list = [...pages]
    if (value) {
      list = [...list, key]
    } else {
      const index = list.indexOf(key)
      list.splice(index, 1)
    }
    setPages(list)
  }
  const onSelectAllHandler = (e) => {
    const value = e.target.checked

    if (value) {
      setPages([1, 2, 3, 4, 5, 6, 7, 8])
    } else {
      setPages([])
    }
  }
  const handleSubmit = async () => {
    let data = getRequestData('GENERATE_REPORT', auth)

    data = {
      ...data,
      pages: pages,
      template: template,
    }
    await dispatch(generateReport(data))
    NotificationManager.success(
      'Your report is being processed and will be emailed to you shortly.',
    )
  }

  return (
    <Grid container>
      {isVisible && <Grid item xs={3} />}
      <Grid item xs={isVisible ? 9 : 12}>
        <Box m={4}>
          <Typography align="center" variant="h4">
            Generate your portfolio Urgentem report
          </Typography>
          <div
            style={{
              fontSize: 14,
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            Generate an Urgentem Portfolio Climate Report. This report contains
            key portfolio, sector and security-level emissions analysis. Metrics
            include emissions footprint, intensity, attribution, science-based
            scenarios and forward-looking analytics.
          </div>
          <Box mt={4}>
            <FormControl variant="outlined">
              <Box mb={1}>
                <InputLabel>Template</InputLabel>
              </Box>
              <Select
                value={template}
                onChange={(e) => {
                  setTemplate(e.target.value)
                }}
              >
                <MenuItem value="dark">Urgentem Dark</MenuItem>
                <MenuItem value="ink_friendly">Urgentem Ink Friendly</MenuItem>
                <MenuItem value="custom">Client Customised</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mt={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="footprint"
                  onChange={(e) => {
                    handleCheckboxChange(1, e.target.checked)
                  }}
                  color="default"
                  checked={pages.includes(1) ? true : false}
                />
              }
              label="Portfolio Footprint"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="sectoral"
                  onChange={(e) => {
                    handleCheckboxChange(2, e.target.checked)
                  }}
                  color="default"
                  checked={pages.includes(2) ? true : false}
                />
              }
              label="Sectoral Analysis"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="disclosure"
                  onChange={(e) => {
                    handleCheckboxChange(3, e.target.checked)
                  }}
                  color="default"
                  checked={pages.includes(3) ? true : false}
                />
              }
              label="Disclosure"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="forward"
                  onChange={(e) => {
                    handleCheckboxChange(4, e.target.checked)
                  }}
                  color="default"
                  checked={pages.includes(4) ? true : false}
                />
              }
              label="Forward Looking Metrics: Portfolio Alignment and Target Setting"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="sovFootprint"
                  onChange={(e) => {
                    handleCheckboxChange(5, e.target.checked)
                  }}
                  color="default"
                  checked={pages.includes(5) ? true : false}
                />
              }
              label="Sovereign Footprint"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="avoidedEmis"
                  onChange={(e) => {
                    handleCheckboxChange(6, e.target.checked)
                  }}
                  color="default"
                  checked={pages.includes(6) ? true : false}
                />
              }
              label="Avoided Emissions"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="fossilFuel"
                  onChange={(e) => {
                    handleCheckboxChange(7, e.target.checked)
                  }}
                  color="default"
                  checked={pages.includes(7) ? true : false}
                />
              }
              label="Fossil Fuel Reserves Footprint"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="tempMetric"
                  onChange={(e) => {
                    handleCheckboxChange(8, e.target.checked)
                  }}
                  color="default"
                  checked={pages.includes(8) ? true : false}
                />
              }
              label="Temperature Metric: Portfolio Temperature Score"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="selectAll"
                  onChange={onSelectAllHandler}
                  color="default"
                />
              }
              label="SelectAll"
            />
            <Box mt={2}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Generate Report
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default GenerateReport
