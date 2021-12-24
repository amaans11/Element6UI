/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress } from '@material-ui/core'
import {get} from 'lodash'
import { getTempAttribution } from '../../redux/actions/tempMetricActions'
import ColumnChart from '../../components/ChartsComponents/ColumnChart'
import getRequestData from '../../util/RequestData'

const Attribution = () => {
  const tempAttribution = useSelector(
    (state) => state.tempMetric.tempAttribution,
  )
  const auth = useSelector((state) => state.auth)

  const { loading , userInfo } = auth
  const { scoreType, emission } = auth.filterItem

  const [chartData, setChartData] = useState([])
  const [categories, setCategories] = useState([])

  const dispatch = useDispatch()
  const trial = get(userInfo,'trial',false)

  const fetchDetails = async () => {
    const data = getRequestData('TEMP_ATTRIBUTION', auth)
    await dispatch(getTempAttribution(data))
  }
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
    const score = getScoreType()
    const data =
      tempAttribution && tempAttribution['data']
        ? tempAttribution['data'][score]
        : {}
    let chartData = []
    let categories = []

    if (data && data.length > 0) {
      data.map((res) => {
        let values = []
        if (res && res['points'] && res['points'].length > 0) {
          res['points'].map((value) => {
            const sector = value['x']
            if (!categories.includes(sector)) {
              categories.push(sector)
            }
            values.push(value['y'][emission])
          })
        }
        chartData.push({
          name: res['name'],
          data: values,
        })
      })
    }
    setChartData(chartData)
    setCategories(categories)
  }
  useEffect(() => {
    fetchDetails()
  }, [])
  useEffect(() => {
    getChartData()
  }, [tempAttribution])

  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : tempAttribution.error ? (
        <Box
          align="center"
          className="error-msg"
          style={{ marginTop: 20, fontSize: 16 }}
        >
          {tempAttribution.error}
        </Box>
      ) : (
        <ColumnChart
          categories={categories}
          data={chartData}
          chartKey="TEMP_ATTRIBUTION"
          isExportEnabled={!trial}
        />
      )}
    </React.Fragment>
  )
}
export default Attribution
