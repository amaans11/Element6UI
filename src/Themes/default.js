import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Normal or default theme
const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        backgroundColor: "#f5f5f5",
        color: "#cecece",
        border:"1px solid #b4b4b4"
      },
    },
    MiniDrawer: {
      root: {
        width: "100%",
      },
    },
    MuiButton: {
      // outlinedSecondary: {
      //   color: "#ff4d4f",
      //   "&:hover": {
      //     backgroundColor: "#ff4d4f !important",
      //     color:"#FFFFFF !important"
      //   },
      // },
      root: {
          backgroundColor: "#1E2732 !important",
          color:"#F7DC81 !important",
          border:"none",
          "&:hover": {
            border: "none !important",
          },
      },
    },
    MuiAppBar:{
      root:{ backgroundColor:'#1E2732 !important'}
    },
  MuiTypography:{
    root:{
      // fontFamily: 'Helvetica',
      color:'black',
      fontSize:12
    }
  },
    MuiChip: {
      colorPrimary: {
        border: "1px solid transparent",
      },
    },
    MuiListItem: {
      button: {
        "&:hover": {
          color: "#556cd6",
        },
      },
    },
    MuiChip:{
      root:{
        borderRadius:'none !important'
      },
      colorPrimary:{
        backgroundColor:'#1E2732 !important'
      }
    },
    MuiList:{
      root:{
        paddingTop:'0px !important'
      }
    },
    MuiAccordionSummary:{
      content:{
        display:'block !important'
      }
    },
    MUiAutocomplete:{
      root:{
        paddingTop:-3
      }
    }
  },
  palette: {
    primary: {
      main: "#1890ff",
    },
    secondary: {
      main: "#000000",
    },
    default:{
      color:'#000000'
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
