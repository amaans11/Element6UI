/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Card,
  Typography,
  Box,
  Grid,
  Button,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core'
import moment from 'moment'
import {get} from 'lodash'
import { NotificationManager } from 'react-notifications'
import { Link } from 'react-router-dom'
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
import * as actionTypes from '../../redux/actionTypes'
import configs from '../../util/landing-page.config'
import DataTable from '../../components/Table/DataTable'
import {
  getUploadPortfolioList,
  deletePortfolioRequest,
} from '../../redux/actions/authActions'

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

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 15,
    padding: 20,
    width: 300,
  },
  contentView: {
    margin: 12,
  },
  description: {
    paddingTop: 20,
    fontSize: 16,
  },
  uploadBtn: {
    height: 50,
    width: 300,
    marginLeft: theme.spacing(2),
  },
}))

function UrgentemLanding({ history, handleUploadPortfolio }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [selectedPortfolio, setSelectedPortfolio] = useState('')
  const portfolioTableRes = useSelector((state) => state.auth.portfolioTableRes)
  const userInfo = useSelector((state) => state.auth.userInfo)
  const accessToken = useSelector((state) => state.auth.currentUser.access_token)

  console.log("accessToken",accessToken)

  const { year, quarter, version } = userInfo
  const trial = get(userInfo,'Trial',false)

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

  // useEffect(() => {
  // 	fetchDetails();
  // }, []);

  // const fetchDetails = async () => {
  // 	setLoading(true);
  // 	setLoading(false);
  // };

  const deletePortfolioHandler = () => {
    setDialog(true)
  }
  const handleClose = () => {
    setDialog(false)
  }
  const deletePortfolio = async () => {
    if (!selectedPortfolio) {
      NotificationManager.error('Please select portfolio to be deleted')
      return
    }
    try {
      await dispatch(deletePortfolioRequest(selectedPortfolio))
      NotificationManager.success('Portfolio deleted successfully')
      setDialog(false)
      setSelectedPortfolio('')
      window.location.reload()
    } catch (error) {
      NotificationManager.error('Unable to delete the portfolio !')
    }
  }

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
        name: 'Emissions Coverage (%)',
        selector: 'coverageEmissions',
        sortable: true,
        right: true,
        wrap: true,
      },
      {
        name: 'Emissions Weight Coverage (%)',
        selector: 'coverageWeightEmissions',
        sortable: true,
        right: true,
        wrap: true,
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
        selector: 'date_created',
        sortable: true,
        right: true,
        wrap: true,
        cell: (row) => (
          <div style={{ marginLeft: 40 }}>
            {row['date_created'] &&
              moment(row['date_created']).format('DD-MM-YYYY hh:mm:ss')}
          </div>
        ),
      },
      {
        cell: (row) => (
          <Button
            color="primary"
            variant="contained"
            size="small"
            style={{ marginRight: 10, fontSize: 8 }}
            onClick={() => getCoverageDetails(row)}
          >
            MISSING ISINS
          </Button>
        ),
        button: true,
      },
    ]
  }
  const getCoverageDetails = async (data) => {
    const portfolioId = data.portfolio_id
    const url = `${process.env.REACT_APP_API_URL}/portfolio/coverage/${portfolioId}/`

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
        headers: { 'Authorization': `Bearer ${accessToken}`      },
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
        <Grid item xs={9}>
          <div
            style={{
              font: 'bold 22px "Trebuchet MS", Verdana, sans-serif',
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            Welcome to the Urgentem Element 6
            <sup style={{ verticalAlign: 'super', fontSize: 12 }}>TM</sup>{' '}
            Platform.
          </div>
          <div
            style={{
              fontSize: 14,
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              marginTop: 10,
            }}
          >
            Upload and select your portfolio and benchmark. Navigate our climate
            portfolio analytics to: calculate the portfolio carbon footprint,
            backtest low carbon investment strategies and identify securities
            with high exposure to carbon risk.
          </div>
          {/* <Box mt={1}>
            <Typography gutterBottom variant="h5" component="h2">
              Delete portfolios
            </Typography>
            <Typography style={{ color: 'rgb(120,120,120),fontSize:12' }}>
              To delete any of the portfolios uploaded to your account, please
              click on the link below and select a portfolio from the list.
            </Typography>
            <Link to="" onClick={deletePortfolioHandler}>
              Delete portfolio
            </Link>
          </Box> */}
          
        </Grid>
        <Grid item xs={3} style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
            <Box mt={3} >
              {!trial && <Button
                variant="outlined"
                color="primary"
                className={classes.uploadBtn}
                onClick={handleUploadPortfolio}
              >
                Upload Portfolio
              </Button>}
            </Box>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
          <Box mt={2}>
            <DataTable
              data={portfolioTableRes}
              columns={headCells}
              tableHeading="UPLOAD_PORTFOLIO"
            />
          </Box>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={dialog} keepMounted onClose={handleClose} maxWidth="sm">
        <DialogTitle>Delete Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <RadioGroup
              aria-label="portfolio"
              name="portfolio"
              value={selectedPortfolio}
              onChange={(e) => setSelectedPortfolio(e.target.value)}
            >
              {portfolioTableRes.map((portfolio) => (
                <FormControlLabel
                  value={portfolio['portfolio_id']}
                  control={<Radio />}
                  label={portfolio['name']}
                />
              ))}
            </RadioGroup>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={deletePortfolio}>
            Delete
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
export default UrgentemLanding
