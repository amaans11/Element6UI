import React,{useState} from 'react'
import {
    Grid,
    Box,
    Typography,
    Button,
    FormControl,
    InputLabel,
    IconButton,
    InputAdornment
  } from '@material-ui/core'
import { NotificationManager } from 'react-notifications'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import {changePassword} from '../../redux/actions/authActions'
import { OutlinedInput } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';

const UpdatePasswrod = ()=>{
    const dispatch = useDispatch();

    const history = useHistory()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword , setVisibility] = useState(false)

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
            NotificationManager.error(error.message)
        }
      }
      const handleClickShowPassword = () => {
          setVisibility(!showPassword)
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return (
        <Box>
        <CssBaseline />
        <Header history={history} />
        <SideBar />
        <Grid style={{ marginTop: 100, marginLeft: 100}} mr={1} >
            <Box >
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
                        <Grid item xs={10}>
                            <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                    setPassword(e.target.value)
                                    }}
                                    value={password}
                                    endAdornment={
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            { showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <Box m={2}>
                    <Grid container>
                        <Grid item xs={10}>
                            <FormControl variant="outlined" style={{width:240}}>
                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                <OutlinedInput
                                label="Confirm Password"
                                variant="outlined"
                                size="small"
                                onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                }}
                                value={confirmPassword}
                            />
                            </FormControl>
                        
                        </Grid>
                    </Grid>
                </Box>
                <Button 
                    type="submit" 
                    style={{marginLeft:20,marginTop:20}}
                    onClick={changePasswordHandler}
                >Update Password</Button>
            </Box>        
            </Grid>
        </Box>
       
    )
}
export default UpdatePasswrod;