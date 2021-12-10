/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress } from '@material-ui/core'
import PieChart from '../../components/ChartsComponents/PieChart'
import { getSummary } from '../../redux/actions/fundOfFundActions'
import {getFundsPortfolioList} from '../../redux/actions/authActions'
import { Grid } from '@material-ui/core'
import DataTable from '../../components/Table/DataTable';
import {summaryCells} from '../../util/TableHeadConfig'
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar'
import StackedBar from '../../components/ChartsComponents/StackedBar'

const Summary = () => {
  const dispatch = useDispatch()

  const [tableData,setTableData] = useState([])
  const [chartData,setChartData] = useState([])

  const auth = useSelector((state) => state.auth)
  const {loading} = auth
  const summary = useSelector(state=>state.fund.summary)

  useEffect(() => {
    fetchDetails()
  }, [])
  useEffect(() => {
    getData()
  }, [summary])

 
  const getChildrenIds = (allPortfolios,currentFundsPortfolio)=>{
    let childrenIds=[]
    let result = []
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

  const fetchDetails = async () => {
    const {list,fundsData} = await dispatch(getFundsPortfolioList())
    const data = getChildrenIds(list,fundsData)
    await dispatch(getSummary(data.join(',')))
  }
  const getData=()=>{
    const data = summary.data
    let chartData = []
    let tableData=[]

    if(data && data.length > 0)
    data.map(port=>{
        chartData.push({
          name:port.name,
          data:[port.weight]
          })
        tableData.push({
            name:port.name,
            weight:port.weight,
            emission:port.coverage_emissions[0].coverage,
            fundamentals:port.coverage_emissions[0].weight_coverage,
        })
    })
    setChartData(chartData)
    setTableData(tableData)
  }

  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : summary.error ? (
        <Box
          align="center"
          className="error-msg"
          style={{ marginTop: 20, fontSize: 16 }}
        >
          {summary.error}
        </Box>
      ) : (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                <StackedBar
                  chartKey="SUMMARY"
                  data={chartData}
                  categories={['']}
                  maxValue={100}
              />
                </Grid>
                
                <Grid item xs={12} style={{marginTop:10}}>
                    <DataTable data={tableData} columns={summaryCells} tableHeading="COMPANY_ANALYSIS" />
                </Grid>
            </Grid>
        

        </Box>
      )}
    </React.Fragment>
  )
}

export default Summary
