import React from "react";
import { Link, NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import GraphicEqIcon from "@material-ui/icons/GraphicEq";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import TimelineIcon from "@material-ui/icons/Timeline";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import GetAppIcon from "@material-ui/icons/GetApp";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import BarChartIcon from "@material-ui/icons/BarChart";
import CodeIcon from "@material-ui/icons/Code";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const getAvataricon = (icon) => {
    switch (icon) {
      case "GraphicEqIcon":
        return <GraphicEqIcon />;
      case "VerticalSplitIcon":
        return <VerticalSplitIcon />;
      case "InsertChartIcon":
        return <InsertChartIcon />;
      case "TimelineIcon":
        return <TimelineIcon />;
      case "BubbleChartIcon":
        return <BubbleChartIcon />;
      case "ViewWeekIcon":
        return <ViewWeekIcon />;
      case "BarChartIcon":
        return <BarChartIcon />;
      case "GetAppIcon":
        return <GetAppIcon />;
      case "CodeIcon":
        return <CodeIcon />;
      case "AssignmentReturnedIcon":
        return <AssignmentReturnedIcon />;
      default:
        return <AssignmentReturnedIcon />;
    }
  };

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <NavLink
          ref={ref}
          to={to}
          {...linkProps}
          activeClassName="Mui-selected"
        />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={CustomLink} className="navigation">
        <ListItemIcon>{getAvataricon(icon)}</ListItemIcon>
        <ListItemText primary={primary}>{primary}</ListItemText>
      </ListItem>
    </li>
  );
}

export default ListItemLink;
