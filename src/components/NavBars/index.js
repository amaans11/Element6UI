import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Tooltip} from '@material-ui/core'
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemLink from "../ListItemLink";
import Logo from "./../Assets/Urgentem_Wordmark.png";
import { LinkContainer } from "react-router-bootstrap";
import { Route, Switch, Link } from "react-router-dom";
import PortfolioFootprint1 from "../../screens/PortfolioFootprint1";
import Scope3Materiality1 from "../../screens/Scope3Materiality1";
import TemperatureMetric1 from "../../screens/TemperatureMetric1";
import PortfolioOptimization1 from "../../screens/PortfolioOptimization1";
import PortfolioCarbonRisk1 from "../../screens/PortfolioCarbonRisk1";
import ForwardLookingAnalysis1 from "../../screens/ForwardLookingAnalysis1";
import StrandedAssetsAnalysis1 from "../../screens/StrandedAssetsAnalysis1";
import UrgentemDownload1 from "../../screens/UrgentemDownload1";
import GenerateReport1 from "../../screens/GenerateReport1";
import UrgentemLanding from "../../screens/UrgentemLanding";
import { RouteData } from "../../Constants/routelist";

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
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon
                classes={{
                  root: this.state.open
                    ? classes.menuButtonIconOpen
                    : classes.menuButtonIconClosed,
                }}
              />
            </IconButton>
            <div
              className="navbar-section-toolbar"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
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
                Client/Username
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
                  fullName={e.fullName}
                ></ListItemLink>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/portfolio-footprint">
              <PortfolioFootprint1 />
            </Route>
            <Route path="/scope3-materiality">
              <Scope3Materiality1 />
            </Route>
            <Route path="/temperature-metric">
              <TemperatureMetric1 />
            </Route>
            <Route path="/portfolio-optimization">
              <PortfolioOptimization1 />
            </Route>
            <Route path="/portfolio-carbon-risk">
              <PortfolioCarbonRisk1 />
            </Route>
            <Route path="/forward-looking-analysis">
              <ForwardLookingAnalysis1 />
            </Route>
            <Route path="/stranded-assets-analysis">
              <StrandedAssetsAnalysis1 />
            </Route>
            <Route path="/urgentem-download">
              <UrgentemDownload1 />
            </Route>
            <Route path="/urgentem-api"></Route>
            <Route path="/generate-report">
              <GenerateReport1 />
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
