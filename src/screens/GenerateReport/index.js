import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Grid, Typography, Box, FormControlLabel, Checkbox,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {generateReport} from '../../redux/actions/authActions'
import getRequestData from '../../util/RequestData'
import { NotificationManager } from 'react-notifications';

const useStyles = makeStyles(() => ({
	description: {
		paddingTop: 20,
		color: 'rgb(120,120,120)',
		fontSize: 16
	}
}));
const GenerateReport = ({}) => {
	const classes = useStyles();
    const  dispatch = useDispatch()

    const auth = useSelector((state) => state.auth);
    const {isVisible}=auth

	const [ options, setOptions ] = useState([]);

	const handleCheckboxChange = (key, value) => {
		let list = [ ...options ];
		if (value) {
			list = [ ...list, key ];
		} else {
			const index = list.indexOf(key);
			list.splice(index, 1);
		}
		setOptions(list);
	};
    const handleSubmit=async()=>{
        let data = getRequestData('GENERATE_REPORT', auth);

        data={
            ...data,
            pages:options
        }
        await dispatch(generateReport(data))
        NotificationManager.success("Your report is being processed and will be emailed to you shortly.")
    }

	return (
		<Grid container>
			{isVisible && <Grid item xs={3} />}
			<Grid item xs={isVisible ? 9 : 12}>
				<Box m={4}>
					<Typography align="center" variant="h4">
						Generate your portfolio Urgentem report
					</Typography>
					<Typography variant="h6" className={classes.description}>
						Generate an Urgentem Portfolio Climate Report. This report contains key portfolio, sector and
						security-level emissions analysis. Metrics include emissions footprint, intensity, attribution,
						science-based scenarios and forward-looking analytics.
					</Typography>
					<Box mt={2}>
						<FormControlLabel
							control={
								<Checkbox
									name="footprint"
									onChange={(e) => {
										handleCheckboxChange(1, e.target.checked);
									}}
								/>
							}
							label="Portfolio Footprint"
						/>
						<FormControlLabel
							control={
								<Checkbox
									name="sectoral"
									onChange={(e) => {
										handleCheckboxChange(2, e.target.checked);
									}}
								/>
							}
							label="Sectoral Analysis"
						/>
						<FormControlLabel
							control={
								<Checkbox
									name="disclosure"
									onChange={(e) => {
										handleCheckboxChange(3, e.target.checked);
									}}
								/>
							}
							label="Disclosure"
						/>
						<FormControlLabel
							control={
								<Checkbox
									name="forward"
									onChange={(e) => {
										handleCheckboxChange(4, e.target.checked);
									}}
								/>
							}
							label="Forward Looking Metrics: Portfolio Alignment and Target Setting"
						/>
						<FormControlLabel
							control={
								<Checkbox
									name="sovFootprint"
									onChange={(e) => {
										handleCheckboxChange(5, e.target.checked);
									}}
								/>
							}
							label="Sovereign Footprint"
						/>
						<FormControlLabel
							control={
								<Checkbox
									name="avoidedEmis"
									onChange={(e) => {
										handleCheckboxChange(6, e.target.checked);
									}}
								/>
							}
							label="Avoided Emissions"
						/>
						<FormControlLabel
							control={
								<Checkbox
									name="fossilFuel"
									onChange={(e) => {
										handleCheckboxChange(7, e.target.checked);
									}}
								/>
							}
							label="Fossil Fuel Reserves Footprint"
						/>
						<FormControlLabel
							control={
								<Checkbox
									name="tempMetric"
									onChange={(e) => {
										handleCheckboxChange(8, e.target.checked);
									}}
								/>
							}
							label="Temperature Metric: Portfolio Temperature Score"
						/>
						<Box mt={2}>
                        <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>
							Generate Report
						</Button>
                        </Box>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default GenerateReport;
