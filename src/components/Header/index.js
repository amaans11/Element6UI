import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, MenuItem, Menu ,Box} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../../assets/Urgentem_Wordmark.png';
import {logoutUser} from '../../redux/actions/authActions'
import SelectwithSearch from '../../components/Autocomplete'

const drawerWidth = 295;

const useStyles = makeStyles((theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		boxShadow: 'none'
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	icon: {
		marginRight: 10
	}
}));
const Header = ({ history }) => {
	const classes = useStyles();
	const  dispatch = useDispatch();

	
	const [ anchorEl, setAnchor ] = useState(null);
	const auth = useSelector((state) => state.auth);
	const userInfo = useSelector((state) => state.auth.userInfo);
	const portfolios = useSelector((state) => state.auth.portfolioList);

	const currentTheme = localStorage.getItem('appTheme');

	let currentUser = auth && auth.currentUser ? auth.currentUser : {};
	let emissionYear=2019;
	if(userInfo && userInfo.year && userInfo.year.emissions){
		emissionYear=userInfo.year.emissions
	}
	const open = Boolean(anchorEl);

	const handleSettings = () => {
		history.push('/settings');
	};
	const handleAdmin = ()=>{
		history.push('/admin');
	}
	const handleMenu = (event) => {
		setAnchor(event.currentTarget);
	};

	const handleThemeChange = () => {
		if (currentTheme === 'dark') {
			localStorage.setItem("appTheme",'basic')
			window.location.reload()
		} else {
			localStorage.setItem("appTheme",'dark')
			window.location.reload()
		}
	};
	const handleLogout=()=>{
		dispatch(logoutUser())
	}
	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar disableGutters={true}>
				<div
					className="navbar-section-toolbar"
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						width: '100%',
						marginLeft: 20
					}}
				>
					<LinkContainer to="/" style={{ cursor: 'pointer',marginTop:8 }}>
						<img src={Logo} alt="website logo" height="40px" style={{ width: '22%' }} />
					</LinkContainer>
					
					<Box variant="body1" color="inherit" noWrap>
						<div style={{color:currentTheme === 'dark' ? '#FFFFFF':'#F7DC81'}}> {`${currentUser.displayName} / ${currentUser.client}`} </div>
						<div style={{ fontSize: 12,color:currentTheme === 'dark' ? '#FFFFFF':'#F7DC81' }}> Urgentem Emissions Year - {emissionYear} </div>
						<div style={{ fontSize: 12,color:currentTheme === 'dark' ? '#FFFFFF':'#F7DC81' }}> Currency - {auth.currentCurrency ? auth.currentCurrency : 'USD'} </div>
					</Box>
				</div>
				<div>
					<IconButton
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={()=>{setAnchor(null)}}
						>
						<MenuItem onClick={handleThemeChange}>
							<BorderColorIcon className={classes.icon} />Change Theme
						</MenuItem>
						<MenuItem onClick={handleSettings}>
							<SettingsIcon className={classes.icon} />Settings
						</MenuItem>
						{userInfo.is_admin && <MenuItem onClick={handleAdmin}>
							<SupervisorAccountIcon className={classes.icon} />Admin
						</MenuItem>}
						<MenuItem onClick={handleLogout}>
							<ExitToAppIcon className={classes.icon} />Logout
						</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
