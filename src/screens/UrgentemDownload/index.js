/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getRequestData from '../../util/RequestData'
import {
  Typography,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  Button,
} from '@material-ui/core'
import {get} from 'lodash'
import SelectwithSearch from '../../components/Autocomplete'
import {
  getDownloadPortfolios,
  getDownloadDetails,
} from '../../redux/actions/authActions'
import DataTable from '../../components/Table/DataTable'

function UrgentemDownload() {
  const dispatch = useDispatch()
  const [summary, setSummary] = useState(true)
  const [averageIntensity, setAverageIntensity] = useState(false)
  const [reportedIntensity, setReportedIntensity] = useState(false)
  const [reportedEmissions, setReportedEmissions] = useState(false)
  const [absoluteEmission, setAbsoluteEmission] = useState(false)
  const [selectedPortfolio, setPortfolio] = useState({})
  const [columns, setColumns] = useState([])
  const [portfolioList, setPortfolioList] = useState([])
  const [loading, setLoading] = useState(false)

  const isVisible = useSelector((state) => state.auth.isVisible)
  const auth = useSelector((state) => state.auth)

  const { downloadPortfolioList, downloadData, userInfo } = auth

  const trial = get(userInfo,'Trial',false)

  const yearEmissions =
    userInfo.year && userInfo.year.emissions ? userInfo.year.emissions : '2019'

  const onPortfolioChange = async (currentValue) => {
    let portfolio = {}
    if (portfolioList && portfolioList.length > 0) {
      portfolioList.map((port) => {
        if (port.label === currentValue) {
          portfolio = { ...port }
        }
      })
    }
    setPortfolio({ ...portfolio })
    await getDownloadData(portfolio)
  }
  const handleSelectAll = async (e) => {
    const value = e.target.checked
    setAverageIntensity(value)
    setReportedIntensity(value)
    setReportedEmissions(value)
    setAbsoluteEmission(value)
  }
  const handleSubmit = async () => {
    await getDownloadData(selectedPortfolio)
  }

  const fetchDetails = async () => {
    await dispatch(getDownloadPortfolios())
  }
  const getSelectedField = () => {
    let value = ''
    if (summary) {
      value += 'summary;'
    }
    if (averageIntensity) {
      value += 'avg_int_cols;'
    }
    if (reportedIntensity) {
      value += 'rep_int_cols;'
    }
    if (reportedEmissions) {
      value += 'rep_emis_cols;'
    }
    if (absoluteEmission) {
      value += 'absolute_avg;'
    }
    if (
      summary &&
      averageIntensity &&
      reportedIntensity &&
      reportedEmissions &&
      absoluteEmission
    ) {
      value = 'all'
    }
    return value
  }
  const getDownloadData = async () => {
    const data = getRequestData('URGENTEM_DOWNLOAD', auth)
    await dispatch(getDownloadDetails(data))
  }
  const getTableColumns = () => {
    let res = []
    if (downloadData && downloadData.length > 0) {
      let columns = Object.keys(downloadData[0])

      res = columns.map((column, index) => {
        if (index === 0) {
          return {
            name: column,
            selector: column,
            sortable: true,
            right: false,
            wrap: true,
            style: {
              height: 80,
            },
          }
        } else {
          return {
            name: column,
            selector: column,
            sortable: true,
            right: false,
            wrap: true,
            style: {
              height: 80,
            },
            cell: (row) => {
              let res = ''
              if (typeof row[column] === 'number') {
                if (row[column] === '-999999' || row[column] === '999999') {
                  res = 'NA'
                } else {
                  res = row[column]
                }
              } else {
                if (row[column]) {
                  res = row[column]
                } else {
                  res = 'NA'
                }
              }
              return res
            },
          }
        }
      })
    }
    setColumns(res)
  }
  const convertArrayOfObjectsToCSV = (array) => {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(array[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach((item) => {
      let ctr = 0
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }
  const downloadDataHandler = () => {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(downloadData)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  useEffect(() => {
    getTableColumns()
  }, [downloadData])

  useEffect(() => {
    getDownloadData()
  }, [])
  return (
    <React.Fragment>
      <Grid container>
        {isVisible && <Grid item xs={3} />}
        <Grid item xs={isVisible ? 9 : 12}>
          <Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  paddingBottom: 10,
                  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                  paddingLeft: 10,
                }}
              >
                Urgentem Emissions Data Download
              </div>
              {!trial && <Button
                variant="outlined"
                color="primary"
                onClick={downloadDataHandler}
                style={{ marginBottom: 10 }}
                disabled={downloadData && downloadData.length === 0}
              >
                Download Data
              </Button>}
            </Box>

            {downloadData && downloadData.length > 0 ? (
              <DataTable
                data={downloadData}
                columns={columns}
                tableHeading="DOWNLOAD"
                isScroll={true}
                loading={loading}
              />
            ) : (
              <DataTable
                data={downloadData}
                columns={columns}
                tableHeading="DOWNLOAD"
                loading={loading}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default UrgentemDownload
