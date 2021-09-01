/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, CircularProgress } from '@material-ui/core'
import {get} from 'lodash'
import getRequestData from '../../util/RequestData'
import PieChart from '../../components/ChartsComponents/PieChart'
import ColumnChart from '../../components/ChartsComponents/ColumnChart'
import { getContribAnalysis } from '../../redux/actions/tempMetricActions'

const ContributionAnalysis = () => {
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const contributionAnalysis = useSelector(
    (state) => state.tempMetric.contributionAnalysis,
  )

  const [chartData, setChartData] = useState([])
  const [chartCategories, setChartCategories] = useState([])
  const [investmentData, setInvetsmentData] = useState([])
  const [contribData, setContribData] = useState([])

  const { filterItem, loading , userInfo } = auth
  const { scoreType, emission } = filterItem
  const trial = get(userInfo,'Trial',false)


  const fetchDetails = async () => {
    const data = getRequestData('CONTRIBUTION_ANALYSIS', auth)
    await dispatch(getContribAnalysis(data))
  }
  useEffect(() => {
    fetchDetails()
  }, [])
  useEffect(() => {
    getChartData()
  }, [contributionAnalysis])
  const getScoreType = () => {
    if (scoreType === 'shortTerm') {
      return 'short'
    } else if (scoreType === 'longTerm') {
      return 'long'
    } else {
      return 'mid'
    }
  }

  const getChartData = () => {
    let chartData = []
    let tempValues = []
    let contribData = [
      {
        name: 'Contribution',
        data: [],
      },
    ]
    let investmentData = [
      {
        name: 'Investment',
        data: [],
      },
    ]
    let chartCategories = []

    if (
      contributionAnalysis &&
      contributionAnalysis['data'] &&
      Object.keys(contributionAnalysis['data']).length > 0
    ) {
      const score = getScoreType()

      const res = contributionAnalysis['data'][score][emission]

      if (res.length > 0) {
        res.map((data) => {
          contribData[0]['data'].push({
            name: data['sector'],
            y: data['contribution'],
          })
          investmentData[0]['data'].push({
            name: data['sector'],
            y: data['investment'],
          })
          tempValues.push(data['temperature_score'])
          chartCategories.push(data['sector'])
        })
        chartData = [
          {
            name: 'Temperature Score',
            data: tempValues,
          },
        ]
      }
    }

    setChartData(chartData)
    setChartCategories(chartCategories)
    setInvetsmentData(investmentData)
    setContribData(contribData)
  }

  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : contributionAnalysis.error ? (
        <Box
          align="center"
          className="error-msg"
          style={{ marginTop: 20, fontSize: 16 }}
        >
          {contributionAnalysis.error}
        </Box>
      ) : (
        <React.Fragment>
          <Grid container>
            <Grid item xs={6}>
              <PieChart
                chartKey="INVESTMENT"
                data={investmentData}
                isExportEnabled={!trial}
              />
            </Grid>
            <Grid item xs={6}>
              <PieChart
                chartKey="CONTRIBUTION"
                data={contribData}
                isExportEnabled={!trial}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default ContributionAnalysis
