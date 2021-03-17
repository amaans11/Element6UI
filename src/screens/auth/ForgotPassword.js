import React,{useState} from 'react';
import { Stepper, Step, StepLabel, StepContent, TextField, Grid, Button } from '@material-ui/core';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
	infoText:{
        fontSize: 12,
		color: '#F7DC81',
		fontWeight: 'bold'
    }
}));

export default function ForgotPassword() {
    const [activeStep,setActiveStep]=useState(0)
    const [userData,setUserData]=useState({
        username:"",
        clientname:"",
        verificationCode:"",
        password:""
    })
    const [errorMsg,setErrorMsg]=useState("")

    const classes=useStyles();

    const handleVerifyUser=async()=>{
        const {username,clientname}=userData
        const data={
            userName:username,
            clientName:clientname,
            ip_address:"",
            final_object: "reset_password"
        }
        try{
            await dispatch(verifyUser(data))
            setActiveStep(1)
        }
        catch(error){
            setErrorMsg(error)
        }
    }
    const handleCodeChange=()=>{
        
    }
    const handlePasswordChange=()=>{

    }
	return (
		<React.Fragment>
			<Stepper activeStep={activeStep} orientation="vertical">
				<Step key={0}>
					<StepLabel>Enter Details</StepLabel>
					<StepContent>
						<Grid container>
							<Grid col sm={6}>
								<TextField
									placeholder="User name"
									required
									onChange={e=>{
                                        setUserData({
                                            ...userData,
                                            username:e.target.value
                                        })
                                    }}
									value={userData.username}
								/>
							</Grid>
							<Grid col sm={6}>
								<TextField
									placeholder="Client name"
									required
									onChange={e=>{
                                        setUserData({
                                            ...userData,
                                            clientname:e.target.value
                                        })
                                    }}
									value={userData.clientname}
								/>
							</Grid>
						</Grid>
						{userData.username &&
						userData.clientname &&
						errorMsg && <Typography className="error-msg">{errorMsg}</Typography>}
						<Button
							variant="contained"
							color="primary"
							disabled={username && clientname ? false : true }
							onClick={handleVerifyUser}
						>
							Next
						</Button>
					</StepContent>
				</Step>
				<Step key={1}>
					<StepLabel>
						<React.Fragment>
							<Box>Enter Verification Code</Box>
							<span className={classes.infoText}>Verification code has been sent to your registered email!</span>
						</React.Fragment>
					</StepLabel>
					<StepContent>
						<Grid container>
							<Grid col sm={12}>
								<TextField
									placeholder="Verification Code"
									type="number"
									required
									onChange={(e) => {setUserData({
                                        ...userData,
                                        verificationCode:e.target.value
                                    })}}
									value={userData.verificationCode}
								/>
							</Grid>
						</Grid>
						{verificationCode &&
						errorMsg && <div className="error-msg">Invalid Verification code</div>}
						<Box display="flex" flexDirection="row">
							<Button
								onClick={()=>{setActiveStep(0)}}
							>
								Previous
							</Button>
							<Button
								variant="contained"
								color="primary"
								disabled={!userData.verificationCode}
								onClick={handleVerifyCode}
							>
								Next
							</Button>
						</Box>
					</StepContent>
				</Step>
				<Step key={2}>
					<StepLabel>Enter New Password</StepLabel>
					<StepContent>
						<Grid container>
							<TextField
								placeholder="Enter New Password"
								required
                                onChange={(e) => {setUserData({
                                    ...userData,
                                    verificationCode:e.target.value
                                })}}
                        		value={userData.password}
							/>
						</Grid>
						<Box display="flex" flexDirection="row">
							<Button
								onClick={()=>{setActiveStep(1)}}
							>
								Previous
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={handlePasswordChange}
							>
								Finish
							</Button>
						</Box>
					</StepContent>
				</Step>
			</Stepper>
		</React.Fragment>
	);
}
