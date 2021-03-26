import React,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Card, Typography ,Box,Grid} from '@material-ui/core';
import axios from 'axios'
import * as actionTypes from '../../redux/actionTypes'
import { makeStyles } from '@material-ui/core/styles';
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
import configs from '../../util/landing-page.config';
import AdvancedTable from '../../components/Table/AdvancedTable'
import {getPortfolioList} from '../../redux/actions/authActions'

function getHeadCells(){
  return [
    {
      id:'name',
      label:'Portfolio Name',
      disablePadding:false
    },
    {
      id:'% of Portfolio Processed',
      label:'Fundamentals Data Coverage (%)',
      disablePadding:true
    },
    {
      id:'emission',
      label:'Emissions Data Coverage (%)',
      disablePadding:true
    },
    {
      id:'% of Portfolio Covered by Price data',
      label:'Price Data Coverage (%)',
      disablePadding:true
    },
    {
      id:'date',
      label:'Processing Date',
      disablePadding:false
    },
    {
      id:'Processing Status',
      label:'Processing Status',
      disablePadding:true
    },
  ]
}
function ListItemLink({icon}) {
        switch (icon) {
        case "GraphicEqIcon":
          return <GraphicEqIcon className="icon" />;
        case "VerticalSplitIcon":
          return <VerticalSplitIcon  className="icon"/>;
        case "InsertChartIcon":
          return <InsertChartIcon className="icon"/>;
        case "TimelineIcon":
          return <TimelineIcon className="icon"/>;
        case "BubbleChartIcon":
          return <BubbleChartIcon className="icon"/>;
        case "ViewWeekIcon":
          return <ViewWeekIcon className="icon"/>;
        case "BarChartIcon":
          return <BarChartIcon className="icon"/>;
        case "GetAppIcon":
          return <GetAppIcon className="icon"/>;
        case "CodeIcon":
          return <CodeIcon className="icon"/>;
        case "AssignmentReturnedIcon":
          return <AssignmentReturnedIcon className="icon"/>;
        default:
          return <AssignmentReturnedIcon className="icon"/>;
      }
}

const useStyles = makeStyles(() => ({
	card: {
		margin: 20,
		padding: 20
	},
    contentView:{
        margin:20
    },
    description:{
        paddingTop:20,
        color:'rgb(120,120,120)',
        fontSize:16
    }
}));

function UrgentemLanding() {
	const classes = useStyles();
  const dispatch = useDispatch();

  const [uploadedPortfolio,setUploadedPortfolio]=useState([])
	const auth = useSelector((state) => state.auth);

	let currentUser = auth && auth.currentUser ? auth.currentUser : {};

  

  const getUploadPortfolios=async()=>{
    try{
      let response= await axios.get(`${actionTypes.API_URL}/statuses/portfolios_new/${currentUser.client}`)

      if(response.data.status == 'Success'){
        const portfolios=response.data.Portfolios
        let result=[]
        portfolios.map(portfolio=>{
          result.push({
            name:portfolio['Portfolio Name'],
            date:portfolio['Processed Date and Time'],
            emission:portfolio['% of Portfolio Covered by Emissions data']
          })
        })
        setUploadedPortfolio(result)
      }
      else{
        setUploadedPortfolio([])
      }
    }
    catch(error){
      setUploadedPortfolio([])
    }
  }
  useEffect(() => {
      getUploadPortfolios();
  }, []);

  const headCells=getHeadCells();

  console.log("uploadedPortfolio",uploadedPortfolio)

	return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={3}>
                    {
                        configs.map((config) => (
                            <Card className={classes.card}>
                                <Box display="flex" flexDirection="row" >
                                    <Typography variant="h6" style={{ color: 'black', fontFamily: 'Helvetica', paddingBottom: 10 }}>
                                        {config.name}
                                    </Typography>
                                    <ListItemLink icon={config.icon} />
                                </Box>
                                <Typography variant="p" style={{ color: 'rgb(120,120,120)', fontFamily: 'Helvetica' }}>
                                    {config.content}
                                </Typography>
                            </Card>
                        ))
                    }
                </Grid>
                <Grid item xs={8} className={classes.contentView}>
                    <Typography align="center" variant="h4">Welcome to the Urgentem Element 6TM Platform.</Typography>
                    <Typography  variant="h6" className={classes.description}>Upload and select your portfolio and benchmark. Navigate our climate portfolio analytics to: calculate the portfolio carbon footprint, backtest low carbon investment strategies and identify securities with high exposure to carbon risk.</Typography>
                    <Box mt={2}>
                        <AdvancedTable
                        rows={
                          uploadedPortfolio
                        }
                        headCells={
                          headCells
                        }
                        />
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default UrgentemLanding;
