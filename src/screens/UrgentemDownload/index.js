/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Grid, Box, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import SelectwithSearch from '../../components/Autocomplete';
import { getDownloadPortfolios, getDownloadDetails } from '../../redux/actions/authActions';
import DataTable from '../../components/Table/DataTable';

function UrgentemDownload() {
	const dispatch = useDispatch();
	const [ summary, setSummary ] = useState(true);
	const [ averageIntensity, setAverageIntensity ] = useState(false);
	const [ reportedIntensity, setReportedIntensity ] = useState(false);
	const [ reportedEmissions, setReportedEmissions ] = useState(false);
	const [ absoluteEmission, setAbsoluteEmission ] = useState(false);
	const [ selectedPortfolio, setPortfolio ] = useState({});
	const [ columns, setColumns ] = useState([]);
	const [ portfolioList, setPortfolioList ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	const isVisible = useSelector((state) => state.auth.isVisible);
	const auth = useSelector((state) => state.auth);

	const { downloadPortfolioList, downloadData, userInfo } = auth;

	const yearEmissions = userInfo.year && userInfo.year.emissions ? userInfo.year.emissions : '2019';

	const onPortfolioChange = async (currentValue) => {
		let portfolio = {};
		if (portfolioList && portfolioList.length > 0) {
			portfolioList.map((port) => {
				if (port.label === currentValue) {
					portfolio = { ...port };
				}
			});
		}
		setPortfolio({ ...portfolio });
		await getDownloadData(portfolio);
	};
	const handleSelectAll = async (e) => {
		const value = e.target.checked;
		setAverageIntensity(value);
		setReportedIntensity(value);
		setReportedEmissions(value);
		setAbsoluteEmission(value);
	};
	const handleSubmit = async () => {
		await getDownloadData(selectedPortfolio);
	};

	const fetchDetails = async () => {
		await dispatch(getDownloadPortfolios());
	};
	const getSelectedField = () => {
		let value = '';
		if (summary) {
			value += 'summary;';
		}
		if (averageIntensity) {
			value += 'avg_int_cols;';
		}
		if (reportedIntensity) {
			value += 'rep_int_cols;';
		}
		if (reportedEmissions) {
			value += 'rep_emis_cols;';
		}
		if (absoluteEmission) {
			value += 'absolute_avg;';
		}
		if (summary && averageIntensity && reportedIntensity && reportedEmissions && absoluteEmission) {
			value = 'all';
		}
		return value;
	};
	const getDownloadData = async (currentPortfolio) => {
		setLoading(true);
		const selectedField = getSelectedField();
		const data = {
			portfolio_id: currentPortfolio.value,
			version_portfolio: currentPortfolio.version,
			field: selectedField,
			year: yearEmissions
		};
		await dispatch(getDownloadDetails(data));
		setLoading(false);
	};
	const getTableColumns = () => {
		let res = [];
		if (downloadData && downloadData.length > 0) {
			let columns = Object.keys(downloadData[0]);

			res = columns.map((column, index) => {
				if (index === 0) {
					return {
						name: column,
						selector: column,
						sortable: true,
						right: false,
						wrap: true,
						style: {
							height: 80,
							fontSize: 14
						}
					};
				} else {
					return {
						name: column,
						selector: column,
						sortable: true,
						right: true,
						wrap: true,
						style: {
							height: 80
						},
						cell: (row) => {
							let res = '';
							if (typeof row[column] === 'number') {
								if (row[column] === '-999999' || row[column] === '999999') {
									res = 'NA';
								} else {
									res = row[column];
								}
							} else {
								if (row[column]) {
									res = row[column];
								} else {
									res = 'NA';
								}
							}
							return res;
						}
					};
				}
			});
		}
		setColumns(res);
	};
	const getPortfolioData = async() =>{
		const portfolioList = [];
			let currentPortfolio = {};
			if (downloadPortfolioList && downloadPortfolioList.length > 0) {
				downloadPortfolioList.map((portfolio, index) => {
					if (index === 0) {
						currentPortfolio = {
							label: portfolio['name'],
							value: portfolio['portfolio_id'],
							version: portfolio['version']
						};
					}
					portfolioList.push({
						label: portfolio['name'],
						value: portfolio['portfolio_id'],
						version: portfolio['version']
					});
				});
			}
			setPortfolioList(portfolioList);
			setPortfolio(currentPortfolio);
			await getDownloadData(currentPortfolio); 
	}
	useEffect(
		() => {
			getTableColumns();
		},
		[ downloadData ]
	);
	useEffect(
		() => {
			getPortfolioData()
		},
		[ downloadPortfolioList ]
	);

	useEffect(() => {
		fetchDetails();
	}, []);
	console.log("selectedPortfolio",selectedPortfolio)

	return (
		<React.Fragment>
			<Grid container>
				{isVisible && <Grid item xs={3} />}
				<Grid item xs={isVisible ? 9 : 12}>
					<Box>
						<Typography align="center" variant="h4" style={{ marginTop: 30 }}>
							Urgentem Emissions Data Download
						</Typography>
						<Box m={2}>
							<Box mb={2}>
								<SelectwithSearch
									heading={'Select Portfolio'}
									data={portfolioList && portfolioList.length > 0 ? portfolioList : []}
									handleChange={onPortfolioChange}
									type="portfolio"
									currentValue={selectedPortfolio}
								/>
							</Box>
							<Grid container>
								<Grid item xs={9}>
									<FormControlLabel
										control={
											<Checkbox
												checked={summary}
												onChange={() => {
													setSummary(!summary);
												}}
												value="summary"
											/>
										}
										label="Summary data"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={averageIntensity}
												onChange={() => {
													setAverageIntensity(!averageIntensity);
												}}
												value="averageIntensity"
											/>
										}
										label="Average Intensity"
									/>

									<FormControlLabel
										control={
											<Checkbox
												checked={reportedIntensity}
												onChange={() => {
													setReportedIntensity(!reportedIntensity);
												}}
												value="reportedIntensity"
											/>
										}
										label="Reported Intensity"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={reportedEmissions}
												onChange={() => {
													setReportedEmissions(!reportedEmissions);
												}}
												value="reportedEmissions"
											/>
										}
										label="Reported Emissions"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={absoluteEmission}
												onChange={() => {
													setAbsoluteEmission(!absoluteEmission);
												}}
												value="absoluteEmission"
											/>
										}
										label="Absolute Emissions Average"
									/>

									<FormControlLabel
										control={
											<Checkbox
												// checked={selectAll}
												onChange={handleSelectAll}
												value="selectAll"
											/>
										}
										label="Selected All"
									/>
								</Grid>
								<Grid item xs={2}>
									{auth.userInfo && Object.keys(auth.userInfo).length > 0 && auth.userInfo.Trial ? (
										<Button size="large" disabled="true" variant="contained" color="primary">
											Submit
										</Button>
									) : (
										<Button size="large" variant="contained" color="primary" onClick={handleSubmit}>
											Submit
										</Button>
									)}
								</Grid>
							</Grid>
						</Box>
						<DataTable data={downloadData} columns={columns} tableHeading="DOWNLOAD" isScroll={true}
						loading={loading}
						/>
					</Box>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
export default UrgentemDownload;
