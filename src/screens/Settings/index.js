import React, { useState } from 'react'
import {
  Grid,
  Card,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  CssBaseline,
  TextField,
  Dialog,
  InputLabel,
  DialogActions,
  IconButton,
  Link,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { get } from 'lodash'
import moment from 'moment'
import { NotificationManager } from 'react-notifications'
import CloseIcon from '@material-ui/icons/Close'
import DataTable from '../../components/Table/DataTable'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import {
  updateCurrency,
  changeEmail,
  changePassword,
  getPortfolioList,
  deletePortfolioRequest,
  getFixRate,
  verifyCode,
  getUserInfo,
  updateUserInfo
} from '../../redux/actions/authActions'

const quarterOptions = ['Q1', 'Q2', 'Q3', 'Q4']

const useStyles = makeStyles(() => ({
  container: {
    marginLeft: 100,
    marginTop: 70,
    marginBottom: 40,
  },
  card: {
    padding: 10,
  },
  cardTitle: {
    marginLeft: 10,
    marginBottom: 20,
    borderBottom: '1px solid rgb(180,180,180)',
    paddingBottom: 10,
  },
  headingText: {
    color: 'black',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    padding: 10,
  },
  passwordInput: {
    border: 'none !important',
  },
  contentText: {
    color: 'black',
    fontFamily: 'Helvetica',
    fontStyle: 'italic',
    padding: 10,
  },
  btn: {
    width: '100%',
    height: 40,
    fontSize: 11,
  },
  labelText: {
    color: 'black',
    fontFamily: 'Helvetica',
    padding: 13,
    fontSize: 16,
  },
  dropdown: {
    width: 200,
    height: 40,
  },
}))
const Settings = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const portfolioTableRes = useSelector((state) => state.auth.portfolioTableRes)

  const { userInfo } = auth
  let currentUser = auth && auth.currentUser ? auth.currentUser : {}

  const currentYear = get(auth, 'currentYear', 2020)
  const currentCurrency = get(auth, 'currentCurrency', 'USD')
  const currentQuarter = get(auth, 'currentQuarter', 'Q1')

  const [year, setYear] = useState(currentYear)
  const [quarter, setQuarter] = useState(currentQuarter)
  const [currency, setCurrency] = useState(currentCurrency)

  const [emailDialog, setEmailDialog] = useState(false)
  const [email, setEmail] = useState('')
  const [passwordDialog, setPasswordDialog] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [dialog, setDialog] = useState(false)
  const [portIds, setPortIds] = useState([])
  const [verification , setVerification ] = useState(false)
  const [verificationCode,setVerificationCode] = useState("")
  const [error,setError] = useState("")

  const [emissionYear, setEmissionYear] = useState(get(userInfo.year, 'emissions', '2019'))
  const [emissionQuarter, setEmissionQuarter] = useState(get(userInfo.quarter, 'emissions', 'Q1'))
  const [emissionVersion, setEmissionVersion] = useState(get(userInfo.version, 'emissions', 11))
  const [fundamentalYear, setFundamentalYear] = useState(get(userInfo.year, 'fundamentals', '2019'))
  const [fundamentalQuarter, setFundamentalQuarter] = useState(get(userInfo.quarter, 'fundamentals', 'Q1'))
  const [fundamentalVersion, setFundamentalVersion] = useState(get(userInfo.version, 'fundamentals', '11'))

  const yearOptions = userInfo.allowed_years

  const updateCurrencyHandler = async() => {
    const data={
      role: userInfo.role,
      display_name: userInfo.display_name,
      user_name: userInfo.user_name,  // should be unique
      year: {
        emissions: emissionYear,
        fundamentals: fundamentalYear,
        currency:year
      },
      quarter: {
        emissions: emissionQuarter,
        fundamentals: fundamentalQuarter,
        currency:quarter
      },
      version: {
        emissions: emissionVersion,
        fundamentals: fundamentalVersion,
        display_currency:currency,

      },
    }
    await dispatch(updateUserInfo(data))
	  await dispatch(getFixRate(year,quarter))
  }
  const deletePortfolioHandler = () => {
    setDialog(true)
  }
  const closeEmailDialog = () => {
    setEmailDialog(false)
    setEmail('')
  }
  const closePasswordDialog = () => {
    setPasswordDialog(false)
    setPassword('')
  }
  const handleClose = () => {
    setDialog(false)
  }
  const deletePortfolio = async () => {
    try {
      await dispatch(deletePortfolioRequest(portIds))
      NotificationManager.success('Portfolio deleted successfully')
      setDialog(false)
      window.location.reload()
    } catch (error) {
      NotificationManager.error('Unable to delete the portfolio !')
    }
  }
  const handleUserInfoChanges =async()=>{
    const data={
      role: userInfo.role,
      display_name: userInfo.display_name,
      user_name: userInfo.user_name,  // should be unique
      year: {
        emissions: emissionYear,
        fundamentals: fundamentalYear
      },
      quarter: {
        emissions: emissionQuarter,
        fundamentals: fundamentalQuarter
      },
      version: {
        emissions: emissionVersion,
        fundamentals: fundamentalVersion
      },
    }
    await dispatch(updateUserInfo(data))

  }
  const getHeadCells = () => {
    return [
      {
        name: 'Portfolio Name',
        selector: 'name',
        sortable: true,
        right: false,
        wrap: true,
      },
      {
        name: 'Emission Coverage (%)',
        selector: 'coverageEmissions',
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
    ]
  }
  const changeEmailHandler = async () => {
    if(!verification){
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!regex.test(email)) {
        NotificationManager.error('Please enter a valid email')
        return
      }
      try {
        const data = {
         email:email
        }
        await dispatch(changeEmail(data))
        setVerification(true)
      } catch (error) {
        NotificationManager.error(error)

      }
    }
    else{
      try {
        const data = {
         email:email,
         code:parseInt(verificationCode)
        }
        const reData = {
          userName: currentUser.userName,
        }
        await dispatch(verifyCode(data))
        setEmailDialog(false)
        setEmail('')
        setVerification(false)
        NotificationManager.success("Email changed successfully !")
        await dispatch(getUserInfo(reData))
      } catch (error) {
        setError("Please enter a valid verification code! ")
      }
    }
  }
  const changePasswordHandler = async () => {
    try {
      if(password !== confirmPassword){
        NotificationManager.error("Password doesn't match!")
        return ;
      }

      const data = {
        new_pwd: password,
        repeat_pwd: confirmPassword,
      }
      await dispatch(changePassword(data))
      NotificationManager.success('Password Updated successfully!')
      setPasswordDialog(false)
      setPassword('')
    } catch (error) {
    }
  }
  const handleSelectedRowsChange = selectedPortfolios =>{
	  let portIds=[]
	  if(selectedPortfolios && selectedPortfolios.length > 0){
		selectedPortfolios.map(portfolio=>{
			portIds.push(
				portfolio['portfolio_id']
			)
		})
	  }
	  setPortIds(portIds)
  }
  const headCells = getHeadCells()
  const history = useHistory()
  console.log("portIds>>",portIds)
  return (
    <Box>
      <CssBaseline />
      <Header history={history} />
      <SideBar />
      <Grid container className={classes.container} spacing={3}>
        
        <Grid item xs={5}>
          <Card className={classes.card}>
            <Typography
              variant="h5"
              align="left"
              color="textPrimary"
              className={classes.cardTitle}
            >
              My Profile
            </Typography>
            <Grid container>
              <Grid item xs={3}>
                <Typography className={classes.headingText}>
                  User name :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.contentText}>
                  {userInfo && Object.keys(userInfo).length > 0
                    ? userInfo.user_name
                    : ''}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography className={classes.headingText}>Role :</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.contentText}>
                  {userInfo && Object.keys(userInfo).length > 0
                    ? userInfo.role
                    : ''}
                </Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={3}>
                <Typography className={classes.headingText}>email :</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.contentText}>
                  {userInfo && Object.keys(userInfo).length > 0
                    ? userInfo.email
                    : ''}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.btn}
                  onClick={() => {
                    setEmailDialog(true)
                  }}
                >
                  Change Email
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography className={classes.headingText}>
                  password :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.contentText}>
                  ********
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.btn}
                  onClick={() => {
                    history.push("/update-password")
                  }}
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card className={classes.card}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              style={{
                marginBottom: 20,
                borderBottom: '1px solid rgb(180,180,180)',
              }}
            >
              <Typography
                variant="h5"
                align="left"
                color="textPrimary"
                style={{ marginBotom: 20, marginLeft: 10 }}
              >
                Currency Settings
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginBottom: 10 }}
                onClick={updateCurrencyHandler}
              >
                Update
              </Button>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography className={classes.labelText}>
                  Select Year :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined">
                  <Select
                    placeholder="Select year"
                    value={year}
                    className={classes.dropdown}
                    onChange={(e) => {
                      setYear(e.target.value)
                    }}
                  >
                    {yearOptions.map((year) => (
                      <MenuItem value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography className={classes.labelText}>
                  Select Quarter :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined">
                  <Select
                    placeholder="Select quarter"
                    value={quarter}
                    className={classes.dropdown}
                    onChange={(e) => {
                      setQuarter(e.target.value)
                    }}
                  >
                    {year != 2021 ? quarterOptions.map((quarter) => (
                      <MenuItem value={quarter}>{quarter}</MenuItem>
                    )):
                    ['Q1','Q2'].map((quarter) => (
                      <MenuItem value={quarter}>{quarter}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography className={classes.labelText}>
                  Select Currency :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined">
                  <Select
                    placeholder="Select currency"
                    value={currency}
                    className={classes.dropdown}
                    onChange={(e) => {
                      setCurrency(e.target.value)
                    }}
                  >
                    <MenuItem value="USD">USD ($)</MenuItem>
                    <MenuItem value="EUR">EUR (€)</MenuItem>
                    <MenuItem value="GBP">GBP (£)</MenuItem>
                    <MenuItem value="AUD">AUD ($)</MenuItem>
                    <MenuItem value="NZD">NZ ($)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginLeft: 100 }}>
        <Grid item xs={5}>
          <Card className={classes.card}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              style={{
                marginBottom: 20,
                borderBottom: '1px solid rgb(180,180,180)',
              }}
            >
              <Typography
                variant="h5"
                align="left"
                color="textPrimary"
                style={{ marginBotom: 20, marginLeft: 10 }}
              >
                Emission Settings
              </Typography>
              <Button variant="outlined" color="primary" style={{ marginBottom: 10 }}
              onClick={handleUserInfoChanges}
              >
								Update
							</Button>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography className={classes.labelText}>
                  Select Year :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined">
                  <Select
                    placeholder="Select year"
                    value={emissionYear}
                    className={classes.dropdown}
                    onChange={
                      (e)=>{
                        setEmissionYear(e.target.value)
                      }
                    }
                  >
                    {yearOptions.map((year) => (
                      <MenuItem value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography className={classes.labelText}>
                  Select Quarter :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined">
                  <Select
                    placeholder="Select quarter"
                    value={emissionQuarter}
                    className={classes.dropdown}
                    onChange={
                      (e)=>{
                        setEmissionQuarter(e.target.value)
                      }
                    }
                    disabled
                  >
                    {quarterOptions.map((quarter) => (
                      <MenuItem value={quarter}>{quarter}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography className={classes.labelText}>
                  Select Version :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined">
                  <Select
                    placeholder="Select quarter"
                    value={emissionVersion}
                    className={classes.dropdown}
                    onChange={
                      (e)=>{
                        setEmissionVersion(e.target.value)
                      }
                    }
                    disabled
                    
                  >
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card className={classes.card}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              style={{
                marginBottom: 20,
                borderBottom: '1px solid rgb(180,180,180)',
              }}
            >
              <Typography
                variant="h5"
                align="left"
                color="textPrimary"
                style={{ marginBotom: 20, marginLeft: 10 }}
              >
                Fundamental Settings
              </Typography>
              <Button variant="outlined" color="primary" style={{ marginBottom: 10 }}
              onClick={handleUserInfoChanges}
              >
								Update
							</Button>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography className={classes.labelText}>
                  Select Year :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined">
                  <Select
                    placeholder="Select year"
                    value={fundamentalYear}
                    className={classes.dropdown}
                    onChange={
                      (e)=>{
                        setFundamentalYear(e.target.value)
                      }
                    }
                  >
                    {yearOptions.map((year) => (
                      <MenuItem value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography className={classes.labelText}>
                  Select Quarter :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined">
                  <Select
                    placeholder="Select quarter"
                    value={fundamentalQuarter}
                    className={classes.dropdown}
                    onChange={
                      (e)=>{
                        setFundamentalQuarter(e.target.value)
                      }
                    }
                    disabled
                  >
                    {quarterOptions.map((quarter) => (
                      <MenuItem value={quarter}>{quarter}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography className={classes.labelText}>
                  Select Version :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined">
                  <Select
                    placeholder="Select quarter"
                    value={emissionVersion}
                    className={classes.dropdown}
                    onChange={
                      (e)=>{
                        setFundamentalVersion(e.target.value)
                      }
                    }
                    disabled

                  >
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Dialog onClose={closeEmailDialog} open={emailDialog}>
        <Box className="d-flex flex-space-between">
          <Typography variant="h5" style={{ marginLeft: 20, marginTop: 10 }}>
            Change Email
          </Typography>
          <IconButton onClick={closeEmailDialog}>
            <CloseIcon />
          </IconButton>
        </Box>
        {
          verification ? 
          <React.Fragment>
            <Box ml={2} mr={2}>
              <Typography>Please enter verification code.</Typography>
          </Box>
          <Box m={2}>
            <Grid container>
              <Grid item xs={4}>
                <InputLabel style={{ paddingTop: 10 }}>
                  Verification Code:{' '}
                </InputLabel>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Code"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    setVerificationCode(e.target.value)
                  }}
                  value={verificationCode}
                />
              </Grid>
            </Grid>
            {
              error &&
              <span className="error-msg">{error}</span>
            }
        </Box>
        </React.Fragment>
        : 
        <React.Fragment>
          <Box ml={2} mr={2}>
          <Typography>Please enter your new email.</Typography>
        </Box>
        <Box m={2}>
          <Grid container>
            <Grid item xs={4}>
              <InputLabel style={{ paddingTop: 10 }}>
                Email Address:{' '}
              </InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Email Address"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                value={email}
              />
            </Grid>
          </Grid>
        </Box>
        </React.Fragment>
        }
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={changeEmailHandler}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={closePasswordDialog} open={passwordDialog}>
        <Box className="d-flex flex-space-between">
          <Typography variant="h5" style={{ marginLeft: 20, marginTop: 10 }}>
            Change Password
          </Typography>
          <IconButton onClick={closePasswordDialog}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box ml={2} mr={2}>
          <Typography>Please enter your new password.</Typography>
        </Box>
        <Box m={2}>
          <Grid container>
            <Grid item xs={4}>
              <InputLabel style={{ paddingTop: 10 }}>Password: </InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                value={password}
              />
            </Grid>
          </Grid>
        </Box>
        <Box m={2}>
          <Grid container>
            <Grid item xs={4}>
              <InputLabel style={{ paddingTop: 10 }}>Confirm Password: </InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
                value={confirmPassword}
              />
            </Grid>
          </Grid>
        </Box>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={changePasswordHandler}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialog} keepMounted onClose={handleClose} maxWidth="sm">
        <DialogTitle>Delete Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <DataTable
              data={portfolioTableRes}
              columns={headCells}
              tableHeading="UPLOAD_PORTFOLIO"
              isSelectableRows={true}
			  handleSelection={handleSelectedRowsChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={deletePortfolio} disabled={portIds.length === 0}>
            Delete
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Settings
