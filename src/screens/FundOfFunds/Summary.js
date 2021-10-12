/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress } from '@material-ui/core'
import PieChart from '../../components/ChartsComponents/PieChart'
import { getSummary } from '../../redux/actions/fundOfFundActions'
import { Grid } from '@material-ui/core'
import DataTable from '../../components/Table/DataTable';
import {summaryCells} from '../../util/TableHeadConfig'
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar'

const Summary = () => {
  const dispatch = useDispatch()

  const [tableData,setTableData] = useState([])
  const [chartData,setChartData] = useState([])

  const auth = useSelector((state) => state.auth)
  const {allPortfolios,currentPortfolio,loading} = auth
  const summary = useSelector(state=>state.fund.summary)

  useEffect(() => {
    fetchDetails()
  }, [])
  useEffect(() => {
    getData()
  }, [summary])

 
  const getChildrenIds = ()=>{
    let childrenIds=[]
    let result = []
    if(allPortfolios && allPortfolios.length > 0){
        allPortfolios.map(portfolio=>{
            if(portfolio.portfolio_id === currentPortfolio.value ){
                 childrenIds = portfolio.children_id
            }
        })
    }
    console.log("childrenIds>>",childrenIds)
    if(childrenIds && childrenIds .length > 0){
        childrenIds.map(id=>{
            allPortfolios.map(portfolio=>{
                if(portfolio.id === id ){
                    result.push(portfolio.portfolio_id)
                }
            })
        })
    }
    console.log("result>>",result)

    return result ; 
  }

  const fetchDetails = async () => {
    const data = getChildrenIds()
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
                <HorizontalBar
                chartKey="SUMMARY"
                data={chartData}
                categories={['']}
              />
                </Grid>
                <div
            style={{
              fontSize: 14,
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              marginTop:10
            }}
          >
            This is the fund-level breakdown of the uploaded fund of funds portfolio.
            Some more text about useful information goes here. Maybe about how we handle the file to create the parent portfolio for the analytics?
            About coverage information?
          </div>
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
