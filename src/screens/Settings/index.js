import React, { useState } from 'react';
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
	DialogActions
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { updateCurrency } from '../../redux/actions/authActions';

const yearOptions = [ 2020, 2019, 2018 ];
const quarterOptions = [ 'Q1', 'Q2', 'Q3', 'Q4' ];

const useStyles = makeStyles(() => ({
	container: {
		marginLeft: 100,
		marginTop: 100,
		marginBottom: 40
	},
	card: {
		padding: 10
	},
	cardTitle: {
		marginLeft: 10,
		marginBottom: 20,
		borderBottom: '1px solid rgb(180,180,180)',
		paddingBottom: 10
	},
	headingText: {
		color: 'black',
		fontFamily: 'Helvetica',
		fontWeight: 'bold',
		padding: 10
	},
	passwordInput: {
		border: 'none !important'
	},
	contentText: {
		color: 'black',
		fontFamily: 'Helvetica',
		fontStyle: 'italic',
		padding: 10
	},
	btn: {
		width: '100%',
		height: 40,
		fontSize: 11
	},
	labelText: {
		color: 'black',
		fontFamily: 'Helvetica',
		padding: 13,
		fontSize: 16
	},
	dropdown: {
		width: 200,
		height: 40
	}
}));
const Settings = () => {
	const classes = useStyles();
	const [ year, setYear ] = useState(2020);
	const [ quarter, setQuarter ] = useState('Q1');
	const [ currency, setCurrency ] = useState('USD');
	const [ emailDialog, setEmailDialog ] = useState(false);

	const dispatch = useDispatch();

	const userInfo = useSelector((state) => state.auth.userInfo);

	const updateCurrencyHandler = () => {
		const data = {
			year,
			quarter,
			currency
		};
		dispatch(updateCurrency(data));
	};
	const closeEmailDialog = () => {
		setEmailDialog(true);
	};
	return (
		<Box>
			<CssBaseline />
			<Header />
			<SideBar />
			<Grid container className={classes.container} spacing={3}>
				<Grid item xs={5}>
					<Card className={classes.card}>
						<Typography variant="h5" align="left" color="textPrimary" className={classes.cardTitle}>
							My Profile
						</Typography>
						<Grid container>
							<Grid item xs={3}>
								<Typography className={classes.headingText}>User name :</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography className={classes.contentText}>
									{userInfo && Object.keys(userInfo).length > 0 ? userInfo.userName : ''}
								</Typography>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={3}>
								<Typography className={classes.headingText}>Role :</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography className={classes.contentText}>
									{userInfo && Object.keys(userInfo).length > 0 ? userInfo.role : ''}
								</Typography>
							</Grid>
						</Grid>

						<Grid container>
							<Grid item xs={3}>
								<Typography className={classes.headingText}>email :</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography className={classes.contentText}>
									{userInfo && Object.keys(userInfo).length > 0 ? userInfo.email : ''}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Button
									color="primary"
									variant="outlined"
									className={classes.btn}
									onClick={() => {
										setEmailDialog(true);
									}}
								>
									Change Email
								</Button>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={3}>
								<Typography className={classes.headingText}>password :</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography className={classes.contentText}>********</Typography>
							</Grid>
							<Grid item xs={3}>
								<Button color="primary" variant="outlined" className={classes.btn}>
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
							style={{ marginBottom: 20, borderBottom: '1px solid rgb(180,180,180)' }}
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
								<Typography className={classes.labelText}>Select Year :</Typography>
							</Grid>
							<Grid item xs={6}>
								<FormControl variant="outlined">
									<Select
										placeholder="Select year"
										value={year}
										className={classes.dropdown}
										onChange={(e) => {
											setYear(e.target.value);
										}}
									>
										{yearOptions.map((year) => <MenuItem value={year}>{year}</MenuItem>)}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item xs={4}>
								<Typography className={classes.labelText}>Select Quarter :</Typography>
							</Grid>
							<Grid item xs={6}>
								<FormControl variant="outlined">
									<Select
										placeholder="Select quarter"
										value={quarter}
										className={classes.dropdown}
										onChange={(e) => {
											setQuarter(e.target.value);
										}}
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
								<Typography className={classes.labelText}>Select Currency :</Typography>
							</Grid>
							<Grid item xs={6}>
								<FormControl variant="outlined">
									<Select
										placeholder="Select currency"
										value={currency}
										className={classes.dropdown}
										onChange={(e) => {
											setCurrency(e.target.value);
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
							style={{ marginBottom: 20, borderBottom: '1px solid rgb(180,180,180)' }}
						>
							<Typography
								variant="h5"
								align="left"
								color="textPrimary"
								style={{ marginBotom: 20, marginLeft: 10 }}
							>
								Emission Settings
							</Typography>
							<Button variant="outlined" color="primary" style={{ marginBottom: 10 }}>
								Update
							</Button>
						</Box>
						<Grid container spacing={3}>
							<Grid item xs={4}>
								<Typography className={classes.labelText}>Select Year :</Typography>
							</Grid>
							<Grid item xs={6}>
								<FormControl variant="outlined">
									<Select placeholder="Select year" value={year} className={classes.dropdown}>
										{yearOptions.map((year) => <MenuItem value={year}>{year}</MenuItem>)}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item xs={4}>
								<Typography className={classes.labelText}>Select Quarter :</Typography>
							</Grid>
							<Grid item xs={6}>
								<FormControl variant="outlined">
									<Select placeholder="Select quarter" value={quarter} className={classes.dropdown}>
										{quarterOptions.map((quarter) => (
											<MenuItem value={quarter}>{quarter}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item xs={4}>
								<Typography className={classes.labelText}>Select Version :</Typography>
							</Grid>
							<Grid item xs={6}>
								<FormControl variant="outlined">
									<Select placeholder="Select quarter" value="1" className={classes.dropdown}>
										<MenuItem value="1">1</MenuItem>
										<MenuItem value="2">2</MenuItem>
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
							style={{ marginBottom: 20, borderBottom: '1px solid rgb(180,180,180)' }}
						>
							<Typography
								variant="h5"
								align="left"
								color="textPrimary"
								style={{ marginBotom: 20, marginLeft: 10 }}
							>
								Fundamental Settings
							</Typography>
							<Button variant="outlined" color="primary" style={{ marginBottom: 10 }}>
								Update
							</Button>
						</Box>
						<Grid container spacing={3}>
							<Grid item xs={4}>
								<Typography className={classes.labelText}>Select Year :</Typography>
							</Grid>
							<Grid item xs={6}>
								<FormControl variant="outlined">
									<Select placeholder="Select year" value={year} className={classes.dropdown}>
										{yearOptions.map((year) => <MenuItem value={year}>{year}</MenuItem>)}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item xs={4}>
								<Typography className={classes.labelText}>Select Quarter :</Typography>
							</Grid>
							<Grid item xs={6}>
								<FormControl variant="outlined">
									<Select placeholder="Select quarter" value={quarter} className={classes.dropdown}>
										{quarterOptions.map((quarter) => (
											<MenuItem value={quarter}>{quarter}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item xs={4}>
								<Typography className={classes.labelText}>Select Version :</Typography>
							</Grid>
							<Grid item xs={6}>
								<FormControl variant="outlined">
									<Select placeholder="Select quarter" value="1" className={classes.dropdown}>
										<MenuItem value="1">1</MenuItem>
										<MenuItem value="2">2</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</Card>
				</Grid>
			</Grid>
			<Dialog onClose={closeEmailDialog} open={emailDialog}>
				<Box m={2}>
					<Typography variant="h5">Change Email</Typography>
				</Box>
				<Box ml={2} mr={2}>
					<Typography>Please enter your new email.</Typography>
					<Typography style={{ color: '#1890ff', fontSize: 13 }}>
						Note : The entered email must be different from the current email.
					</Typography>
				</Box>
				<Box m={2}>
					<Grid container>
						<Grid item xs={4}>
							<InputLabel style={{ paddingTop: 10 }}>Email Address: </InputLabel>
						</Grid>
						<Grid item xs={8}>
							<TextField label="New Email" variant="outlined" />
						</Grid>
					</Grid>
				</Box>
				<DialogActions>
					<Button color="primary" variant="outlined">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default Settings;
