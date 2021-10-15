import React,{useState} from 'react'
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
    InputAdornment
  } from '@material-ui/core'
import { NotificationManager } from 'react-notifications'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import {changePassword} from '../../redux/actions/authActions'
import { OutlinedInput } from '@material-ui/core';
import {verifyCode,changeEmail} from '../../redux/actions/authActions'

const UpdatePasswrod = ()=>{
    const dispatch = useDispatch();

    const history = useHistory()

    const currentUser = useSelector(state=>state.auth.currentUser)

    const [verificationCode,setVerificationCode] = useState("")
    const [email, setEmail] = useState('')
    const [verification , setVerification ] = useState(true)


    console.log('currentUser.',currentUser)
    const changeEmailHandler = async () => {
        if(!verification){
          const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          if (!regex.test(email)) {
            NotificationManager.error('Please enter a valid email')
            return
          }
          try {

            setVerification(true)
          } catch (error) {
            NotificationManager.error(error.message)
          }
        }
        else{
          try {
            const data = {
             code:verificationCode
            }
            await dispatch(verifyCode(data))
            setEmail('')
            setVerification(false)
            history.push("/")
          } catch (error) {
              NotificationManager.error("Please enter a valid verification code! ")
          }
        }
      }
    return (
        <React.Fragment>
            <Header history={history} />
            <SideBar />
        <Box style={{ marginTop: 100, marginLeft: 100}} mr={1} >
        <Box style={{ marginLeft: 20, marginTop: 1 }} >
                    <Typography variant="h5" >
                    {verification ? 'Verify Code' : 'Submit Email'}
                    </Typography> 
                </Box>
            {verification  ? <Grid container style={{ marginLeft: 20, marginTop: 1 }}>
                
            <Grid item xs={2}>
              <InputLabel style={{ paddingTop: 10 }}>
                Email Address:{' '}
              </InputLabel>
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Email Address"
                variant="outlined"
                size="small"
                disabled
                style={{width:300,marginBottom:20}}
                value={currentUser.email}
              />
              </Grid>
              <Grid item xs={2}>
                <InputLabel style={{ paddingTop: 10 }}>
                  Verification Code:{' '}
                </InputLabel>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Code"
                  variant="outlined"
                  size="small"
                  style={{width:300}}
                  onChange={(e) => {
                    setVerificationCode(e.target.value)
                  }}
                  value={verificationCode}
                />
              </Grid>
            </Grid> : 
            <Grid container style={{ marginLeft: 20, marginTop: 1 }}>
            <Grid item xs={2}>
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
            
            }
        <Button type="submit" onClick={changeEmailHandler} style={{ marginLeft: 20, marginTop: 10 }}>Submit</Button>
    </Box>  
    </React.Fragment>
    )
}
export default UpdatePasswrod;