/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress,Grid,MenuItem,FormControl,InputLabel,Select,Chip} from '@material-ui/core'
import PieChart from '../../components/ChartsComponents/PieChart'
import {  getFundTargetSetting } from '../../redux/actions/fundOfFundActions'
import DataTable from '../../components/Table/DataTable';
import {targetFundCells} from '../../util/TableHeadConfig'
import getRequestData from '../../util/RequestData'
import StackedColumn from '../../components/ChartsComponents/StackedColumn'
import { filter } from 'lodash'
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar'


const Alignment = () => {
  const dispatch = useDispatch()

  const [chartData,setChartData] = useState([])
  const [tableData,setTableData] = useState([])
  const [categories,setCategories] = useState([])
  const [currentSector,setSector] = useState("")
  const [isSelected,setSelected] = useState(true)
  const [barChartData,setBarChartData] = useState([]);
  const [yAxisTitle,setYAxisTitle] = useState("")
  const [companies,setCompanies] = useState([])
  const [metric,setMetric] = useState("Contribution")

  const auth = useSelector((state) => state.auth)
  const {allPortfolios,currentFundsPortfolio,loading,filterItem} = auth
  const {alignmentYear} = filterItem
  const targetSetting = useSelector(state=>state.fund.targetSetting)

  useEffect(() => {
    fetchDetails()
  }, [])
  useEffect(() => {
    getChartData()
  }, [targetSetting])

 
  const handleMetricChange =(e)=>{
    const value = e.target.value

    if(value == 'Contribution'){
      const data = targetSetting.data
      let chartData=[]
      let categories = []
    
      if (data && Object.keys(data).length > 0) {
        Object.keys(data).map((id,index) => {
          let contrib = data[id]['Target_Setting_table']['Portfolio']['intensity']
  
          chartData.push({
              name:getPortfolioName(id),
              data:Object.values(contrib),
          })
  
          if(index == 0){
              categories = [...Object.keys(contrib)]
          }   
        })
      }
  
     setChartData(chartData)
     setCategories(categories)
     setSector(categories[0])
     setMetric(e.target.value)
    }
    else{
      const data = targetSetting.data
      let chartData=[]
      let categories = []
    
      if (data && Object.keys(data).length > 0) {
        Object.keys(data).map((id,index) => {
          let allowance = data[id]['Target_Setting_table']['Allowance'][alignmentYear]
  
          chartData.push({
              name:getPortfolioName(id),
              data:Object.values(allowance),
          })
  
          if(index == 0){
              categories = [...Object.keys(allowance)]
          }     
        })
      }  
     setChartData(chartData)
     setCategories(categories)
     setSector(categories[0])
     setMetric(e.target.value)
    }
  }
  const getChildrenIds = ()=>{
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
    const data = getChildrenIds()
    const requestData = getRequestData('TARGET_SETTING', auth)
    requestData.portfolio_id = data
    delete requestData.benchmark_id
    delete requestData.version_benchmark

    await dispatch(getFundTargetSetting(requestData))
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
  const handleSectorChange = (e) => {
    const sectorName = e.target.value
    const data = targetSetting.data
    let barChartData=[]
    let tableData=[]
    let allowanceValues = []
    let contribValues = []
    if (data && Object.keys(data).length > 0) {
      Object.keys(data).map((id,index) => {
        let contrib = data[id]['Target_Setting_table']['Portfolio']['intensity']
        let allowance = data[id]['Target_Setting_table']['Allowance'][alignmentYear]
        let annualRed = data[id]['Target_Setting_table']['AnnualReduction'][0][alignmentYear] 

        allowanceValues.push(
          allowance[sectorName]
        )
        contribValues.push(
          contrib[sectorName]
        )

        tableData.push({
            name:getPortfolioName(id),
            contribution:contrib[sectorName],
            allowance:allowance[sectorName],
            annualRed:annualRed[sectorName]
        })       
      })
    }
    barChartData =[
      {
        name: 'Allowance',
        data: allowanceValues
      },
      {
        name: 'Contribution',
        data: contribValues
      },
    ]

   setTableData(tableData)
   setSector(sectorName)
   setBarChartData(barChartData)
  }
  const getChartData = () => {
    const data = targetSetting.data
    let chartData=[]
    let categories = []
    let tableData=[]
    let title= ''
    let barChartData=[]
    let allowanceValues = []
    let contribValues = []
    let companies=[]
    let currentSector=''

    if (data && Object.keys(data).length > 0) {
      Object.keys(data).map((id,index) => {
        let contrib = data[id]['Target_Setting_table']['Portfolio']['intensity']
        let allowance = data[id]['Target_Setting_table']['Allowance'][alignmentYear]
        let annualRed = data[id]['Target_Setting_table']['AnnualReduction'][0][alignmentYear] 

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
        title = data[id]['axis_title'];
        console.log("allowance",allowance)
        console.log("allowance",Object.values(allowance))
        console.log("allowance",id)
        let res1=[];
        let res2=[]

        if(allowance && Object.keys(allowance).length > 0 ){
          Object.keys(allowance).map(key=>{
            res1.push(allowance[key])
          })
        }
        if(contrib && Object.keys(contrib).length > 0 ){
          Object.keys(contrib).map(key=>{
            res2.push(contrib[key])
          })
        }
        if(allowance['Consumer Goods'] === 0){
          res1.unshift(0)
          res1.pop()
        }
        if(contrib['Consumer Goods'] === 0){
          res2.unshift(0)
          res2.pop()
        }

        chartData.push({
            name:getPortfolioName(id) + " - Contribution",
            data:res1,
            stack:'Contribution',
            color:colors[index]
        })
        chartData.push({
          name:getPortfolioName(id) + " - Allowance",
          data:res2,
          stack:'Allowance',
          color:colors[index]
        })

        if(index == 0){
            categories = [...Object.keys(contrib)]
            currentSector = Object.keys(contrib)[0]
        }
        tableData.push({
            name:getPortfolioName(id),
            contribution:contrib[categories[0]],
            allowance:allowance[categories[0]],
            annualRed:annualRed[categories[0]]
        }) 
        allowanceValues.push(
          contrib[categories[0]]
        )
        contribValues.push(
         allowance[categories[0]])
        
        companies.push(
          getPortfolioName(id)
        )      
      })
    }
    console.log("chartData",JSON.stringify(chartData))
    barChartData =[
      {
        name: 'Allowance',
        data: allowanceValues
      },
      {
        name: 'Contribution',
        data: contribValues
      },
    ]

    setSector(currentSector)
   setChartData(chartData)
   setCategories(categories)
   setTableData(tableData)
   setYAxisTitle(title)
   setBarChartData(barChartData)
   setCompanies(companies)
  }
  console.log("currentSector",currentSector)
  return (
      <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : targetSetting.error ? (
        <Box
          align="center"
          className="error-msg"
          style={{ marginTop: 20, fontSize: 16 }}
        >
          {targetSetting.error}
        </Box>
      ) : (
        <Box>
          {isSelected ? <StackedColumn
                chartKey="FUND_TARGET_SETTINGS"
                data={chartData}
                categories={categories}
                yAxisTitle={yAxisTitle}
              /> : 
                <HorizontalBar
                categories={companies}
                data={barChartData}
                chartKey="FUND_TARGET_SETTINGS"
                yAxisTitle={yAxisTitle}
              />
              }
              <Grid container>
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
            <Grid item xs ={4}>
              {
                isSelected ? 
                <Chip label="Change to sectoral view"  variant="outlined"
                    onClick={()=>{setSelected(false)}}
                    style={{width:220,height:55}}
                />
                :
                <Chip label="Change to stacked view"
                      onClick={()=>{setSelected(true)}}
                      style={{width:220,height:55}}

                />
              }
            </Grid>
          </Grid>
            <DataTable
              data={tableData}
              columns={targetFundCells}
              tableHeading="PORTFOLIO_INTENSITY"
            />
        </Box>
      )}
    </React.Fragment>
  )
}

export default Alignment
