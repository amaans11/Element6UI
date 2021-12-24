/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@material-ui/core'
import {get} from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { getScope3Data } from '../../redux/actions/scope3Actions'
import HeatmapChart from '../../components/ChartsComponents/HeatmapChart'
import DataTable from '../../components/Table/DataTable'
import getRequestData from '../../util/RequestData'
import { sectoralScope3Cells } from '../../util/TableHeadConfig'
import categoryContent from './CategoryContent'

const useStyles = makeStyles(() => ({
  formControl: {
    width: 350,
    margin: 15,
  },
}))

const SectoralScope3Heatmap = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [chartData, setChartData] = useState([])
  const [tableData, setTableData] = useState([])
  const [yCategories, setYCategories] = useState([])
  const [xCategories, setXCategories] = useState([])
  const [currentSector, setCurrentSector] = useState('')
  const [dialog, setDialog] = useState(false)

  const auth = useSelector((state) => state.auth)
  const filterItem = useSelector((state) => state.auth.filterItem)
  const heatmapData = useSelector((state) => state.scope3.heatmapData)

  const { materiality } = filterItem
  const { loading,userInfo } = auth
  const trial = get(userInfo,'trial',false)

  const getCategoryKey = (category,emission) => {
		if(emission === 'Sc123'){
			switch (category) {
				case 'Scope_12_Total':
					return 0;
				case 'Category_1':
					return 1;
				case 'Category_2':
					return 2;
				case 'Category_3':
					return 3;
				case 'Category_4':
					return 4;
				case 'Category_5':
					return 5;
				case 'Category_6':
					return 6;
				case 'Category_7':
					return 7;
				case 'Category_8':
					return 8;
				case 'Category_9':
					return 9;
				case 'Category_10':
					return 10;
				case 'Category_11':
					return 11;
				case 'Category_12':
					return 12;
				case 'Category_13':
					return 13;
				case 'Category_14':
					return 14;
				case 'Category_15':
					return 15;
				default:
					return 0;
			}
		}
		else{
			switch (category) {
				case 'Category_1':
					return 0;
				case 'Category_2':
					return 1;
				case 'Category_3':
					return 2;
				case 'Category_4':
					return 3;
				case 'Category_5':
					return 4;
				case 'Category_6':
					return 5;
				case 'Category_7':
					return 6;
				case 'Category_8':
					return 7;
				case 'Category_9':
					return 8;
				case 'Category_10':
					return 9;
				case 'Category_11':
					return 10;
				case 'Category_12':
					return 11;
				case 'Category_13':
					return 12;
				case 'Category_14':
					return 13;
				case 'Category_15':
					return 14;
				default:
					return 0;
			}
		}
		
	};
  const onDialogHandler = () => {
    setDialog(!dialog)
  }

  useEffect(() => {
    const fetchDetails = async () => {
      const data = getRequestData('SECTORAL_SCOPE3_MATERILITY', auth)
      await dispatch(getScope3Data(data))
    }
    fetchDetails()
  }, [])
  useEffect(() => {
    if (
      heatmapData &&
      heatmapData['data'] &&
      Object.keys(heatmapData['data']).length > 0
    ) {
      const sectorName = heatmapData['data']['SectorList'][0]
      getChartData(materiality, sectorName)
    }
  }, [heatmapData, materiality])

  const handleSectorChange = (e) => {
    const sectorName = e.target.value
    let tableData=[]
    const tableResponse = heatmapData['data']['Table']['Sector_Categories']

    getChartData(materiality, sectorName)


    if (tableResponse && tableResponse.length > 0) {
      tableResponse.map((table) => {
        if(table['SASB_SICS_Sector'] === sectorName){
          tableData.push({
            security: table['Security_Name'],
            business: table['Business Travel'],
            capital: table['Capital Goods'],
            downstreamLease: table['Downstream Leased Assets'],
            downstreamTransport: table['Downstream Transport Distribution'],
            employee: table['Employee Commuting'],
            endOfLife: table['End of Life Treatment of Sold Products'],
            franchise: table['Franchises'],
            fuel: table['Fuel and Energy Related Activities'],
            investments: table['Investments'],
            processing: table['Processing of Sold Products'],
            purchased: table['Purchased Goods and Services'],
            upstreamLeased: table['Upstream Leased Assets'],
            upstreamTransport: table['Upstream Transport and Distribution'],
            useSolid: table['Use of Sold Products'],
            waste: table['Waste Generated'],
          })
        }
        
      })
    }
    setTableData(tableData)

  }

  const getChartData = (materialityType, currentSectorName) => {
    const { emission, sector } = filterItem

    let chartData = []
    let xCategories = []
    let tableData = []
    let res = []

    let sectorList = heatmapData['data']['SectorList']
    const key = `${sector}${emission}Port`
    const tableResponse = heatmapData['data']['Table']['Sector_Categories']

    if (materialityType === 'matPort') {
      res = heatmapData['data'][key][0]['PortfolioScaled']
    } else {
      res = heatmapData['data'][key][1]['SectorScaled']
    }
    if (res.length > 0) {
      res.map((data) => {
        const sectorName =
          sector === 'SASB'
            ? data['SASB_SICS_Sector']
            : data['GICS_SECTOR_NAME']

        if (sectorName === currentSectorName) {
          const xValue = getCategoryKey(data.y,emission)
          const yValue = sectorList.indexOf(sectorName)
          chartData.push([xValue, 0, data.z])

          const yLabel = data.y !== 'Scope_12_Total' ? data.y.split('_') : data.y

          const label = data.y !== 'Scope_12_Total' ? 'Cat' + ' ' + yLabel[1] : 'Total 1+2'

          if (!xCategories.includes(label)) {
            xCategories.push(label)
          }
        }
      })
    }
    if (tableResponse && tableResponse.length > 0) {
      tableResponse.map((table) => {
        if(table['SASB_SICS_Sector'] === currentSector){
          tableData.push({
            security: table['Security_Name'],
            business: table['Business Travel'],
            capital: table['Capital Goods'],
            downstreamLease: table['Downstream Leased Assets'],
            downstreamTransport: table['Downstream Transport Distribution'],
            employee: table['Employee Commuting'],
            endOfLife: table['End of Life Treatment of Sold Products'],
            franchise: table['Franchises'],
            fuel: table['Fuel and Energy Related Activities'],
            investments: table['Investments'],
            processing: table['Processing of Sold Products'],
            purchased: table['Purchased Goods and Services'],
            upstreamLeased: table['Upstream Leased Assets'],
            upstreamTransport: table['Upstream Transport and Distribution'],
            useSolid: table['Use of Sold Products'],
            waste: table['Waste Generated'],
          })
        }
        
      })
    }

    setChartData(chartData)
    setYCategories(sectorList)
    setXCategories(xCategories)
    setTableData(tableData)
    setCurrentSector(currentSectorName)
  }
  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : heatmapData.error ? (
        <Box
          align="center"
          className="error-msg"
          style={{ marginTop: 20, fontSize: 16 }}
        >
          {heatmapData.error}
        </Box>
      ) : (
        <React.Fragment>
          <Grid container>
            <Grid item xs={4}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Select Sector</InputLabel>
                <Select
                  label="Select Sector"
                  value={currentSector}
                  onChange={handleSectorChange}
                  style={{fontSize:14}}
                >
                  {yCategories.length > 0 &&
                    yCategories.map((sector) => (
                      <MenuItem value={sector}>{sector}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <HeatmapChart
            chartKey="SECTORAL_SCOPE3_HEATMAP"
            yAxisCategories={['']}
            data={chartData}
            xAxisCategories={xCategories}
            isSectoral={true}
            isExportEnabled={!trial}
          />
          <DataTable
            data={tableData}
            columns={sectoralScope3Cells}
            tableHeading="SECTORAL_SCOPE3_HEATMAP"
            isScroll={true}
          />
          <Link onClick={onDialogHandler} style={{ marginTop: 20 }}>
            Explore the scope 3 categories classification
          </Link>
          <Typography >
            This module provides a granular breakdown of carbon risk exposure
            within sectoral supply and value chains. This can be reviewed from
            the sectoral and portfolio perspectives Sector Analysis: Each Sector
            is scaled by the maximum Scope 3 or Scope 1+2 category by carbon
            intensity. Portfolio Analysis: All Scope 3 and Scope 1+2 carbon
            intensity figures are scaled by the maximum category for the
            portfolio as a whole.
          </Typography>
          <Dialog open={dialog} keepMounted fullWidth={true}>
            <DialogTitle>Category Classification</DialogTitle>
            <DialogContent>{categoryContent}</DialogContent>
            <DialogActions>
              <Button onClick onClick={onDialogHandler}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default SectoralScope3Heatmap
