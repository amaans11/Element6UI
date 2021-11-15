/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress } from '@material-ui/core'
import PieChart from '../../components/ChartsComponents/PieChart'
import {orderBy} from 'lodash'
import StackedBar from '../../components/ChartsComponents/StackedBar'
import StackedColumn from '../../components/ChartsComponents/StackedColumn'
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar'
import { getAlignment, getFootprint, getSummary } from '../../redux/actions/fundOfFundActions'
import { Grid } from '@material-ui/core'
import DataTable from '../../components/Table/DataTable';
import {summaryCells} from '../../util/TableHeadConfig'
import getRequestData from '../../util/RequestData'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { Select } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'


const Alignment = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const {allPortfolios,currentFundsPortfolio,loading,filterItem} = auth
  const footprint = useSelector(state=>state.fund.footprint)
  const { inferenceType,emission } = filterItem

  const [pieChartdata,setPieChartData] = useState([])
  const [stackedChartData,setStackedChartData] = useState([])
  const [stackedColChartData,setStackedColChartData] = useState([])
  const [categories,setCategories] = useState([])
  const [yAxisTitle,setYAxisTitle] = useState("")
  const [parentData,setParentData] = useState("")
  const [parentCategories,setParentCategories] = useState("")
  const [currentSector,setSector] = useState("")

  useEffect(() => {
    fetchDetails()
  }, [])
  useEffect(() => {
    getChartData()
  }, [footprint])

  const handleSectorChange = (e) => {
    const sectorName = e.target.value
    const footprintData = footprint.data.data

    let barChartData=[]
    const colors=[
      '#1E2732',
      '#F7DC81',
      '#7d7551',
      '#31d6c9',
      '#bbbfbf',
      '#a0d911',
      '#36cfc9',
      '#40a9ff',
      '#f759ab',
      '#22075e',
    ]
    
    if(footprintData && Object.keys(footprintData).length > 0){
      Object.keys(footprintData).map((id,index)=>{
          if(id !== currentFundsPortfolio.value){
            const footprint = inferenceType == 'Avg' ? footprintData[id]['Footprint'][0]['Avg'] : 
            footprintData[id]['Footprint'][1]['Max']

          const intensity = footprint['Sector_Intensity']

          if(currentSector && intensity[sectorName]){
            barChartData.push({
              y:intensity[sectorName][emission]? intensity[sectorName][emission] : 0,
              color:colors[index-1]
            })
          }
          
        }
      })
    }

    setParentData({
      name:'',
      data:barChartData
    })

   setSector(sectorName)
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
  const getChartData =()=>{
      if(footprint && Object.keys(footprint).length > 0 ){
        setYAxisTitle(footprint.data.chart_name)
        const footprintData = footprint.data.data
        let pieChartData = [
          {
            name: 'Contribution',
            data: [],
          },
        ]   
        let stackedChartData=[]
        let categories = []
        let stackedCol = []
        let parentCategories=[]
        let parentData=[]
        let barCHartData=[]
        const colors=[
          '#1E2732',
          '#F7DC81',
          '#7d7551',
          '#31d6c9',
          '#bbbfbf',
          '#a0d911',
          '#36cfc9',
          '#40a9ff',
          '#f759ab',
          '#22075e',
        ]
  
        if(footprintData && Object.keys(footprintData).length > 0){
          Object.keys(footprintData).map((id,index)=>{
              if(id !== currentFundsPortfolio.value){
                
              const footprint = inferenceType == 'Avg' ? footprintData[id]['Footprint'][0]['Avg'] : 
              footprintData[id]['Footprint'][1]['Max']
              const weight = footprintData[id]['Weight']
              const intensity = footprint['Sector_Intensity']
              let values=[]
  
              const value = footprint['Child_Contribution'][emission]
              const currentSector = Object.keys(intensity)[0]

              parentCategories.push(getPortfolioName(id))
              if(currentSector){
                barCHartData.push({
                  y:intensity[currentSector][emission]? intensity[currentSector][emission] : 0,
                  color:colors[index-1]
                })
              }
              pieChartData[0]['data'].push({
                  name:getPortfolioName(id),
                  y:value
              })
              stackedChartData.push({
                  name:getPortfolioName(id),
                  data:[weight]
              })
              Object.keys(intensity).map(el=>{
                  values.push(
                    intensity[el][emission]
                  )
                  if(!categories.includes(el)){
                    categories.push(el)
                  }
              })

              console.log("getPortfolioName(id)",getPortfolioName(id))
              stackedCol.push({
                name:getPortfolioName(id),
                data:values
              })
              
              parentData=[
                ...parentData,
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
          
            }
          })
        }

        let sorteddata = orderBy(pieChartData[0]['data'], ['y'],['desc'])
        let name = pieChartData[0]['name']

        let newData  = [];
        newData[0]={
          data:sorteddata,
          name:name
        }
        
        console.log("parentData",parentData)
        console.log("parentCategories",parentCategories)

        setPieChartData(pieChartData)
        setStackedChartData(stackedChartData)
        setStackedColChartData(stackedCol)
        setCategories(categories)
        setParentData({
          name:'',
          data:barCHartData
        })
        setParentCategories(parentCategories)
        setSector(categories[0])
      }
      
  }

 
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

  const fetchDetails = async () => {
    const data = getChildrenIds()
    const requestData = getRequestData('PORTFOLIO_EMISSION', auth)
    requestData.portfolio_id = data
    delete requestData.benchmark_id
    delete requestData.version_benchmark

    await dispatch(getFootprint(requestData))
  }
  console.log("parentData",parentData)
  console.log("stackedColChartData",stackedColChartData)

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
                isFundOfFunds={true}
                tooltipHeading={yAxisTitle}
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
          The pie chart shows the composition of the total fund of funds footprint, by displaying the contribution of the funds for the selected scope. Where necessary, the funds' footprints are weighted by the funds' weights. The sector intensity of the funds are calculated as single portfolios.
          </div>
          <Grid item xs={4}>
              <FormControl variant="outlined" >
                <InputLabel>Select Sector</InputLabel>
                <Select
                  label="Select Sector"
                  value={currentSector}
                  onChange={handleSectorChange}
                  style={{fontSize:14,width:300,marginBottom:20}}
                >
                  {categories.length > 0 &&
                    categories.map((sector) => (
                      <MenuItem value={sector}>{sector}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
         <Grid container>
             <Grid item xs ={12}>
             <HorizontalBar
                chartKey="PARENT_INTENSITY"
                data={parentData}
                categories={parentCategories}
                yAxisTitle={yAxisTitle}
                isEnabled="false"
                isFundOfFunds={true}
              />
             </Grid>
         </Grid>
        
        </Box>
      )}
    </React.Fragment>
  )
}

export default Alignment
