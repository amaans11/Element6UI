import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Normal or default theme
const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        backgroundColor: "#f5f5f5",
        color: "#cecece",
      },
    },
    MiniDrawer: {
      root: {
        width: "100%",
      },
    },
    MuiButton: {
      contained: {
        backgroundColor: "#acacac",
        color: "rgba(0, 0, 0, 0.87)",
        "&:hover": {
          backgroundColor: "#acacac",
        },
      },
      root: {
        "&:hover": {
          backgroundColor: "#acacac !important",
        },
      },
    },
    MuiChip: {
      colorPrimary: {
        border: "1px solid transparent",
      },
    },
    MuiListItem: {
      button: {
        textTransform: "capitalize",
        "&:hover": {
          color: "#556cd6",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#cc4444",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f5f5f5",
    },
    titleBar: {
      main: "#eeeeee",
      contrastText: "#222222",
    },
  },
});

export default theme;
