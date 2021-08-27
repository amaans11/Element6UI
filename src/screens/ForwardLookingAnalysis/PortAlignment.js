/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress } from '@material-ui/core'
import { getPortfolioAlignment } from '../../redux/actions/flmActions'
import getRequestData from '../../util/RequestData'
import LineChart from '../../components/ChartsComponents/Line'

const PortAlignment = () => {
  const dispatch = useDispatch()

  const portAlignment = useSelector((state) => state.flm.portAlignment)
  const auth = useSelector((state) => state.auth)
  const { loading, filterItem } = auth
  const { portScenario } = filterItem

  const [lineChartData, setLineChartData] = useState([])

  useEffect(() => {
    fetchDetails()
  }, [])

  useEffect(() => {
    if (
      portAlignment &&
      portAlignment['data'] &&
      Object.keys(portAlignment['data']).length > 0
    ) {
      getChartData()
    }
  }, [portAlignment])

  const fetchDetails = async () => {
    const data = getRequestData('PORTFOLIO_ALIGNMENT', auth)
    await dispatch(getPortfolioAlignment(data))
  }

  const getChartData = () => {
    let alignmentData = portAlignment['data']
    let scenario = portScenario === 'LowEnergyDemand' ? 'LowEnergyDemand' : portScenario == 'SSP226' ? 'SSP2-26' : 'SSP1-26'

    let chartData = [
      {
        name: 'One Point Seven Five',
        data: [],
      },
      {
        name: scenario,
        data: [],
      },
      {
        name: 'Two',
        data: [],
      },
      {
        name: 'Two Point Seven',
        data: [],
      },
      {
        name: 'Benchmark',
        data: [
          [
            Date.UTC(alignmentData['dot_benchmark']['x'], '01', '01'),
            alignmentData['dot_benchmark']['y'],
          ],
        ],
      },
      {
        name: 'Portfolio',
        data: [
          [
            Date.UTC(alignmentData['dot_portfolio']['x'], '01', '01'),
            alignmentData['dot_portfolio']['y'],
          ],
        ],
      },
    ]
    const data = alignmentData['Portfolio Alignment']

    if (data && Object.keys(data).length > 0) {
      Object.keys(data).map((year) => {
        chartData[0]['data'].push([
          Date.UTC(year, '01', '01'),
          data[year]['OnePointSevenFive'],
        ])
        chartData[1]['data'].push([
          Date.UTC(year, '01', '01'),
          data[year][scenario],
        ])
        chartData[2]['data'].push([
          Date.UTC(year, '01', '01'),
          data[year]['Two'],
        ])
        chartData[3]['data'].push([
          Date.UTC(year, '01', '01'),
          data[year]['TwoPointSeven'],
        ])
      })
    }

    setLineChartData(chartData)
  }

  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : portAlignment.error ? (
        <Box
          align="center"
          className="error-msg"
          style={{ marginTop: 20, fontSize: 16 }}
        >
          {portAlignment.error}
        </Box>
      ) : (
        <Box>
          <LineChart data={lineChartData} chartKey="PORT_ALIGNMENT" />
        </Box>
      )}
    </React.Fragment>
  )
}

export default PortAlignment
