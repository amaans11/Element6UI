import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Dark theme
const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        backgroundColor: "#102A43",
        color: "#cecece",
        border:"1px solid #b4b4b4"
      },
    },
    MuiAppBar: {
      colorPrimary: { backgroundColor: "#102A43" },
    },
    MiniDrawer: {
      root: {
        width: "100%",
      },
    },
    MuiChip: {
      colorPrimary: {
        backgroundColor: "#0a5cae !important",
        border: "1px solid rgba(255, 255, 255, 0.23)",
      },
    },
    MuiInputLabel: {
      root: {
        color: "#cecece",
        "&$focused": {
          color: "#cecece",
        },
      },
    },
    MuiInputBase: {
      root: {
        "&$after": {
          backgroundColor: "#cecece",
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: "#cecece",
      },
    },
    MuiTypography:{
      root:{
        color:'#FFFFFF !important'
      }
    },
    MuiButton: {
      contained: {
        backgroundColor: "#1bdecb !important",
        color: "#000000 !important" ,
        "&:hover": {
          backgroundColor: "#1bdecb",
        },
      },
      root: {
        "&:hover": {
          backgroundColor: "#1bdecb !important",
          color:"#000000 !important",
          border:"none !important"
        },
      },
      
    },
    MuiListItem: {
      button: {
        "&:hover": {
          color: "#cecece",
        },
      },
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: "#ffffff",
      light: "rgb(81, 91, 95)",
      dark: "rgb(26, 35, 39)",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FFB74D",
      light: "rgb(255, 197, 112)",
      dark: "rgb(200, 147, 89)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    titleBar: {
      main: "#555555",
      contrastText: "#ffffff",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
