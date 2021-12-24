/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress,Grid } from '@material-ui/core'
import {get} from 'lodash'
import { getPortfolioAlignment, getPortfolioAlignmentV2 } from '../../redux/actions/flmActions'
import getRequestData from '../../util/RequestData'
import LineChart from '../../components/ChartsComponents/Line'
import { setFilterItem } from '../../redux/actions/authActions'

const PortAlignmentV2 = () => {
  const dispatch = useDispatch()

  const portAlignment = useSelector((state) => state.flm.portAlignmentv2)
  const auth = useSelector((state) => state.auth)
  const { loading, filterItem,userInfo } = auth
  const { portScenario,emission } = filterItem
  const trial = get(userInfo,'trial',false)

  const [cumulativeData, setCumulativeData] = useState([])
  const [techData, setTechData] = useState([])
  const [alignmentData, setAlignmentData] = useState([])
  const [techMeta, setTechMetaData] = useState('')
  const [alignmentMeta, setAlignmentMetaData] = useState('')
  const [cumulativeMeta, setCumulativeMetaData] = useState('')
  const [tempScore,setTempScore] = useState("")


  useEffect(() => {
    fetchDetails()
    setScenarioFilter()
  }, [])
  useEffect(() => {  
    // returned function will be called on component unmount 
    return () => {
      setDefaultEmission()
    }
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

  const setScenarioFilter = async()=>{
    await dispatch(setFilterItem({
      key:'flm2Scenario',
      value:'Below 2C'
    }))
  }

  const setDefaultEmission  = async()=>{
    if(emission === 'Sc3'){
      await dispatch(setFilterItem({
        key:'emission',
        value:'Sc12'
      }))
    }
  }
  const fetchDetails = async () => {
    const data = getRequestData('PORTFOLIO_ALIGNMENT_V2', auth)
    await dispatch(getPortfolioAlignmentV2(data))
  }

  const getChartData = () => {
    let alignmentData = portAlignment['data']['alignment']
    let cumulativeData = portAlignment['data']['cumulative_emissions']
    let technologyData = portAlignment['data']['technology_risk']

    let alignmentChartData = [
      {
        name: 'Global Benchmark',
        data: [],
      },
      {
        name: 'Portfolio Pathway',
        data: [],
      },
      {
        name: 'Portfolio Trajectory',
        data: [],
      }
    ]
      
      let cumulativeChartData = [
        {
          name: 'Portfolio Pathway',
          data: [],
        },
        {
          name: 'Portfolio Trajectory',
          data: [],
        }  
    ]
    let techChartData = [
      {
        name: 'CCS',
        data: [],
      },
      {
        name: 'Scenario Gross Emissions',
        data: [],
      }  
  ]

    if (alignmentData['data'] && Object.keys(alignmentData['data']).length > 0) {
      const globalPathway = alignmentData['data']['global_pathway']
      const portfolioPathway = alignmentData['data']['portfolio_pathway']
      const portfolioTrajectory = alignmentData['data']['portfolio_trajectory']

      
      Object.keys(globalPathway).map((year) => {
        alignmentChartData[0]['data'].push([
          Date.UTC(year, '01', '01'),
          globalPathway[year],
        ])
      })
      Object.keys(portfolioPathway).map((year) => {
        alignmentChartData[1]['data'].push([
          Date.UTC(year, '01', '01'),
          portfolioPathway[year],
        ])
      })
      Object.keys(portfolioTrajectory).map((year) => {
        alignmentChartData[2]['data'].push([
          Date.UTC(year, '01', '01'),
          portfolioTrajectory[year],
        ])
      })
      console.log("portfolioPathway",JSON.stringify(portfolioPathway))
    }
    if (cumulativeData['data'] && Object.keys(cumulativeData['data']).length > 0) {
      const portfolioPathway = cumulativeData['data']['portfolio_pathway_cumsum']
      const portfolioTrajectory = cumulativeData['data']['portfolio_trajectory_cumsum']

      Object.keys(portfolioPathway).map((year) => {
        cumulativeChartData[0]['data'].push([
          Date.UTC(year, '01', '01'),
          portfolioPathway[year],
        ])
      })
      Object.keys(portfolioTrajectory).map((year) => {
        cumulativeChartData[1]['data'].push([
          Date.UTC(year, '01', '01'),
          portfolioTrajectory[year],
        ])
      })
    }
    if (technologyData['data'] && Object.keys(technologyData['data']).length > 0) {
      const ccs = technologyData['data']['ccs']
      const scenario = technologyData['data']['scenario_emissions_gross']

      Object.keys(ccs).map((year) => {
        techChartData[0]['data'].push([
          Date.UTC(year, '01', '01'),
          ccs[year],
        ])
      })
      Object.keys(scenario).map((year) => {
        techChartData[1]['data'].push([
          Date.UTC(year, '01', '01'),
          scenario[year],
        ])
      })
    }

    setTechData(techChartData)
    setAlignmentData(alignmentChartData)
    setCumulativeData(cumulativeChartData)
    setTechMetaData(technologyData['metadata'])
    setAlignmentMetaData(alignmentData['metadata'])
    setCumulativeMetaData(cumulativeData['metadata'])
    setTempScore(portAlignment['data']['implied_temp'])
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
          <div style={{marginTop:10}}>Temperature Score:  {tempScore} °C</div>
          <Grid container>
            <Grid item xs={6}>
            <LineChart
            data={alignmentData}
            chartKey="PORT_ALIGNMENT_V2"
            isExportEnabled={!trial}
            chartTitle={alignmentMeta.title}
            yAxisTitle={alignmentMeta.units}
          />
            </Grid>
            <Grid item xs={6}>
            <LineChart
            data={cumulativeData}
            chartKey="PORT_ALIGNMENT_V2"
            isExportEnabled={!trial}
            chartTitle={cumulativeMeta.title}
            yAxisTitle={cumulativeMeta.units}
          />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
            <LineChart
            data={techData}
            chartKey="PORT_ALIGNMENT_V2"
            isExportEnabled={!trial}
            chartTitle={techMeta.title}
            yAxisTitle={techMeta.units}
          />
            </Grid>
            <Grid item xs={6}>
              
            </Grid>
          </Grid>
          
          
        </Box>
      )}
    </React.Fragment>
  )
}

export default PortAlignmentV2
