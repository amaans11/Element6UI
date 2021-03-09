import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {Drawer,AppBar,Toolbar,CssBaseline,Typography,IconButton,MenuItem,Menu,List} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { LinkContainer } from "react-router-bootstrap";
import { Route, Switch, Link } from "react-router-dom";
import ListItemLink from "../components/ListItemLink";
import Logo from "../assets/Urgentem_Wordmark.png";
import { RouteData } from "./Route";
import SelectwithSearch from '../components/Autocomplete'
import FilterGroup from '../components/FilterSection'
import PortfolioFootprint from "../screens/PortfolioFootprint";
import Scope3Materiality from "../screens/Scope3Materiality";
import TemperatureMetric from "../screens/TemperatureMetric";
import PortfolioOptimization from "../screens/PortfolioOptimization";
import PortfolioCarbonRisk from "../screens/PortfolioCarbonRisk";
import ForwardLookingAnalysis from "../screens/ForwardLookingAnalysis";
import StrandedAssetsAnalysis from "../screens/StrandedAssetsAnalysis";
import UrgentemDownload from "../screens/UrgentemDownload";
import GenerateReport from "../screens/GenerateReport";
import UrgentemLanding from "../screens/UrgentemLanding";

const portfolioData=[
  {label:'SP 500',value:'SP500'},
  {label:'CBUS Total Quities',value:'CBUS Total Quities'},
  {label:'CBUS GLobal Quities',value:'CBUS Total Quities'}
]
const drawerWidth = 295;

const styles = (theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 11,
    marginRight: 36,
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(0deg)",
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(180deg)",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  grow: {
    flexGrow: 1,
  },
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    routeList: RouteData,
  };

  handleDrawerOpen = () => {
    //this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          fooJon={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={true}>
            <div
              className="navbar-section-toolbar"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginLeft:20
              }}
            >
              <LinkContainer to="/" style={{ cursor: "pointer" }}>
                <img
                  src={Logo}
                  alt="website logo"
                  height="40px"
                  style={{ width: "22%" }}
                ></img>
              </LinkContainer>

              <Typography variant="body1" color="inherit" noWrap>
                  <div> Username / Client </div>
                  <div> Role </div>
              </Typography>
              
            </div>
            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar} />
          <List style={{ paddingTop: "2px" }}>
            {this.state.routeList.map((e, index) => (
              <ListItemLink
                primary={e.name}
                icon={e.icon}
                to={e.url}
              ></ListItemLink>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          {/* <div className={classes.toolbar} /> */}
          <div className="filter-main">
            <label className="filter-heading">Filters</label>
            <div className="filter-part">
              <FilterGroup />
            </div>
          </div>
          <div className="content-part">
            <div
              style={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ display: "flex", width: "70%" }}>
                  <SelectwithSearch heading={"Select Portfolio"} data={portfolioData} />
                  <SelectwithSearch heading={"Select Benchmark"} data={portfolioData} />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "30%",
                    justifyContent: "center",
                  }}
                >
                  {/* <UploadPortfolio
                    currency={MainRouterProps.currency_symbol}
                    color={[colorscheme.colorIcons, colorscheme.colorCharts[5]]}
                    userInfo={MainRouterProps.userInfo}
                    handleStatusUpload={handleStatusUpload}
                  /> */}
                </div>
              </div>
            </div>
          </div>
          <Switch>
            <Route path="/portfolio-footprint">
              <PortfolioFootprint />
            </Route>
            <Route path="/scope3-materiality">
              <Scope3Materiality />
            </Route>
            <Route path="/temperature-metric">
              <TemperatureMetric />
            </Route>
            <Route path="/portfolio-optimization">
              <PortfolioOptimization />
            </Route>
            <Route path="/portfolio-carbon-risk">
              <PortfolioCarbonRisk />
            </Route>
            <Route path="/forward-looking-analysis">
              <ForwardLookingAnalysis />
            </Route>
            <Route path="/stranded-assets-analysis">
              <StrandedAssetsAnalysis />
            </Route>
            <Route path="/urgentem-download">
              <UrgentemDownload />
            </Route>
            <Route path="/urgentem-api"></Route>
            <Route path="/generate-report">
              <GenerateReport />
            </Route>
            <Route path="/">
              <UrgentemLanding />
            </Route>
          </Switch>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MiniDrawer);
