/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress, Grid, InputLabel, FormControl, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getCompanies, getCompanyProfileData } from '../../redux/actions/flmActions';
import getRequestData from '../../util/RequestData';
import DataTable from '../../components/Table/DataTable';
import LineChart from '../../components/ChartsComponents/Line';
import { companyProfileCells } from '../../util/TableHeadConfig';

const useStyles = makeStyles(() => ({
	formControl: {
		width: 300,
		margin: 15
	}
}));

const CompanyProfile = () => {
	const dispatch = useDispatch();

	const companyProfile = useSelector((state) => state.flm.companyProfile);
	const companyData = useSelector((state) => state.flm.companyData);
	const auth = useSelector((state) => state.auth);
	const { loading, filterItem } = auth;
	const { portScenario } = filterItem;
	const classes = useStyles();

	const [ chartData, setChartData ] = useState([]);
	const [ tableData, setTableData ] = useState([]);
	const [ companyList, setCompanyList ] = useState([]);
	const [ sectorList, setSectorList ] = useState([]);
	const [ currentCompany, setCurrentCompany ] = useState('');
	const [ currentSector, setCurrentSector ] = useState('');
    const [ companyName , setCompanyName] = useState ('')

	useEffect(() => {
		fetchCompanies();
	}, []);
	useEffect(
		() => {
			getCompanyList();
		},
		[ companyData ]
	);
	const getCompanyList = async () => {
		const response = companyData['data'];
		if (response && Object.keys(response).length > 0) {
			const sectors = Object.keys(response);
			const companies = response[sectors[0]];
			const currentCompany = companies[0]['company_id'];

			setSectorList(sectors);
			setCompanyList(companies);
			setCurrentSector(sectors[0]);
			setCurrentCompany(currentCompany);

			await fetchDetails(currentCompany);
		}
	};

	useEffect(
		() => {
			if (companyProfile && companyProfile['data'] && Object.keys(companyProfile['data']).length > 0) {
				getData();
			}
		},
		[ companyProfile ]
	);

	const fetchCompanies = async () => {
		const data = getRequestData('COMPANY_PROFILE_COMPANIES', auth);
		await dispatch(getCompanies(data));
	};
	const fetchDetails = async (companyId) => {
		let data = getRequestData('COMPANY_PROFILE', auth);
		data = {
			...data,
			isin: companyId
		};
		await dispatch(getCompanyProfileData(data));
	};

	const getData = () => {
		const chartResponse = companyProfile['data']['CompanyProfile']['Chart'];
		const tableResponse = companyProfile['data']['CompanyProfile']['Summary'];

		let chartData = [];
		let tableData = [];
		let twoDegrees = [];
		let beyondTwoDegree = [];
		let referenceTech = [];
		let companyValues = [];
		let lowEnergyDemand = [];
		let companyName = '';

		if (chartResponse && chartResponse.length > 0) {
			chartResponse.map((res, index) => {
				let values = [];
				Object.keys(res).map((key) => {
					values = [ Date.UTC(key, '01', '01'), res[key] ];
					if (res['Scenario'] === '2 Degrees') {
						twoDegrees.push(values);
					}
					if (res['Scenario'] === 'Beyond 2 Degrees') {
						beyondTwoDegree.push(values);
					}
					if (res['Scenario'] === 'Reference Technology') {
						referenceTech.push(values);
					}
					if (res['Scenario'] === portScenario) {
						lowEnergyDemand.push(values);
					}
					if (index === chartResponse.length - 1) {
						companyValues.push(values);
						companyName = res['Scenario'];
					}
				});
			});
			chartData = [
				{
					name: 'Two Degrees',
					data: twoDegrees
				},
				{
					name: 'Beyond Two Degrees',
					data: twoDegrees
				},
				{
					name: 'Reference Technology',
					data: referenceTech
				},
				{
					name: companyName,
					data: companyValues
				},
				{
					name: portScenario,
					data: lowEnergyDemand
				}
			];
		}

		if (tableResponse && Object.keys(tableResponse).length > 0) {
			tableData = [
				{
					name: 'Name',
					summary: tableResponse['Name']
				},
				{
					name: 'Sector',
					summary: tableResponse['SASBSector']
				},
				{
					name: 'Disclosure Scope 1+2 Category',
					summary: tableResponse['DisclosureScope12Category'] ? tableResponse['DisclosureScope12Category'] : 'NA'
				},
				{
					name: 'Number of Scope 3 Categories Disclosed',
					summary: tableResponse['DisclosureNumberofS3Categories'] ? tableResponse['DisclosureNumberofS3Categories'] : 'NA'
				},
				{
					name: 'Emissions Intensity Scope 1+2+3 (tCO2e/m Revenue)',
					summary: tableResponse['intensityS123'] ? tableResponse['intensityS123'] : 'NA'
				},
				{
					name: 'Emissions Intensity Scope 1+2 (tCO2e/m Revenue)',
					summary: tableResponse['intensityS12'] ? tableResponse['intensityS12'] : 'NA'
				},
				{
					name: 'Intensity Momentum Scope 1+2 (tCO2e/m Revenue)',
					summary: tableResponse['momentum'] ? tableResponse['momentum'] : 'NA'
				}
			];
		}

		setChartData(chartData);
		setTableData(tableData);
        setCompanyName(companyName)
	};
	const handleSectorChange = async (e) => {
		const sector = e.target.value;
		const response = companyData['data'];
		const companyList = response[sector];
		const currentCompany = companyList[0]['company_id'];

		setCurrentSector(sector);
		setCompanyList(companyList);
		setCurrentCompany(currentCompany);

		await fetchDetails(currentCompany);
	};
	const handleCompanyChange = async (event) => {
		const companyId = event.target.value;
		setCurrentCompany(companyId);

		await fetchDetails(companyId);
	};
	return (
		<React.Fragment>
			{loading ? (
				<CircularProgress />
			) : companyData.error ? (
				companyData.error
			) : companyProfile.error ? (
				<Box align="center" className="error-msg" style={{ marginTop: 20, fontSize: 16 }}>
					{companyProfile.error}
				</Box>
			) : (
				<Box>
					<Grid container>
						<Grid item xs={4}>
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel>Select Sector</InputLabel>
								<Select label="Select Sector" value={currentSector} onChange={handleSectorChange}>
									{sectorList.length > 0 &&
										sectorList.map((sector) => <MenuItem value={sector}>{sector}</MenuItem>)}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel>Select Company</InputLabel>
								<Select label="Select Sector" value={currentCompany} onChange={handleCompanyChange}>
									{companyList.length > 0 &&
										companyList.map((company) => (
											<MenuItem value={company.company_id}>{company.name}</MenuItem>
										))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={8}>
							<LineChart
								data={chartData}
								chartKey="COMPANY_PROFILE"
								chartTitle={`${companyName} Profile`}
								isCustomHeight={true}
							/>
						</Grid>
						<Grid item xs={4}>
							<DataTable data={tableData} columns={companyProfileCells} tableHeading="COMPANY_PROFILE" />
						</Grid>
					</Grid>
				</Box>
			)}
		</React.Fragment>
	);
};

export default CompanyProfile;
