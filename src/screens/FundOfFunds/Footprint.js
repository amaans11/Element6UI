/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress } from '@material-ui/core'
import PieChart from '../../components/ChartsComponents/PieChart'
import StackedBar from '../../components/ChartsComponents/StackedBar'
import StackedColumn from '../../components/ChartsComponents/StackedColumn'
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar'
import { getAlignment, getFootprint, getSummary } from '../../redux/actions/fundOfFundActions'
import { Grid } from '@material-ui/core'
import DataTable from '../../components/Table/DataTable';
import {summaryCells} from '../../util/TableHeadConfig'
import getRequestData from '../../util/RequestData'


const Alignment = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const {allPortfolios,currentPortfolio,loading,filterItem} = auth
  const footprint = useSelector(state=>state.fund.footprint)
  const { inferenceType,emission } = filterItem

  const [pieChartdata,setPieChartData] = useState([])
  const [stackedChartData,setStackedChartData] = useState([])
  const [stackedColChartData,setStackedColChartData] = useState([])
  const [categories,setCategories] = useState([])
  const [yAxisTitle,setYAxisTitle] = useState("")
  const [parentData,setParentData] = useState("")
  const [parentCategories,setParentCategories] = useState("")

  useEffect(() => {
    fetchDetails()
  }, [])
  useEffect(() => {
    getChartData()
  }, [footprint])

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
  const getChartData =()=>{
      if(footprint && Object.keys(footprint).length > 0 ){
        setYAxisTitle(footprint.data.chart_name)
        const footprintData = footprint.data.data
        let pieChartData = [
          {
            name: 'Child Contribution',
            data: [],
          },
        ]   
        let stackedChartData=[]
        let categories = []
        let stackedCol = []
        let parentCategories=[]
        let parentData=[]

  
        if(footprintData && Object.keys(footprintData).length > 0){
          Object.keys(footprintData).map((id,index)=>{
              if(id !== currentPortfolio.value){
              const footprint = inferenceType == 'Avg' ? footprintData[id]['Footprint'][0]['Avg'] : 
              footprintData[id]['Footprint'][1]['Max']
              const weight = footprintData[id]['Weight']
              const intensity = footprint['Sector_Intensity']
              let values=[]
  
              const value = footprint['Child_Contribution'][emission]
              
              pieChartData[0]['data'].push({
                  name:getPortfolioName(id),
                  y:value
              })
              stackedChartData.push({
                  name:getPortfolioName(id),
                  data:[weight]
              })
              Object.keys(intensity).map(el=>{
                  values.push(intensity[el][emission])
                  if(!categories.includes(el)){
                    categories.push(el)
                  }
              })
              stackedCol=[
                  ...stackedCol,
                  {
                      name:getPortfolioName(id),
                      data:values
                  }
              ]
            }
            else{
              const footprint = inferenceType == 'Avg' ? footprintData[id]['Footprint'][0]['Avg'] : 
              footprintData[id]['Footprint'][1]['Max']

              const intensity = footprint['Sector_Intensity']
              let values =[]

              Object.keys(intensity).map(el=>{
                values.push(intensity[el][emission])
                if(!parentCategories.includes(el)){
                  parentCategories.push(el)
                }
            })
            parentData=[
              ...parentData,
              {
                  name:getPortfolioName(id),
                  data:values
              }
          ]
            }
          })
        }

        setPieChartData(pieChartData)
        setStackedChartData(stackedChartData)
        setStackedColChartData(stackedCol)
        setCategories(categories)
        setParentData(parentData)
        setParentCategories(parentCategories)
      }
      
  }

 
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
    const requestData = getRequestData('PORTFOLIO_EMISSION', auth)
    requestData.portfolio_id = data
    delete requestData.benchmark_id
    delete requestData.version_benchmark

    await dispatch(getFootprint(requestData))
  }
  
  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : footprint.error ? (
        <Box
          align="center"
          className="error-msg"
          style={{ marginTop: 20, fontSize: 16 }}
        >
          {footprint.error}
        </Box>
      ) : (
        <Box>
         <Grid container>
             <Grid item xs ={6}>
             <PieChart
                chartKey="FOOTPRINT_PIE"
                data={pieChartdata}
              />
             </Grid>
             <Grid item xs ={6}>
             <StackedColumn
                chartKey="FOOTPRINT_STACK_COL"
                data={stackedColChartData}
                categories={categories}
                yAxisTitle={yAxisTitle}
              />
             </Grid>
         </Grid>
         <div
            style={{
              fontSize: 14,
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              marginTop:10,
              marginBottom:10
            }}
          >
            The pie chart shows the composition of the total fund of funds footprint, by displaying the contribution of the funds to the total fund of funds footprint for the selected scope. Where necessary, the children footprints are weighted by the child weights. The sector intensity of the children and the sector intensity of the parent are calculated as single portfolios.
          </div>
         <Grid container>
             <Grid item xs ={12}>
             <HorizontalBar
                chartKey="PARENT_INTENSITY"
                data={parentData}
                categories={parentCategories}
              />
             </Grid>
         </Grid>
        
        </Box>
      )}
    </React.Fragment>
  )
}

export default Alignment
