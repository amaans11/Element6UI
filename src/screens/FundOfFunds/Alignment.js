/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress,FormControl,InputLabel,Select,MenuItem,Button } from '@material-ui/core'
import PieChart from '../../components/ChartsComponents/PieChart'
import { getAlignment, getSummary } from '../../redux/actions/fundOfFundActions'
import { Grid } from '@material-ui/core'
import DataTable from '../../components/Table/DataTable';
import {summaryCells} from '../../util/TableHeadConfig'
import getRequestData from '../../util/RequestData'
import LineChart from '../../components/ChartsComponents/Line'
import { result } from 'lodash'


const Alignment = () => {
  const dispatch = useDispatch()

  const [chartData,setChartData] = useState([])

  const auth = useSelector((state) => state.auth)
  const {allPortfolios,currentFundsPortfolio,loading,filterItem} = auth
  const alignment = useSelector(state=>state.fund.alignment)
  const { portScenario } = filterItem

  const [lineChartData, setLineChartData] = useState([])
  const [portIds,setPortIds] = useState([])
  const [isDeselect,setDeselect] = useState(false)


  useEffect(() => {
    fetchDetails()
  }, [])
  useEffect(() => {
    getChartData()
  }, [alignment])

 
  const getChildrenIds = ()=>{
    let childrenIds=[]
    let result = [currentFundsPortfolio.value]
    if(allPortfolios && allPortfolios.length > 0){
        allPortfolios.map(portfolio=>{
            if(portfolio.portfolio_id === currentFundsPortfolio.value ){
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
  const getSelectLabels= ()=>{
    const res = getChildrenIds()
    let result=[]
    res.shift()
    
    if(res && res.length > 0){
      res.map(el=>{
        const name = getPortfolioName(el)
        result.push({
          label:name,
          value:el
        })
      })
    }
    return result;
  }

  const fetchDetails = async () => {
    const data = getChildrenIds()
    const requestData = getRequestData('PORTFOLIO_ALIGNMENT', auth)
    requestData.portfolio_id = data
    delete requestData.benchmark_id
    delete requestData.version_benchmark

    await dispatch(getAlignment(requestData))
  }
  const handlePortIds = async(e)=>{
    let value = e.target.value

    const requestData = getRequestData('PORTFOLIO_ALIGNMENT', auth)
    requestData.portfolio_id = [...value,currentFundsPortfolio.value]
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
  const handleDeselect=async()=>{
    const requestData = getRequestData('PORTFOLIO_ALIGNMENT', auth)
    delete requestData.benchmark_id
    delete requestData.version_benchmark
    const data = getChildrenIds()


    if(!isDeselect){
      requestData.portfolio_id = [currentFundsPortfolio.value]
    }
  else{
    requestData.portfolio_id = data
  }
    await dispatch(getAlignment(requestData))
    setDeselect(!isDeselect)
  }

  const getChartData = () => {
    let alignmentData = alignment['data']
    let childIds = []
    let onePoint = [];
    let scenarioValue = [];
    let two = [];
    let twoPointSeven = [];
    let parentValue = {};

    if(alignmentData && Object.keys(alignmentData).length > 0){
        let scenario =
      portScenario === 'LowEnergyDemand'
        ? 'LowEnergyDemand'
        : portScenario == 'SSP226'
        ? 'SSP2-26'
        : 'SSP1-26'

    let chartData = []
    const data = alignmentData['Scenarios']

   
    if(alignmentData['Children_Dots'] &&  Object.keys(alignmentData['Children_Dots'].length > 0)){
        Object.keys(alignmentData['Children_Dots']).map(el=>{
            if(el !== currentFundsPortfolio.value){
              chartData.push({
                name:getPortfolioName(el),
                data: [
                  [
                    Date.UTC(2020, '01', '01'),
                    alignmentData['Children_Dots'][el],
                  ],
                ],
              })
            }
            else{
              parentValue={
                name:currentFundsPortfolio.label,
                data: [
                  [
                    Date.UTC(2020, '01', '01'),
                    alignmentData['Children_Dots'][el],
                  ],
                ],
              }
            }
        })
    }
    if (data && Object.keys(data).length > 0) {
      Object.keys(data).map((year) => {
        onePoint.push([
          Date.UTC(year, '01', '01'),
          data[year]['OnePointSevenFive'],
        ])
        scenarioValue.push([
          Date.UTC(year, '01', '01'),
          data[year][scenario],
        ])
        two.push([
          Date.UTC(year, '01', '01'),
          data[year]['Two'],
        ])
        twoPointSeven.push([
          Date.UTC(year, '01', '01'),
          data[year]['TwoPointSeven'],
        ])
        
      })
    }
    chartData.push( {
      name: 'One Point Seven Five',
      data: onePoint,
    })
    chartData.push( {
      name: scenario,
      data:scenarioValue ,
    })
    chartData.push( {
      name: 'Two',
      data: two,
    })
    chartData.push( {
      name: 'Two Point Seven',
      data: twoPointSeven,
    })
    chartData.push(parentValue)
    console.log("chartData>>",chartData)
    console.log("chartData>>",currentFundsPortfolio.label)

    if(Object.keys(alignmentData['Children_Dots']).length > 0){
      Object.keys(alignmentData['Children_Dots']).map(key=>{
           if(key !== currentFundsPortfolio.value){
             childIds.push(key)
           }
      })
    }


    setLineChartData(chartData)
    setPortIds(childIds)
    }
  }
  const options = getSelectLabels()
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
           {/* <Grid item xs={4} style={{marginTop:20}}>
              <FormControl variant="outlined" >
                <InputLabel>Select Children</InputLabel>
                <Select
                  label="Select Children"
                  value={portIds}
                  onChange={handlePortIds}
                  multiple
                  style={{fontSize:14,width:300,marginBottom:20}}
                >
                  {options.map(option => (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid> */}

          <LineChart
            data={lineChartData}
            chartKey="FUND_ALIGNMENT"
          />
          <Button onClick={handleDeselect}>{isDeselect ? "Select All" : "(De)select All"}</Button>
        </Box>
      )}
    </React.Fragment>
  )
}

export default Alignment
