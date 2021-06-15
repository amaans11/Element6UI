/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import {  useSelector } from 'react-redux';
import { Card, Typography, Box, Grid } from '@material-ui/core';
import axios from 'axios';
import * as actionTypes from '../../redux/actionTypes';
import { makeStyles } from '@material-ui/core/styles';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import TimelineIcon from '@material-ui/icons/Timeline';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import GetAppIcon from '@material-ui/icons/GetApp';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import BarChartIcon from '@material-ui/icons/BarChart';
import CodeIcon from '@material-ui/icons/Code';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import configs from '../../util/landing-page.config';
import DataTable from '../../components/Table/DataTable';

function getHeadCells() {
	return [
		{
			name: 'Portfolio Name',
			selector: 'Portfolio Name',
			sortable: true,
			wrap: true,
			right: false
		},
		{
			name: 'Fundamentals Data Coverage (%)',
			selector: '% of Portfolio Processed',
			sortable: true,
			right: true
		},
		{
			name: 'Price Data Coverage (%)',
			selector: '% of Portfolio Covered by Emissions data',
			sortable: true,
			right: true
		},
		{
			name: 'Portfolio Name',
			selector: '% of Portfolio Covered by Price data',
			sortable: true,
			right: true
		},
		{
			name: 'Processed Date',
			selector: 'Processed Date and Time',
			sortable: true,
			right: true,
			wrap: true
		},
		{
			name: 'Processing Status',
			selector: 'Processing Status',
			sortable: true,
			right: true
		}
	];
}
function ListItemLink({ icon }) {
	switch (icon) {
		case 'GraphicEqIcon':
			return <GraphicEqIcon className="icon" />;
		case 'VerticalSplitIcon':
			return <VerticalSplitIcon className="icon" />;
		case 'InsertChartIcon':
			return <InsertChartIcon className="icon" />;
		case 'TimelineIcon':
			return <TimelineIcon className="icon" />;
		case 'BubbleChartIcon':
			return <BubbleChartIcon className="icon" />;
		case 'ViewWeekIcon':
			return <ViewWeekIcon className="icon" />;
		case 'BarChartIcon':
			return <BarChartIcon className="icon" />;
		case 'GetAppIcon':
			return <GetAppIcon className="icon" />;
		case 'CodeIcon':
			return <CodeIcon className="icon" />;
		case 'AssignmentReturnedIcon':
			return <AssignmentReturnedIcon className="icon" />;
		default:
			return <AssignmentReturnedIcon className="icon" />;
	}
}

const useStyles = makeStyles(() => ({
	card: {
		margin: 20,
		padding: 20
	},
	contentView: {
		margin: 20
	},
	description: {
		paddingTop: 20,
		color: 'rgb(120,120,120)',
		fontSize: 16
	}
}));

function UrgentemLanding({ history }) {
	const classes = useStyles();

	const [ uploadedPortfolio, setUploadedPortfolio ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	const auth = useSelector((state) => state.auth);

	let currentUser = auth && auth.currentUser ? auth.currentUser : {};

	
	useEffect(() => {
		const getUploadPortfolios = async () => {
			try {
				setLoading(true);
				let response = await axios.get(`${actionTypes.API_URL}/statuses/portfolios_new/${currentUser.client}`);
	
				if (response.data.status === 'Success') {
					const portfolios = response.data.Portfolios;
					setUploadedPortfolio(portfolios);
					setLoading(false);
				} else {
					setUploadedPortfolio([]);
					setLoading(false);
				}
			} catch (error) {
				setUploadedPortfolio([]);
				setLoading(false);
			}
		};
		getUploadPortfolios();
	}, []);

	const handleClick = (config) => {
		switch (config.name) {
			case 'Portfiolio Fooprint':
				history.push('/portfolio-footprint');
				break;
			case 'Scope 3 Materiality':
				history.push('/scope3-materiality');
				break;
			case 'Portfiolio Optimization':
				history.push('/portfolio-optimization');
				break;
			case 'Portfiolio Carbon Risk':
				history.push('/portfolio-carbon-risk');
				break;
			case 'Temperature Metric':
				history.push('/temperature-metric');
				break;
			case 'Forward Looking Analysis':
				history.push('/forward-looking-analysis');
				break;
			case 'Stranded Asset Analysis':
				history.push('/stranded-assets-analysis');
				break;
			default:
				history.push('/portfolio-footprint');
				break;
		}
	};
	const headCells = getHeadCells();

	return (
		<React.Fragment>
			<Grid container>
				<Grid item xs={3}>
					{configs.map((config) => (
						<span  onClick={() => handleClick(config)}>
							<Card className={classes.card}>
							<Box display="flex" flexDirection="row">
								<Typography variant="h6" style={{ fontFamily: 'Helvetica', paddingBottom: 10 }}>
									{config.name}
								</Typography>
								<ListItemLink icon={config.icon} />
							</Box>
							<Typography variant="p" style={{ fontFamily: 'Helvetica' }}>
								{config.content}
							</Typography>
						</Card>
						</span>
					))}
				</Grid>
				<Grid item xs={8} className={classes.contentView}>
					<Typography align="center" variant="h4">
						Welcome to the Urgentem Element 6TM Platform.
					</Typography>
					<Typography variant="h6" className={classes.description}>
						Upload and select your portfolio and benchmark. Navigate our climate portfolio analytics to:
						calculate the portfolio carbon footprint, backtest low carbon investment strategies and identify
						securities with high exposure to carbon risk.
					</Typography>
					<Box mt={2}>
						<DataTable
							data={uploadedPortfolio}
							columns={headCells}
							tableHeading="UPLOAD_PORTFOLIO"
							loading={loading}
						/>
					</Box>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
export default UrgentemLanding;
