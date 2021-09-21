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
  } from '@material-ui/core'
import { NotificationManager } from 'react-notifications'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import {changePassword} from '../../redux/actions/authActions'

const UpdatePasswrod = ()=>{
    const dispatch = useDispatch();

    const history = useHistory()

    console.log("history>>",history)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
          setPassword('')
          setConfirmPassword("")
          history.goBack()
        } catch (error) {
            NotificationManager.error('Password cannot be updated!')
        }
      }

    return (
        <React.Fragment>
            <Header />
            <SideBar />
        <Box style={{ marginTop: 100, marginLeft: 100}} mr={1} >
            <Box s>
                <Box >
                    <Typography variant="h5" style={{ marginLeft: 20, marginTop: 1 }}>
                        Change Password
                    </Typography> 
                </Box>
                <Box ml={2} mr={2}>
                    <Typography>Please enter your new password.</Typography>
                </Box>
                <Box m={2}>
                    <Grid container>
                        <Grid item xs={2}>
                        <InputLabel style={{ paddingTop: 10 }}>Password: </InputLabel>
                        </Grid>
                        <Grid item xs={10}>
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
                        <Grid item xs={2}>
                        <InputLabel style={{ paddingTop: 10 }}>Confirm Password: </InputLabel>
                        </Grid>
                        <Grid item xs={10}>
                        <TextField
                            label="Confirm Password"
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
                <Button 
                    type="submit" 
                    style={{marginLeft:20,marginTop:20}}
                    onClick={changePasswordHandler}
                >Update Password</Button>
            </Box>        
            </Box>
        </React.Fragment>
    )
}
export default UpdatePasswrod;