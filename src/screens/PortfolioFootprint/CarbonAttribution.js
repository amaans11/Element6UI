/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import { map,get } from 'lodash'
import { getCarbonAttribution } from '../../redux/actions/footprintActions'
import ColumnChart from '../../components/ChartsComponents/ColumnChart'
import getRequestData from '../../util/RequestData'

const CarbonAttribution = () => {
  const carbonAttribution = useSelector(
    (state) => state.footprint.carbonAttribution,
  )
  const auth = useSelector((state) => state.auth)
  const { loading,userInfo } = auth
	const trial = get(userInfo,'trial',false)

  const [chartData, setChartData] = useState([])
  const [categories, setCategories] = useState([])
  const [chartLabel, setChartLabel] = useState('')


  const dispatch = useDispatch()

  const fetchDetails = async () => {
    const data = getRequestData('CARBON_ATTRIBUTION', auth)
    await dispatch(getCarbonAttribution(data))
  }

  const getChartData = () => {
    const data =
      carbonAttribution && Object.keys(carbonAttribution).length > 0
        ? carbonAttribution['data']
        : []
    let chartData = []
    let categories = []
    let chartLabel = ''

    if (data && data.length > 0) {
      chartLabel= data[data.length - 1]['chart_name']
      data.map((res,index) => {
        let values = []

        if (res['points'] && res['points'].length > 0) {
          values = map(res['points'], 'y')
          categories = map(res['points'], 'x')
        }
        if(index != 4){
          chartData.push({
            name: res['name'],
            data: values,
          })
        }
       
      })
    }
    console.log("chartData<<",chartData)
    setChartLabel(chartLabel)
    setChartData(chartData)
    setCategories(categories)
  }
  useEffect(() => {
    fetchDetails()
  }, [])
  useEffect(() => {
    getChartData()
  }, [carbonAttribution])

  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : carbonAttribution.error ? (
        <Box
          align="center"
          className="error-msg"
          style={{ marginTop: 20, fontSize: 16 }}
        >
          {carbonAttribution.error}
        </Box>
      ) : (
        <React.Fragment>
          <ColumnChart
            categories={categories}
            data={chartData}
            chartKey="CARBON_ATTRIBUTION"
            isExportEnabled={!trial}
            yAxisTitle={chartLabel}
          />
          <div
            style={{
              fontSize: 14,
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            This module allows investors to interrogate the role of sector
            allocation and stock selection that lead to differences in the
            carbon intensity of the portfolio and chosen benchmark. In this
            graph, you can isolate the contributions to the differences in
            footprint between the portfolio and benchmark. Carbon attribution
            illustrates whether changes in the carbon intensity of the portfolio
            compared to the benchmark are changed by selecting lower or higher
            carbon stocks or sectors. This technique is employed to help
            identify the most effective combination of stock and sectoral
            allocations to reduce the carbon risk of the portfolio.
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
export default CarbonAttribution
