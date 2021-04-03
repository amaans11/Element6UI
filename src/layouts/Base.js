import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
	Drawer,
	AppBar,
	Toolbar,
	CssBaseline,
	Typography,
	IconButton,
	MenuItem,
	Menu,
	List,
	Button
} from '@material-ui/core';
import { Route, Switch, Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import ListItemLink from '../components/ListItemLink';
import Logo from '../assets/Urgentem_Wordmark.png';
import { RouteData } from './Route';
import Header from '../components/Header';
import SelectwithSearch from '../components/Autocomplete';
import FilterGroup from '../components/FilterSection';
import PortfolioFootprint from '../screens/PortfolioFootprint';
import Scope3Materiality from '../screens/Scope3Materiality';
import TemperatureMetric from '../screens/TemperatureMetric';
import PortfolioOptimization from '../screens/PortfolioOptimization';
import PortfolioCarbonRisk from '../screens/PortfolioCarbonRisk';
import ForwardLookingAnalysis from '../screens/ForwardLookingAnalysis';
import StrandedAssetsAnalysis from '../screens/StrandedAssetsAnalysis';
import UrgentemDownload from '../screens/UrgentemDownload';
import GenerateReport from '../screens/GenerateReport';
import UrgentemLanding from '../screens/UrgentemLanding';
import { getPortfolioList, getUserInfo, getUploadPortfolioList,setTheme } from '../redux/actions/authActions';

const drawerWidth = 295;

const styles = (theme) => ({
	root: {
		display: 'flex',
		width: '100%'
	},
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
	menuButton: {
		marginLeft: 11,
		marginRight: 36
	},
	menuButtonIconClosed: {
		transition: theme.transitions.create([ 'transform' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		transform: 'rotate(0deg)'
	},
	menuButtonIconOpen: {
		transition: theme.transitions.create([ 'transform' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		transform: 'rotate(180deg)'
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9 + 1
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing.unit,
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3
	},
	grow: {
		flexGrow: 1
	},
	icon: {
		marginRight: 10
	},
  uploadDiv:{
    position:'absolute',
    top:90
  },
	uploadBtn: {
		height: 50,
		width: 300,
    marginLeft:theme.spacing(2)
	}
});

const MiniDrawer = ({ classes, history }) => {
	const [ open, setOpen ] = useState(false);
	const dispatch = useDispatch();

	const auth = useSelector((state) => state.auth);
	const portfolios = useSelector((state) => state.auth.portfolioList);
  let currentUser = auth && auth.currentUser ? auth.currentUser : {};

	const getUserDetails = async () => {
		const data = {
			userName: currentUser.userName
		};
		await dispatch(getUserInfo(data));
	};

	const getPortfolio = async () => {
		await dispatch(getPortfolioList(currentUser.client));
	};

	const fetchDetails = async () => {
		await getUserDetails();
		await getPortfolio();
	};


	useEffect(() => {
		fetchDetails();
	}, []);

	return (
		<div className={classes.root}>
    <CssBaseline />
			<Header history={history}
      />
			<Drawer
				variant="permanent"
				className={classNames(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})}
				classes={{
					paper: classNames({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open
					})
				}}
				open={open}
			>
				<div className={classes.toolbar} />
				<List style={{ paddingTop: 20 }}>
					{RouteData.map((e, index) => <ListItemLink primary={e.name} icon={e.icon} to={e.url} />)}
				</List>
			</Drawer>
			<main className={classes.content}>
				{window.location.pathname != '/' ? (
					<div className="filter-main">
						<label className="filter-heading">Filters</label>
						<div className="filter-part">
							<FilterGroup />
						</div>
					</div>
				) : (
					<div className={classes.uploadDiv}>
						<Button variant="outlined" color="primary" className={classes.uploadBtn}>
							Upload Portfolio
						</Button>
					</div>
				)}
				<div className="content-part">
					<div>
						<div style={{ display: 'flex', width: '100%' }}>
							<div style={{ display: 'flex', width: '75%' }}>
								<SelectwithSearch heading={'Select Portfolio'} data={portfolios && portfolios.length > 0 ? portfolios : []} />
								<SelectwithSearch heading={'Select Benchmark'} data={portfolios && portfolios.length > 0 ? portfolios : []} />
							</div>
							<Button
								variant="outlined"
								color="secondary"
								style={{ marginTop: -10,height:45,width:'16%' }}
								onClick={() => history.push('/settings')}
							>
								1 USD = 1USD
							</Button>

							{/* <h4
								style={{
									marginLeft: 20,
									marginTop: -3,
									border: '1px solid rgb(180,180,180)',
									paddingTop: 6,
                  paddingLeft:10,
                  paddingRight:10,
                  display:'flex',
                  flexDirection:'row'
								}}
							>
								<div style={{paddingLeft:10}}>1 USD = 1USD </div>
                	<div>
									<EditIcon 
                  onClick={()=>history.push("/settings")}
                  />
								</div>
							</h4> */}
						</div>
					</div>
				</div>
				<Switch>
					<Route path="/portfolio-footprint" exact >
						<PortfolioFootprint />
					</Route>
					<Route path="/scope3-materiality" exact>
						<Scope3Materiality />
					</Route>
					<Route path="/temperature-metric" exact>
						<TemperatureMetric />
					</Route>
					<Route path="/portfolio-optimization" exact>
						<PortfolioOptimization />
					</Route>
					<Route path="/portfolio-carbon-risk" exact>
						<PortfolioCarbonRisk />
					</Route>
					<Route path="/forward-looking-analysis" exact>
						<ForwardLookingAnalysis />
					</Route>
					<Route path="/stranded-assets-analysis" exact>
						<StrandedAssetsAnalysis />
					</Route>
					<Route path="/urgentem-download" exact>
						<UrgentemDownload />
					</Route>
					<Route path="/urgentem-api" exact />
					<Route path="/generate-report" exact>
						<GenerateReport />
					</Route>
					<Route path="/">
						<UrgentemLanding />
					</Route>
				</Switch>
			</main>
		</div>
	);
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
