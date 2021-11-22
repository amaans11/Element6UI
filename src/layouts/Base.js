/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  Drawer,
  CssBaseline,
  List,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  OutlinedInput,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  RadioGroup,
  Radio,
  FormControlLabel,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import FilterTags from '../components/FilterSection/tags'
import CustomSwitch from '@material-ui/core/Switch'
import CloseIcon from '@material-ui/icons/Close'
import { NotificationManager } from 'react-notifications'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { Route, Switch } from 'react-router-dom'
import { slideInRight } from 'react-animations'
import Radium, { StyleRoot } from 'radium'
import ListItemLink from '../components/ListItemLink'
import { RouteData } from './Route'
import Header from '../components/Header'
import SelectwithSearch from '../components/Autocomplete'
import FilterGroup from '../components/FilterSection'
import PortfolioFootprint from '../screens/PortfolioFootprint'
import Scope3Materiality from '../screens/Scope3Materiality'
import TemperatureMetric from '../screens/TemperatureMetric'
import PortfolioOptimization from '../screens/PortfolioOptimization'
import PortfolioCarbonRisk from '../screens/PortfolioCarbonRisk'
import ForwardLookingAnalysis from '../screens/ForwardLookingAnalysis'
import StrandedAssetsAnalysis from '../screens/StrandedAssetsAnalysis'
import UrgentemDownload from '../screens/UrgentemDownload'
import GenerateReport from '../screens/GenerateReport'
import UrgentemApi from '../screens/UrgentemApi'
import NLP from '../screens/NLP'
import FundOfFunds from '../screens/FundOfFunds'
import UrgentemLanding from '../screens/UrgentemLanding'
import { missingCoverageCells } from '../util/TableHeadConfig'
import DataTable from '../components/Table/DataTable'
import getRequestData from '../util/RequestData'
import {
  getPortfolioList,
  getUserInfo,
  setPortfolio,
  setBenchmark,
  setTabValue,
  setModule,
  setFilterVisibility,
  uploadPortfolioRequest,
  getUploadPortfolioList,
  getDownloadPortfolios,
  setDownloadPortfolio,
  setDownloadTags,  setEmissions,
  setFundsPortfolio
} from '../redux/actions/authActions'
import {  getDownloadDetails} from '../redux/actions/footprintActions'
import csvFile from '../assets/Dummy-file.xlsx'
import fundscsvFile from '../assets/Fund_of_Funds_Template.xlsx'
import { ContactSupportOutlined } from '@material-ui/icons'

const drawerWidth = 295

const options = [
  { label: 'Summary Data', value: 'summary' },
  { label: 'Average Intensity', value: 'avg_int_cols' },
  { label: 'Reported Intensity', value: 'rep_int_cols' },
  { label: 'Reported Emissions', value: 'rep_emis_cols' },
  { label: 'Absolute Emissions Average', value: 'absolute_avg' },
]
const menus = {
  summary: 'Summary Data',
  avg_int_cols: 'Average Intensity',
  rep_int_cols: 'Reported Intensity',
  rep_emis_cols: 'Reported Emissions',
  absolute_avg: 'Absolute Emissions Average',
}

const styles = (theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 11,
    marginRight: 36,
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: 'rotate(0deg)',
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: 'rotate(180deg)',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing.unit,
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    
  },
  grow: {
    flexGrow: 1,
  },
  icon: {
    marginRight: 10,
  },
  uploadDiv: {
    position: 'absolute',
    top: 90,
  },
  uploadBtn: {
    height: 50,
    width: 300,
    marginLeft: theme.spacing(2),
  },
  samplePortfolio: {
    color: '#1890ff',
  },
  labelText: {
    padding: theme.spacing(1),
  },
  textInput: {
    width: 200,
    height: 40,
  },
  slideInRight: {
    animation: 'x 5s',
    animationName: Radium.keyframes(slideInRight, 'slideInRight'),
  },
  select: {
    width: 200,
    height: 40,
  },
})

const MiniDrawer = ({ classes, history }) => {
  const [open, setOpen] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [portfolioValue, setPortfolioValue] = useState(1000000000)
  const [portfolioName, setPortfolioName] = useState('')
  const [missingCoverageDialog, setMissingCoverageDialog] = useState(false)
  const [missingCoverage, setMissingCoverage] = useState({})
  const [description, setDescription] = useState('')
  const [isBenchmark, setBenchmarkValue] = useState(false)
  const [fundOfFunds,setFundOfFunds] = useState(false)
  const [rebalance,setRebalance] = useState(false)


  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const currentTheme = localStorage.getItem('appTheme');

  const auth = useSelector((state) => state.auth)
  const portfolios = useSelector((state) => state.auth.portfolioList)
  const currentPortfolio = useSelector((state) => state.auth.currentPortfolio)
  const currentBenchmark = useSelector((state) => state.auth.currentBenchmark)
  const fundsPortList = useSelector((state) => state.auth.fundsPortList)
  const currentFundsPortfolio = useSelector((state) => state.auth.currentFundsPortfolio)

  const isVisible = useSelector((state) => state.auth.isVisible)
  const isAdmin = useSelector(
    (state) => state.auth.userInfo && state.auth.userInfo.is_admin,
  )

  const {
    downloadPortfolioList,
    selectedDownloadMenu,
    selectedDownloadPort,
  } = auth

  let currentUser = auth && auth.currentUser ? auth.currentUser : {}
  let userInfo = auth && auth.userInfo ? auth.userInfo : {}

  const getUserDetails = async () => {
    const data = {
      userName: currentUser.userName,
    }
    await dispatch(getUserInfo(data))
  }

  const getPortfolio = async () => {
    await dispatch(getPortfolioList(currentUser.client))
  }

  const fetchDetails = async () => {
    if(currentUser.warning){
      console.log("test")
    }
    await getUserDetails()
    await getPortfolio()
    await dispatch(getUploadPortfolioList())
    await dispatch(getDownloadPortfolios())
  }
  const onFundsPortfolioChange = async (currentValue) =>{
    let portfolio = {}
    if (portfolios && portfolios.length > 0) {
      portfolios.map((port) => {
        if (port.label === currentValue) {
          portfolio = { ...port }
        }
      })
    }
    await dispatch(setFundsPortfolio(portfolio))
  }
  const onPortfolioChange = async (currentValue) => {
    let portfolio = {}
    if (portfolios && portfolios.length > 0) {
      portfolios.map((port) => {
        if (port.label === currentValue) {
          portfolio = { ...port }
        }
      })
    }
    await dispatch(setPortfolio(portfolio))
  }
  const updateTag = async (value) => {
    const tags = [...selectedDownloadMenu]
    if (tags.includes(value)) {
      const index = tags.indexOf(value)
      tags.splice(index, 1)
    } else {
      tags.push(value)
    }
    await dispatch(setDownloadTags(tags))
  }
  const ondownloadPortfolioChange = async (currentValue) => {
    let portfolio = {}
    if (downloadPortfolioList && downloadPortfolioList.length > 0) {
      downloadPortfolioList.map((port) => {
        if (port.label === currentValue) {
          portfolio = { ...port }
        }
      })
    }
    const yearEmissions = userInfo.year.emissions

    const data = {
      year: yearEmissions,
      field: selectedDownloadMenu.join(';'),
      portfolio_id: portfolio.value,
      version_portfolio: portfolio.version,
    }
    await dispatch(setDownloadPortfolio(portfolio))
    await dispatch(getDownloadDetails(data))
  }
  const onBenchmarkChange = async (currentValue) => {
    let benchmark = {}
    if (portfolios && portfolios.length > 0) {
      portfolios.map((port) => {
        if (port.label === currentValue) {
          benchmark = { ...port }
        }
      })
    }
    await dispatch(setBenchmark(benchmark))
  }
  const setDefaultTab = async (e) => {
    if (e.name === 'Scope3') {
      await dispatch(setEmissions())
    }
    await dispatch(setTabValue(0))
    await dispatch(setModule(e.name))
  }
  const handleUploadPortfolio = () => {
    setDialog(true)
  }
  const handleCloseDialog = () => {
    setDialog(false)
  }
  const uploadPortfolio = () => {
    if (!portfolioValue) {
      NotificationManager.error('Portfolio value cannot be empty!')
      return
    }
    if (!portfolioName) {
      NotificationManager.error('Portfolio Name cannot be empty!')
      return
    }
    inputRef.current.click()
  }
  const hideFilterSection = async () => {
    await dispatch(setFilterVisibility(true))
  }
  const handleFileSubmit = async (event) => {
    const file = event.target.files[0]

    const data = new FormData()
    data.append('compositions', file)
    data.append('value', portfolioValue)
    data.append('name', portfolioName)
    data.append('currency', 'USD')
    data.append('description', description)
    data.append('is_benchmark', isBenchmark)
    data.append('auto_rebalance', rebalance)

    try {
      await dispatch(uploadPortfolioRequest(data,fundOfFunds))
      NotificationManager.success(
        'Your portfolio has been uploaded and is being processed. You will see your uploaded portfolio table updated once the processing has been completed.',
      )
      setDialog(false)
    } catch (error) {
      NotificationManager.error(error.message)
    }
  }
  useEffect(() => {
    fetchDetails()

  }, [])
  let contentClass = classNames({
    'content-part-visible': isVisible,
    'content-part-not-visible': !isVisible,
  })

  let result = ''

  if (selectedDownloadMenu && selectedDownloadMenu.length > 0) {
    selectedDownloadMenu.map((menu, index) => {
      if (index !== 0) {
        result = `${result},${menus[menu]}`
      } else {
        result = menus[menu]
      }
    })
  }
  console.log("userInfo",userInfo)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header history={history} />
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}  />
        <List>
          {RouteData.map((e, index) => (
            Object.keys(userInfo).length !== 0 && !userInfo.extra_modules.includes('fund_of_funds') && e.name === 'Fund Of Funds'  ?
            <ListItemLink
              primary={e.name}
              icon={e.icon}
              to={e.url}
              handleClick={() => setDefaultTab(e)}
              disabled={true}
            />
            :<ListItemLink
              primary={e.name}
              icon={e.icon}
              to={e.url}
              handleClick={() => setDefaultTab(e)}
            />
          ))}
        </List>
      </Drawer>
    
        <main className={classes.content}>
          {window.location.pathname !== '/' ? (
            window.location.pathname !== '/urgentem-download' ? (
              <div className="filter-main">
                <Box>
                {window.location.pathname !== '/fund-of-funds' ? 

                <React.Fragment>
                   <Box>
                  <SelectwithSearch
                    heading={'Select Portfolio'}
                    data={
                      portfolios && portfolios.length > 0 ? portfolios : []
                    }
                    // defaultValue={currentPortfolio}
                    handleChange={onPortfolioChange}
                    type="portfolio"
                    currentValue={currentPortfolio}
                  />
                  </Box>
                  <Box mt={2}>
                    <SelectwithSearch
                      heading={'Select Benchmark'}
                      data={
                        portfolios && portfolios.length > 0 ? portfolios : []
                      }
                      // defaultValue={currentBenchmark}
                      handleChange={onBenchmarkChange}
                      type="benchmark"
                      currentValue={currentBenchmark}
                    />
                  </Box>
                </React.Fragment>:
                <Box>
                <SelectwithSearch
                  heading={'Select Funds Portfolio'}
                  data={
                    fundsPortList && fundsPortList.length > 0 ? fundsPortList : []
                  }
                  // defaultValue={currentPortfolio}
                  handleChange={onFundsPortfolioChange}
                  type="portfolio"
                  currentValue={currentFundsPortfolio}
                />
                </Box>
                 }
                </Box>
                <div className="filter-part">
                  <FilterGroup />
                </div>
              </div>
            ) : (
              <div className="filter-main">
                <Box>
                  <SelectwithSearch
                    heading={'Select Portfolio'}
                    data={
                      downloadPortfolioList && downloadPortfolioList.length > 0
                        ? downloadPortfolioList
                        : []
                    }
                    handleChange={ondownloadPortfolioChange}
                    type="portfolio"
                    currentValue={selectedDownloadPort}
                  />
                </Box>
                <Box>
                  <Accordion
                    style={{
                      position: 'relative',
                      background: 'none',
                      width: 250,
                    }}
                    //   expanded={isExpand[e.grpKey]}
                  >
                    <AccordionSummary
                      aria-label="Expand"
                      aria-controls="additional-actions1-content"
                      id="additional-actions1-header"
                      expandIcon={<ArrowDropDownIcon />}
                      // onClick={()=>handleExpandAccordion(e.grpKey)}
                    >
                      <div className={classNames({
                        'tags-label-dark': currentTheme === 'dark',
                        'tags-label': currentTheme !== 'dark',
                      })}>Download Options</div>
                      <div
                        style={{
                          fontSize: 12,
                          font: 'inherit',
                          fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                          fontWeight: '500',
                        }}
                      >
                        {result}
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        {options.map((option, index) => (
                          <FilterTags
                            name={option.label}
                            selected={selectedDownloadMenu.includes(
                              option.value,
                            )}
                            grpindex={index}
                            tagindex={index}
                            action={() => updateTag(option.value)}
                          />
                        ))}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </div>
            )
          ) : null}
          <div className={contentClass}>
            {/* <div>
						<div style={{ display: 'flex', width: '100%' }}>
							<div style={{ display: 'flex', width: '75%' }}>
								<SelectwithSearch
									heading={'Select Portfolio'}
									data={portfolios && portfolios.length > 0 ? portfolios : []}
									// defaultValue={currentPortfolio}
									handleChange={onPortfolioChange}
									type="portfolio"
									currentValue={currentPortfolio}
								/>
								<SelectwithSearch
									heading={'Select Benchmark'}
									data={portfolios && portfolios.length > 0 ? portfolios : []}
									// defaultValue={currentBenchmark}
									handleChange={onBenchmarkChange}
									type="benchmark"
									currentValue={currentBenchmark}
								/>
							</div>
							
						</div>
					</div> */}
          </div>
          <Switch>
            <Route path="/portfolio-footprint" exact>
              <PortfolioFootprint />
            </Route>
            <Route path="/scope3-materiality" exact>
              <Scope3Materiality />
            </Route>
            <Route path="/nlp" exact>
              <NLP />
            </Route>
            <Route path="/fund-of-funds" exact>
              <FundOfFunds />
            </Route>
            <Route path="/temperature-metric" exact>
              <TemperatureMetric />
            </Route>
            <Route path="/portfolio-optimization" exact>
              <PortfolioOptimization />
            </Route>
            <Route path="/portfolio-carbon-risk" exact>
              <PortfolioCarbonRisk />
            </Route>
            <Route path="/forward-looking-analysis" exact>
              <ForwardLookingAnalysis />
            </Route>
            <Route path="/stranded-assets-analysis" exact>
              <StrandedAssetsAnalysis />
            </Route>
            <Route path="/urgentem-download" exact>
              <UrgentemDownload />
            </Route>
            <Route path="/urgentem-api" exact>
              <UrgentemApi />
            </Route>
            <Route path="/generate-report" exact>
              <GenerateReport />
            </Route>
            <Route path="/">
              <UrgentemLanding
                history={history}
                handleUploadPortfolio={handleUploadPortfolio}
              />
            </Route>
          </Switch>
        </main>
      
      <Dialog open={dialog} onClose={handleCloseDialog}>
        <Box className="d-flex flex-space-between">
          <Typography variant="h5" style={{ marginLeft: 20, marginTop: 10 }}>
            Upload Portfolio
          </Typography>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
          <DialogContentText>
            Please download our sample portfolio for an exemplary structure of
            your portfolio.
            <Box>
              <a
                href={csvFile}
                download="Sample Portfolio"
                className={classes.samplePortfolio}
              >
                Portfolio Template
              </a>
            </Box>
            <Box>
              <a
                href={fundscsvFile}
                download="Sample Portfolio"
                className={classes.samplePortfolio}
              >
                Fund of Funds Template
              </a>
            </Box>
          </DialogContentText>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={3}>
              <InputLabel className={classes.labelText}>Currency :</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <Select
                variant="outlined"
                label="Select Currency"
                className={classes.select}
                placeholder="currency"
                disabled
                value="USD"
              >
                <MenuItem value="USD">USD ($)</MenuItem>
                <MenuItem value="EUR">EUR (€)</MenuItem>
                <MenuItem value="GBP">GBP (£)</MenuItem>
                <MenuItem value="AUD">AUD ($)</MenuItem>
                <MenuItem value="NZD">NZ ($)</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={3}>
              <InputLabel className={classes.labelText}>
                Portfolio Value :
              </InputLabel>
            </Grid>
            <Grid item xs={3}>
              <OutlinedInput
                type="number"
                className={classes.textInput}
                value={portfolioValue}
                onChange={(e) => setPortfolioValue(e.target.value)}
              />{' '}
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={3}>
              <InputLabel className={classes.labelText}>
                Portfolio Name :
              </InputLabel>
            </Grid>
            <Grid item xs={3}>
              <OutlinedInput
                className={classes.textInput}
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={3}>
              <InputLabel className={classes.labelText}>Description</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Description"
                multiline
                rows={3}
                variant="outlined"
                value={description}
                style={{ width: 200 }}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}>
              <InputLabel style={{ paddingTop: 10 }}>Benchmark</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <RadioGroup
                value={isBenchmark}
                onChange={(e) => {
                  setBenchmarkValue(e.target.value)
                }}
                row
                name="position"
                defaultValue="top"
              >
                <Box display="flex" flexDirection="row">
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio
                        disabled={isAdmin ? false : true}
                        color="default"
                      />
                    }
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        disabled={isAdmin ? false : true}
                        color="default"
                      />
                    }
                    label="No"
                  />
                </Box>
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}>
              <InputLabel style={{ paddingTop: 10 }}>Rebalance Portfolio Weights</InputLabel>
            </Grid>
            <Grid item xs={3}>
               <Checkbox checked={rebalance} onChange={(e)=>{setRebalance(e.target.checked)}} />
            </Grid>
            <Grid item xs={3}>
              <InputLabel style={{ paddingTop: 10 }}>Fund Of Funds</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <Checkbox 
                checked={fundOfFunds}
                onChange= {(e)=>{setFundOfFunds(e.target.checked)}}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={uploadPortfolio} color="primary" variant="outlined">
            Upload
          </Button>
          <input
            id="files"
            accept=".csv, .xls, .xlsx"
            style={{ display: 'none' }}
            type="file"
            name="file"
            ref={inputRef}
            onChange={handleFileSubmit}
            className="btn btn-secondary"
          />
        </DialogActions>
      </Dialog>
      <Dialog open={missingCoverageDialog} keepMounted maxWidth="sm">
        <Typography component={'div'} gutterBottom>
          The Portfolio was not Uploaded because it did not meet the coverage
          criteria. Please contact the IT Support team for support to match the
          remaining securities.
        </Typography>
        <DialogContent>
          <DialogTitle>Summary</DialogTitle>
          <DialogContentText>
            <Typography>
              Securities not covered in Fundamentals Dataset:{' '}
              {missingCoverage.number_of_securities_not_covered}
            </Typography>
            <Typography>
              Total Weight not covered in Fundamentals Dataset ( in %) :{' '}
              {missingCoverage.percentage_total_weight_not_covered}
            </Typography>
            <Typography>
              Securities not covered in Emissions Dataset:{' '}
              {missingCoverage.number_of_securities_not_covered_emissions}
            </Typography>
            <Typography>
              Total Weight not covered in Emissions Dataset ( in %) :{' '}
              {missingCoverage.percentage_total_weight_not_covered_emissions}
            </Typography>
            <Typography>
              Securities not covered in Price Dataset:{' '}
              {missingCoverage.number_of_securities_not_covered_price}
            </Typography>
            <Typography>
              Total Weight not covered in Price Dataset ( in %) :{' '}
              {missingCoverage.percentage_total_weight_not_covered_price}
            </Typography>
            <DialogTitle>Securities not covered</DialogTitle>
            <DataTable
              data={
                missingCoverage.list_of_securities_not_covered_all_datasets
                  ? missingCoverage.list_of_securities_not_covered_all_datasets
                  : []
              }
              columns={missingCoverageCells}
              tableHeading="MISSING_COVERAGE"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMissingCoverageDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(MiniDrawer)
