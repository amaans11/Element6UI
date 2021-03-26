import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../../assets/Urgentem_Wordmark.png';
import { CustomThemeContext } from '../Themes/customThemeProvider';

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
const Header = ({history}) => {
	const classes = useStyles();
	const [ anchorEl, setAnchor ] = useState(null);
	const { currentTheme, setTheme } = useContext(CustomThemeContext);

	const auth = useSelector((state) => state.auth);

	let currentUser = auth && auth.currentUser ? auth.currentUser : {};

	console.log('auth>>', auth);

	const open = Boolean(anchorEl);

	const handleSettings = () => {
		history.push('/settings');
	};
	const handleMenu = (event) => {
		setAnchor(event.currentTarget);
	};
	const handleThemeChange = (event) => {
		if (currentTheme === 'basic') {
			setTheme('dark');
		} else {
			setTheme('basic');
		}
	};
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
					<LinkContainer to="/" style={{ cursor: 'pointer' }}>
						<img src={Logo} alt="website logo" height="40px" style={{ width: '22%' }} />
					</LinkContainer>

					<Typography variant="body1" color="inherit" noWrap>
						<div> {`${currentUser.displayName} / ${currentUser.client}`} </div>
						<div style={{ fontSize: 12 }}> {currentUser.role} </div>
					</Typography>
				</div>
				<div>
					<IconButton
						aria-owns={open ? 'menu-appbar' : undefined}
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
						open={open}
					>
						<MenuItem>
							<BorderColorIcon className={classes.icon} onClick={handleThemeChange} />Change Theme
						</MenuItem>
						<MenuItem onClick={handleSettings}>
							<SettingsIcon className={classes.icon} />Settings
						</MenuItem>
						<MenuItem>
							<ExitToAppIcon className={classes.icon} />Logout
						</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
};
export default Header;
