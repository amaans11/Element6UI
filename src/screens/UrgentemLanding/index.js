/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Typography, Box, Grid, Button, Tooltip } from '@material-ui/core'
import moment from 'moment'
import { NotificationManager } from 'react-notifications'
import * as actionTypes from '../../redux/actionTypes'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import GraphicEqIcon from '@material-ui/icons/GraphicEq'
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit'
import TimelineIcon from '@material-ui/icons/Timeline'
import InsertChartIcon from '@material-ui/icons/InsertChart'
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import GetAppIcon from '@material-ui/icons/GetApp'
import ViewWeekIcon from '@material-ui/icons/ViewWeek'
import BarChartIcon from '@material-ui/icons/BarChart'
import CodeIcon from '@material-ui/icons/Code'
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned'
import configs from '../../util/landing-page.config'
import DataTable from '../../components/Table/DataTable'
import { getUploadPortfolioList } from '../../redux/actions/authActions'

function ListItemLink({ icon }) {
  switch (icon) {
    case 'GraphicEqIcon':
      return <GraphicEqIcon className="icon" />
    case 'VerticalSplitIcon':
      return <VerticalSplitIcon className="icon" />
    case 'InsertChartIcon':
      return <InsertChartIcon className="icon" />
    case 'TimelineIcon':
      return <TimelineIcon className="icon" />
    case 'BubbleChartIcon':
      return <BubbleChartIcon className="icon" />
    case 'ViewWeekIcon':
      return <ViewWeekIcon className="icon" />
    case 'BarChartIcon':
      return <BarChartIcon className="icon" />
    case 'GetAppIcon':
      return <GetAppIcon className="icon" />
    case 'CodeIcon':
      return <CodeIcon className="icon" />
    case 'AssignmentReturnedIcon':
      return <AssignmentReturnedIcon className="icon" />
    default:
      return <AssignmentReturnedIcon className="icon" />
  }
}

const useStyles = makeStyles(() => ({
  card: {
    margin: 20,
    padding: 20,
  },
  contentView: {
    margin: 20,
  },
  description: {
    paddingTop: 20,
    color: 'rgb(120,120,120)',
    fontSize: 16,
  },
}))

function UrgentemLanding({ history }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const portfolioTableRes = useSelector((state) => state.auth.portfolioTableRes)
  const userInfo = useSelector((state) => state.auth.userInfo)

  const { year, quarter, version } = userInfo

  const yearFundamentals =
    year && year.fundamentals ? year.fundamentals : '2019'
  const yearEmissions = year && year.emissions ? year.emissions : '2019'
  const quarterFundamentals =
    quarter && quarter.fundamentals ? quarter.fundamentals : 'Q1'
  const quarterEmissions =
    quarter && quarter.emissions ? quarter.emissions : 'Q1'
  const versionFundamentals =
    version && version.fundamentals ? version.fundamentals : ''
  const versionEmissions = version && version.emissions ? version.emissions : ''

  const fetchDetails = async () => {
    setLoading(true)
    await dispatch(getUploadPortfolioList())
    setLoading(false)
  }
  useEffect(() => {
    fetchDetails()
  }, [])

  const getHeadCells = () => {
    return [
      {
        name: 'Portfolio Name',
        selector: 'name',
        sortable: true,
        right: false,
        wrap: true,
        cell: (row) => (
          <Tooltip title={`Portfolio Id : ${row.portfolio_id}`}>
            <div>{row.name}</div>
          </Tooltip>
        ),
      },
      {
        name: 'Fundamentals Data Coverage (%)',
        selector: 'versionFundamental',
        sortable: true,
        right: true,
        wrap: true,
        cell: (row) => (
          <div>
            {row['coverage_fundamentals'].length > 0 &&
              row['coverage_fundamentals'][0]['coverage']}
          </div>
        ),
      },
      {
        name: 'Emissions Data Coverage (%)',
        selector: 'emissionFundamental',
        sortable: true,
        right: true,
        wrap: true,
        cell: (row) => (
          <div>
            {row['coverage_emissions'].length > 0 &&
              row['coverage_emissions'][0]['coverage']}
          </div>
        ),
      },
      {
        name: 'Version',
        selector: 'version',
        sortable: true,
        right: true,
        wrap: true,
      },
      {
        name: 'Processing Date',
        selector: 'portfolioDate',
        sortable: true,
        right: true,
        wrap: true,
        cell: (row) => (
          <div style={{ marginLeft: 40 }}>
            {row['date_created'] &&
              moment(row['date_created']).format('DD-MM-YYYY hh:mm:ss A')}
          </div>
        ),
      },
      {
        cell: (row) => (
          <Button
            color="primary"
            variant="contained"
            size="small"
            style={{ marginRight: 10 }}
            onClick={() => getCoverageDetails(row)}
          >
            Coverage Details
          </Button>
        ),
        button: true,
      },
    ]
  }
  const getCoverageDetails = async (data) => {
    const portfolioId = data.portfolio_id
    const url = `${actionTypes.API_URL}/portfolio/coverage/${portfolioId}/`

    const requestData = {
      version_portfolio: '0',
      year_fundamentals: yearFundamentals,
      quarter_fundamentals: quarterFundamentals,
      version_fundamentals: versionFundamentals,
      year_emissions: yearEmissions,
      quarter_emissions: quarterEmissions,
      version_emissions: versionEmissions,
    }
    axios
      .post(url, requestData, {
        headers: { 'client-key': userInfo.client_key },
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/csv',
        })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `${data.name}.csv`
        link.click()
      })
      .catch((error) => {
        NotificationManager.error(error.response.data.message)
      })
  }

  const handleClick = (config) => {
    switch (config.name) {
      case 'Portfiolio Fooprint':
        history.push('/portfolio-footprint')
        break
      case 'Scope 3 Materiality':
        history.push('/scope3-materiality')
        break
      case 'Portfiolio Optimization':
        history.push('/portfolio-optimization')
        break
      case 'Portfiolio Carbon Risk':
        history.push('/portfolio-carbon-risk')
        break
      case 'Temperature Metric':
        history.push('/temperature-metric')
        break
      case 'Forward Looking Analysis':
        history.push('/forward-looking-analysis')
        break
      case 'Stranded Asset Analysis':
        history.push('/stranded-assets-analysis')
        break
      default:
        history.push('/portfolio-footprint')
        break
    }
  }
  const headCells = getHeadCells()

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={3}>
          {configs.map((config) => (
            <span onClick={() => handleClick(config)}>
              <Card className={classes.card}>
                <Box display="flex" flexDirection="row">
                  <Typography variant="h6" style={{ paddingBottom: 10 }}>
                    {config.name}
                  </Typography>
                  <ListItemLink icon={config.icon} />
                </Box>
                <Typography variant="p">{config.content}</Typography>
              </Card>
            </span>
          ))}
        </Grid>
        <Grid item xs={8} className={classes.contentView}>
          <Typography align="center" variant="h4">
            Welcome to the Urgentem Element 6TM Platform.
          </Typography>
          <Typography variant="h6" className={classes.description}>
            Upload and select your portfolio and benchmark. Navigate our climate
            portfolio analytics to: calculate the portfolio carbon footprint,
            backtest low carbon investment strategies and identify securities
            with high exposure to carbon risk.
          </Typography>
          <Box mt={2}>
            <DataTable
              data={portfolioTableRes}
              columns={headCells}
              tableHeading="UPLOAD_PORTFOLIO"
              loading={loading}
            />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default UrgentemLanding
