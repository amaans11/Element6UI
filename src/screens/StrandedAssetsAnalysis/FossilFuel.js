/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, CircularProgress } from '@material-ui/core'
import {get} from 'lodash'
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar'
import DataTable from '../../components/Table/DataTable'
import getRequestData from '../../util/RequestData'
import { fossilFuelCells, countryFossilCells } from '../../util/TableHeadConfig'
import { getFossilFuelData } from '../../redux/actions/strandedAssetActions'

const categories = ['Gas', 'Oil', 'Coal']

const FossilFuel = () => {
  const dispatch = useDispatch()

  const [chartData, setChartData] = useState([])
  const [tableData, setTableData] = useState([])
  const [countryTableData, setCountryTableData] = useState([])
  const [yAxisTitle, setYAxisTitle] = useState('')

  const fossilFuel = useSelector((state) => state.stranded.fossilFuel)
  const auth = useSelector((state) => state.auth)
  const { loading,userInfo } = auth
  const trial = get(userInfo,'Trial',false)

  const fetchDetails = async () => {
    const data = getRequestData('FOSSIL_FUEL', auth)
    await dispatch(getFossilFuelData(data))
  }
  useEffect(() => {
    fetchDetails()
  }, [])
  useEffect(() => {
    getData()
  }, [fossilFuel])

  const getData = () => {
    let chartData = []
    let tableData = []
    let countryTableData = []
    let yAxisTitle = ''

    if (fossilFuel['data'] && Object.keys(fossilFuel['data']).length > 0) {
      yAxisTitle = fossilFuel['data']['chart_name']

      const portGas = fossilFuel['data']['Object_1']['Portfolio']['Gas_Gt_CO2']
      const portOil = fossilFuel['data']['Object_1']['Portfolio']['Oil_Gt_CO2']
      const portCoal =
        fossilFuel['data']['Object_1']['Portfolio']['Coal_Gt_CO2']

      const benchGas = fossilFuel['data']['Object_1']['Benchmark']['Gas_Gt_CO2']
      const benchOil = fossilFuel['data']['Object_1']['Benchmark']['Oil_Gt_CO2']
      const benchCoal =
        fossilFuel['data']['Object_1']['Benchmark']['Coal_Gt_CO2']

      chartData = [
        {
          name: 'portfolio',
          data: [portGas, portOil, portCoal],
        },
        {
          name: 'benchmark',
          data: [benchGas, benchOil, benchCoal],
        },
      ]

      tableData = [
        {
          type: 'Gas',
          portfolio: portGas,
          benchmark: benchGas,
        },
        {
          type: 'Oil',
          portfolio: portOil,
          benchmark: benchOil,
        },
        {
          type: 'Coal',
          portfolio: portCoal,
          benchmark: benchCoal,
        },
      ]
      const tableRes = fossilFuel['data']['Object_2']['Table']['Percentage']

      if (tableRes && Object.keys(tableRes).length > 0) {
        Object.keys(tableRes).map((key) => {
          countryTableData.push({
            country: key,
            contribution: tableRes[key],
          })
        })
      }
    }
    setChartData(chartData)
    setTableData(tableData)
    setCountryTableData(countryTableData)
    setYAxisTitle(yAxisTitle)
  }
  console.log("chartData>>",chartData)
  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : fossilFuel.error ? (
        <Box
          align="center"
          className="error-msg"
          style={{ marginTop: 20, fontSize: 16 }}
        >
          {fossilFuel.error}
        </Box>
      ) : (
        <React.Fragment>
          <Grid container>
            <Grid item xs={12}>
              <HorizontalBar
                categories={categories}
                data={chartData}
                chartKey="FOSSIL_FUEL"
                yAxisTitle={yAxisTitle}
                isExportEnabled={!trial}
              />
            </Grid>
            <Grid item xs={6}>
              <Box style={{ marginRight: 10 }}>
                <DataTable
                  data={tableData}
                  columns={fossilFuelCells}
                  tableHeading="FOSSIL_FUEL"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <DataTable
                data={countryTableData}
                columns={countryFossilCells}
                tableHeading="FOSSIL_FUEL_COUNTRY"
              />
              <div style={{ fontSize: 11 }}>
                * Where applicable only top 10 countries shown.
              </div>
            </Grid>
            <div
              style={{
                fontSize: 14,
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
				marginTop:10
              }}
            >
              The fossil fuel footprint measures the portfolio's exposure to
              Coal, Oil and Gas reserves. The Coal, Oil and Gas emissions
              underlying the footprint calculation are based on a list of 100
              companies with the largest reserves. The breakdown of the
              footprint by country shows the contribution of the country (based
              on the country of domicile) to the total footprint.
            </div>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default FossilFuel
