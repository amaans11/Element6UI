import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
	DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NotificationManager } from 'react-notifications';
import bgImage from '../../assets/background-image.jpeg';
import { signinUser } from '../../redux/actions/authActions';
// import ForgetPassword from './ForgotPassword';

const useStyles = makeStyles(() => ({
	container: {
		width: '100%',
		height: window.innerHeight,
		backgroundImage: `url(${bgImage})`,
		backgroundSize: 'cover'
	},
	headingText: {
		color: 'white',
		fontFamily: 'Helvetica',
		fontStyle: 'italic',
		paddingTop: 40
	},
	text: {
		color: 'white',
		fontFamily: ']',
		fontStyle: 'italic'
	},
	loginContainer: {
		width: '40%',
		height: window.innerHeight / 2,
		borderRadius: 10,
		position: 'absolute',
		left: '30%',
		top: '25%',
		background: 'white'
	},
	login: {
		width: '50%',
		margin: 'auto'
	},
	inputBox: {
		marginTop: 50
	},
	textInput: {
		width: 250,
		height: 50,
		color: 'white',
		border: '1px solid white',
		color: 'black'
	},
	labelText: {
		marginBottom: 10
	},
	signinBtn: {
		width: 250,
		marginTop: 20
	},
	passwordText: {
		textAlign: 'center',
		marginTop: 10
	}
}));

function Login(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [ userName, setUserName ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errorMsg, setErrorMsg ] = useState('');
	const [ modal, setModal ] = useState(false);

	const handleForgetPassword = () => {
		setModal(true);
	};
	const handleSubmit = async () => {
		const data = {
			userName: userName,
			password: password,
			ip_address: '',
			final_object: 'sign_in'
		};
		try {
			await dispatch(signinUser(data));
			setErrorMsg('');
			NotificationManager.success('Login Successful!');
			props.history.push("/")
		} catch (error) {
			setErrorMsg(error.message);
		}
	};

	return (
		<React.Fragment>
			<Box className={classes.container}>
				<Typography align="center" variant="h4" className={classes.headingText}>
					WELCOME TO URGENTEM
				</Typography>
				<Typography align="center" variant="h5" className={classes.text}>
					Let's Get Started !
				</Typography>
				<Box className={classes.loginContainer}>
					<Box className={classes.login}>
						<Box mt={5}>
							<InputLabel className={classes.labelText}>UserName</InputLabel>
							<OutlinedInput
								className={classes.textInput}
								onChange={(e) => {
									setUserName(e.target.value);
								}}
							/>
						</Box>
						<Box mt={3}>
							<InputLabel className={classes.labelText}>Password</InputLabel>
							<OutlinedInput
								className={classes.textInput}
								type="password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
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
							<Box align="center" mt={1} onClick={handleForgetPassword}>
								<Link>Forget Password</Link>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
			<Dialog open={modal} keepMounted fullWidth={true}>
				<DialogTitle>Reset Password</DialogTitle>
				<DialogContent>
					{/* <ForgetPassword /> */}
				</DialogContent>
				<DialogActions>
					<Button>Cancel</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
export default Login;
