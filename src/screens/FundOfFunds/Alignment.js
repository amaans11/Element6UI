/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress } from '@material-ui/core'
import PieChart from '../../components/ChartsComponents/PieChart'
import { getAlignment, getSummary } from '../../redux/actions/fundOfFundActions'
import { Grid } from '@material-ui/core'
import DataTable from '../../components/Table/DataTable';
import {summaryCells} from '../../util/TableHeadConfig'
import getRequestData from '../../util/RequestData'
import LineChart from '../../components/ChartsComponents/Line'


const Alignment = () => {
  const dispatch = useDispatch()

  const [chartData,setChartData] = useState([])

  const auth = useSelector((state) => state.auth)
  const {allPortfolios,currentPortfolio,loading,filterItem} = auth
  const alignment = useSelector(state=>state.fund.alignment)
  const { portScenario } = filterItem

  const [lineChartData, setLineChartData] = useState([])


  useEffect(() => {
    fetchDetails()
  }, [])
  useEffect(() => {
    getChartData()
  }, [alignment])

 
  const getChildrenIds = ()=>{
    let childrenIds=[]
    let result = [currentPortfolio.value]
    if(allPortfolios && allPortfolios.length > 0){
        allPortfolios.map(portfolio=>{
            if(portfolio.portfolio_id === currentPortfolio.value ){
                 childrenIds = portfolio.children_id
            }
        })
    }
    if(childrenIds && childrenIds .length > 0){
        childrenIds.map(id=>{
            allPortfolios.map(portfolio=>{
                if(portfolio.id === id ){
                    result.push(portfolio.portfolio_id)
                }
            })
        })
    }
    return result ; 
  }

  const fetchDetails = async () => {
    const data = getChildrenIds()
    const requestData = getRequestData('PORTFOLIO_ALIGNMENT', auth)
    requestData.portfolio_id = data
    delete requestData.benchmark_id
    delete requestData.version_benchmark

    await dispatch(getAlignment(requestData))
  }
    const getPortfolioName = id=>{
      let portName = ''
        if(allPortfolios && allPortfolios.length > 0){
            allPortfolios.map(portfolio=>{
                if(portfolio.portfolio_id == id){
                    portName = portfolio.name
                }
            })
        }
        return portName
  }
  const getChartData = () => {
    let alignmentData = alignment['data']
    console.log("amaan",alignment)
    if(alignmentData && Object.keys(alignmentData).length > 0){
        let scenario =
      portScenario === 'LowEnergyDemand'
        ? 'LowEnergyDemand'
        : portScenario == 'SSP226'
        ? 'SSP2-26'
        : 'SSP1-26'

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
      
    ]
    console.log("alignmentData",alignmentData)
    const data = alignmentData['Scenarios']

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
    if(alignmentData['Children_Dots'] &&  Object.keys(alignmentData['Children_Dots'].length > 0)){
        Object.keys(alignmentData['Children_Dots']).map(el=>{
            chartData.push({
                name:getPortfolioName(el),
                data: [
                  [
                    Date.UTC(2020, '01', '01'),
                    alignmentData['Children_Dots'][el],
                    ],
                ],
              }
        )})
    }

    setLineChartData(chartData)
    }
  }
  return (
      <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : alignment.error ? (
        <Box
          align="center"
          className="error-msg"
          style={{ marginTop: 20, fontSize: 16 }}
        >
          {alignment.error}
        </Box>
      ) : (
        <Box>
          <LineChart
            data={lineChartData}
            chartKey="PORT_ALIGNMENT"
          />
        </Box>
      )}
    </React.Fragment>
  )
}

export default Alignment
