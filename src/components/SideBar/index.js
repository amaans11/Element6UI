import React,{useState} from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {List,Drawer} from '@material-ui/core';
import ListItemLink from "../ListItemLink";
import { RouteData } from "../../layouts/Route";

const drawerWidth = 295;

const useStyles=makeStyles((theme)=>({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
}))
function SideNav() {
  const [open,setOpen]=useState(true)

  const classes=useStyles()
	return (
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
			open={true}
		>
			<List style={{ paddingTop: 20 }}>
				{RouteData.map((e, index) => <ListItemLink primary={e.name} icon={e.icon} to={e.url} />)}
			</List>
		</Drawer>
	);
}

export default SideNav;
