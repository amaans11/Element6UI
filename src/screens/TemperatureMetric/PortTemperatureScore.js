/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {get} from 'lodash'
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar'
import DataTable from '../../components/Table/DataTable'
import getRequestData from '../../util/RequestData'
import { getTempScoreData } from '../../redux/actions/tempMetricActions'
import { tempScoreCells } from '../../util/TableHeadConfig'
import StackedBar from '../../components/ChartsComponents/StackedBar'
import 'react-circular-progressbar/dist/styles.css'
import SpiralChart from '../../components/ChartsComponents/SpiralChart'

const useStyles = makeStyles(() => ({
  companyDiv: {
    width: 200,
    height: 170,
    margin: 90,
  },
}))
const PortTemperatureScore = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const tempScoreData = useSelector((state) => state.tempMetric.tempScoreData)
  const auth = useSelector((state) => state.auth)
  const { emission, scoreType, defaultValue } = auth.filterItem
  const { loading , userInfo} = auth
  const trial = get(userInfo,'trial',false)

  const [companyChartData, setCompanyChartData] = useState([])
  const [tableData, setTableData] = useState([])
  const [targetData, setTargetData] = useState('')
  const [portScore, setPortScore] = useState(defaultValue)
  const [benchScore, setBenchScore] = useState(defaultValue)

  const currentTheme = localStorage.getItem('appTheme')

  const fetchDetails = async () => {
    const data = getRequestData('PORT_TEMPERATURE_SCORE', auth)
    await dispatch(getTempScoreData(data))
  }
  useEffect(() => {
    fetchDetails()
  }, [])

  useEffect(() => {
    getData()
  }, [tempScoreData])
  const getCompanyData = (tempData) => {
    let result = []
    const res = tempData[scoreType]['bands']

    if (res && Object.keys(res).length > 0) {
      Object.keys(res).map((band) => {
        const tempValue = res[band]['temperature_score']
        result.push({
          name: band.replace('_', '-'),
          data: [tempValue],
        })
      })
    }
    return result
  }

  const getData = () => {
    let tableData = []
    let portScore = 0
    let benchScore = 0
    let coverage = ''
    let companyData = []

    if (
      tempScoreData &&
      tempScoreData['data'] &&
      tempScoreData['data'].length > 0
    ) {
      const res = tempScoreData['data']
      switch (emission) {
        case 'Sc12':
          portScore = res[0][scoreType]['score']
          benchScore = res[3][scoreType]['score']
          coverage = res[0]['coverage']
          companyData = getCompanyData(res[0])
          break
        case 'Sc123':
          portScore = res[2][scoreType]['score']
          benchScore = res[5][scoreType]['score']
          coverage = res[2]['coverage']
          companyData = getCompanyData(res[2])
          break
        case 'Sc3':
          portScore = res[1][scoreType]['score']
          benchScore = res[4][scoreType]['score']
          coverage = res[1]['coverage']
          companyData = getCompanyData(res[1])
          break
        default:
          portScore = res[0][scoreType]['score']
          benchScore = res[2][scoreType]['score']
          coverage = res[0]['coverage']
          companyData = getCompanyData(res[0])
          break
      }
      tableData = [...res]
    }
    setTableData(tableData)
    setTargetData(coverage)
    setCompanyChartData(companyData)
    setPortScore(portScore)
    setBenchScore(benchScore)
  }
  const defaultChartValue = parseFloat(defaultValue)
  const tempScoreChartData = [portScore, benchScore,defaultChartValue ]

  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : tempScoreData.error ? (
        <Box
          align="center"
          className="error-msg"
          style={{ marginTop: 20, fontSize: 16 }}
        >
          {tempScoreData.error}
        </Box>
      ) : (
        <React.Fragment>
          <Grid container>
            <Grid item xs={3} style={{ marginRight: 5 }}>
              <SpiralChart
                data={tempScoreChartData}
                chartKey="TEMP_SCORE"
                isExportEnabled={!trial}
              />
            </Grid>
            <Grid item xs={5} style={{ marginTop: 70 }}>
              <StackedBar
                categories={['Number Of Companies']}
                data={companyChartData}
                chartKey="PORT_COMPANIES_SCORE"
                isExportEnabled={!trial}
              />
            </Grid>
            <Grid item xs={3}>
              <Box className={classes.companyDiv}>
                <CircularProgressbarWithChildren
                  value={targetData}
                  styles={buildStyles({
                    pathColor: currentTheme === 'dark' ? '#1bdecb' : '#1E2732',
                  })}
                >
                  <div
                    className="default-font"
                    style={{
                      fontSize: 12,
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Disclosed Target
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >{`${targetData}%`}</div>
                </CircularProgressbarWithChildren>
              </Box>
            </Grid>
          </Grid>
          <Grid conatiner>
            <DataTable
              data={tableData}
              columns={tempScoreCells}
              tableHeading="TEMP_SCORE"
              isTrial={trial}

            />
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default PortTemperatureScore
