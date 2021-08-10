import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Box,
  Typography,
  OutlinedInput,
  InputLabel,
  Button,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Avatar,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { NotificationManager } from 'react-notifications'
import bgImage from '../../assets/background-image.jpeg'
import { signinUser } from '../../redux/actions/authActions'
import fillImg from '../../assets/urgentem.png'

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: window.innerHeight,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
  },
  headingText: {
    color: 'white',
    fontFamily: 'Helvetica',
    fontStyle: 'italic',
    paddingTop: 40,
  },
  text: {
    color: 'white',
    fontFamily: ']',
    fontStyle: 'italic',
  },
  loginContainer: {
    width: '40%',
    height: window.innerHeight / 2,
    borderRadius: 10,
    position: 'absolute',
    left: '30%',
    top: '25%',
    background: 'white',
  },
  login: {
    width: '50%',
    margin: 'auto',
  },
  inputBox: {
    marginTop: 50,
  },
  textInput: {
    width: '100%',
    height: 50,
    border: '1px solid white',
    color: 'black',
  },
  labelText: {
    marginBottom: 10,
  },
  signinBtn: {
    width: '100%',
    marginTop: 20,
  },
  passwordText: {
    textAlign: 'center',
    marginTop: 10,
  },
}))

function Login(props) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [modal, setModal] = useState(false)

  const handleForgetPassword = () => {
    setModal(true)
  }
  const handleSubmit = async () => {
    const data = {
      userName: userName,
      password: password,
      ip_address: '',
      final_object: 'sign_in',
    }
    try {
      await dispatch(signinUser(data))
      setErrorMsg('')
      NotificationManager.success('Login Successful!')
      props.history.push('/')
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{ backgroundColor: '#CCFF00' }}
        >
          <Box p={4}>
            <img
              src={fillImg}
              height="100hv"
              style={{ marginTop: 30, marginLeft: 10 }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{ height: '100%' }}
        >
          <div
            style={{
              width: '100%',
              height: '100vh',
            }}
          >
            <Box p={2}>
              <Box mt={2}>
                <Box align="center">
                  <Avatar>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                </Box>
                <Box ml={2} mr={2}>
                  <Box mt={5}>
                    <TextField
                      variant="outlined"
					  label="User Name"
                      className={classes.textInput}
                      onChange={(e) => {
                        setUserName(e.target.value)
                      }}
					  required
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      variant="outlined"
                      className={classes.textInput}
					  label="Password"
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
					  required
                    />
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.signinBtn}
                      onClick={handleSubmit}
                      disabled={!userName || !password}
                    >
                      Sign In
                    </Button>
                    {errorMsg && (
                      <Box className="error-msg" align="center" mt={1}>
                        {errorMsg}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        </Grid>
      </Grid>
      <Dialog open={modal} keepMounted fullWidth={true}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>{/* <ForgetPassword /> */}</DialogContent>
        <DialogActions>
          <Button>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
export default Login
