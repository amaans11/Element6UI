/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterTags from './tags';
import data from '../../util/filter-config';
import filterConfig from '../../util/tabs-filter-config';
import { setFilterItem, setFilterVisibility } from '../../redux/actions/authActions';

const filterRes={
	'SASB': 'SASB',
	'GICS':'GICS',
	'WeightAvgRev':'Weighted Average Intensity (Revenue)',
	'WeightAvgMarketVal':'Weighted Average Intensity (Market Value)',
	'TotalCarbEmis':'Total Carbon Emissions',
	'CarbIntensityMarketVal':'Portfolio Carbon Intensity (Revenue)',
	'CarbIntensityRev':'Portfolio Carbon Intensity (Market Value)',
	'MarketCap':'Market Capitalization',
	'MarketCapDebt':'Market Capitalization + Total Debt',
	'Debt':'Total Debt',
	'EnterpriseVal':'Enterprise Value',
	'EnterpriseValCash':'Enterprise Value Including Cash',
	'Eq':'Equity',
	'CB':'Corporate Bonds',
	'EqCB':'Equity + Corporate Bonds',
	'Avg':'Average',
	'Max':'Maximum',
	'Sc12':'Scope 1+2',
	'Sc123':'Scope 1+2+3',
	'Sc3':'Scope 3',
	'matPort':'Portfolio',
	'matSector':'Sector',
	'momentum':'Carbon Momentum',
	'emissions_reduction':'Emissions Reduction',
	'5':'5 Year Return',
	'3':'3 Year Return',
	'1':'1 Year Return',
	'5Y':'5 Years',
	'3Y':'3 Years',
	'1Y':'1 Year',
	'WATS':'Weighted Average',
	'TETS':'Total Emissions',
	'MOTS':'Market Owned Emissions',
	'EOTS':'Enterprise Owned Emissions',
	'ECOTS':'Enterprise Value Including Cash Emissions',
	'ROTS':'Revenue Owned Emissions',
	'0':'None',
	'1':'All companies without targets set a 2 degree target',
	'2':'All companies without targets set a 1.75 degree target',
	'3':'Enterprise Owned Emissions Weighted Temperature Score',
	'4':'Top 10 contributors set 2 degrees targets',
	'5':'Top 10 contributors set 1.75 degree targets',
	'shortTerm':'Short Term Score',
	'midTerm':'Mid Term Score',
	'longTerm':'Long Term Score',
	'0.50':'0.50',
	'1.00':'1.00',
	'1.50':'1.50',
	'2.00':'2.00',
	'2.50':'2.50',
	'3.00':'3.00',
	'3.20':'3.20',
	'3.50':'3.50',
	'4.00':'4.00',
	'4.50':'4.50',
	'5.00':'5.00',
	'SSP126':'SSP1',
	'SSP226':'SSP2',
	'LowEnergyDemand':'Low Energy Demand',
	'MarketShare':'Market Share',
	'RelativeAlignment':'Relative Alignment',
	'2020':'2020',
	'2030':'2030',
	'2040':'2040',
	'2050':'2050',
	'2060':'2060',
	'SSP126':'SSP1-26',
	'SSP226':'SSP2-26',
	'LowEnergyDemand':'Low Energy Demand',
	'SSP426':'SSP4-26',
	'SSP526':'SSP5-26',
	'Beyond2':'Beyond 2 Degrees',
	'2':'2 Degrees',
	'ReferenceTechnology':'Reference Technology',
	'Current policies (Hot house world, Rep)':'Current policies (Hot house world, Rep)',
	'Immediate 2C with CDR (Orderly, Rep)':'Immediate 2C with CDR (Orderly, Rep)',
	'Delayed 2C with CDR (Disorderly, Alt)':'Delayed 2C with CDR (Disorderly, Alt)',
	'Immediate 1.5C with CDR (Orderly, Alt)':'Immediate 1.5C with CDR (Orderly, Alt)',
	'Immediate 1.5C with limited CDR (Disorderly, Alt)':'Immediate 1.5C with limited CDR (Disorderly, Alt)',
	'Immediate 1.5C with limited CDR (Disorderly, Alt)':'Immediate 1.5C with limited CDR (Disorderly, Alt)',
	'Nationally determined contributions (NDCs) (Hot house world, Alt)':'Nationally determined contributions (NDCs) (Hot house world, Alt)',
}
export default function FilterGroup() {
	const [ filterData, setFilterData ] = useState(data);
	const [ configs, setConfigs ] = useState([]);

	const dispatch = useDispatch();

	const moduleName = useSelector((state) => state.auth.moduleName);
	const tabValue = useSelector((state) => state.auth.tabValue);
	const filterItem = useSelector((state) => state.auth.filterItem);

	const { targetScenario } = filterItem;
	const getConfigs = () => {
		let config = [];
		switch (moduleName) {
			case 'Emissions':
				switch (tabValue) {
					case 0:
						config = filterConfig['PORTFOLIO_EMISSION'];
						break;
					case 1:
						config = filterConfig['CARBON_EMISSION'];
						break;
					case 2:
						config = filterConfig['SOVEREIGN_FOOTPRINT'];
						break;
					case 3:
						config = filterConfig['CARBON_ATTRIBUTION'];
						break;
					case 4:
						config = filterConfig['DISCLOSURE'];
						break;
					case 5:
						config = filterConfig['AVOIDED_EMISSION'];
						break;
					default:
						config = filterConfig['PORTFOLIO_EMISSION'];
						break;
				}
				break;
			case 'Scope3':
				switch (tabValue) {
					case 0:
						config = filterConfig['SCOPE3_HEATMAP'];
						break;
					case 1:
						config = filterConfig['SECTORAL_SCOPE3_HEATMAP'];
						break;
					default:
						config = filterConfig['SCOPE3_HEATMAP'];
						break;
				}
				break;
			case 'Optimization':
				switch (tabValue) {
					case 0:
						config = filterConfig['PORTFOLIO_OPTIMIZATION'];
						break;
					case 1:
						config = filterConfig['PERFORMANCE_ATTRIBUTION'];
						break;
					default:
						config = filterConfig['PORTFOLIO_OPTIMIZATION'];
						break;
				}
				break;
			case 'Carbon risk':
				config = filterConfig['PORTFOLIO_CARBON_RISK'];
				break;
			case 'Stranded':
				switch (tabValue) {
					case 0:
						config = filterConfig['FOSSIL_FUEL'];
						break;
					case 1:
						config = filterConfig['COAL_POWER'];
						break;
					default:
						config = filterConfig['FOSSIL_FUEL'];
						break;
				}
				break;

			case 'Temp score':
				switch (tabValue) {
					case 0:
						config = filterConfig['PORTFOLIO_TEMP_SCORE'];
						break;
					case 1:
						config = filterConfig['COMPANY_ANALYSIS'];
						break;
					case 2:
						config = filterConfig['ATTRIBUTION'];
						break;
					case 3:
						config = filterConfig['CONTRIB_ANALYSIS'];
						break;
					case 4:
						config = filterConfig['HEATMAP'];
						break;
					default:
						config = filterConfig['PORTFOLIO_TEMP_SCORE'];
						break;
				}
				break;
			case 'Download':
				config = filterConfig['URGENTEM_DOWNLOAD'];
				break;
			case 'Report':
				config = filterConfig['GENERATE_REPORT'];
				break;
			case 'FLM':
				switch (tabValue) {
					case 0:
						config = filterConfig['PORTFOLIO_ALIGNMENT'];
						break;
					case 1:
						config = filterConfig['TARGET_SETTING'];
						break;
					case 2:
						config = filterConfig['COMPANY_PROFILE'];
						break;
					case 3:
						config = filterConfig['CARBON_ADJUSTED_RETURNS'];
						break;
					default:
						config = filterConfig['PORTFOLIO_ALIGNMENT'];
						break;
				}
				break;
				case 'Api':
					config=filterConfig['URGENTEM_API']
					break;
			default:
				switch (tabValue) {
					case 0:
						config = filterConfig['PORTFOLIO_EMISSION'];
						break;
					case 1:
						config = filterConfig['CARBON_EMISSION'];
						break;
					case 2:
						config = filterConfig['SOVEREIGN_FOOTPRINT'];
						break;
					case 3:
						config = filterConfig['CARBON_ATTRIBUTION'];
						break;
					case 4:
						config = filterConfig['DISCLOSURE'];
						break;
					case 5:
						config = filterConfig['AVOIDED_EMISSION'];
						break;
					default:
						config = filterConfig['PORTFOLIO_EMISSION'];
						break;
				}
		}
		setConfigs(config);
	};
	const getEmission = (tagName) => {
		switch (moduleName) {
			case 'Emissions':
				switch (tagName) {
					case 'Sc12':
						return true;
					case 'Sc123':
						return true;
					case 'Sc3':
						return false;
					default:
						return true;
				}
			case 'Scope3':
				switch (tagName) {
					case 'Sc12':
						return false;
					case 'Sc123':
						return true;
					case 'Sc3':
						return true;
					default:
						return true;
				}
			case 'Optimization':
				switch (tagName) {
					case 'Sc12':
						return true;
					case 'Sc123':
						return true;
					case 'Sc3':
						return true;
					default:
						return true;
				}
			case 'Temp score':
				switch (tagName) {
					case 'Sc12':
						return true;
					case 'Sc123':
						return true;
					case 'Sc3':
						return true;
					default:
						return true;
				}
			default:
				switch (tagName) {
					case 'Sc12':
						return true;
					case 'Sc123':
						return true;
					case 'Sc3':
						return false;
					default:
						return true;
				}
		}
	};
	const getFootprintMetric = (tagName) => {
		switch (moduleName) {
			case 'FLM':
				switch (tagName) {
					case 'WeightAvgRev':
						return true;
					case 'WeightAvgMarketVal':
						return true;
					case 'TotalCarbEmis':
						return true;
					case 'CarbIntensityMarketVal':
						return false;
					case 'CarbIntensityRev':
						return false;
					default:
						return true;
				}
			default:
				switch (tagName) {
					case 'WeightAvgRev':
						return true;
					case 'WeightAvgMarketVal':
						return true;
					case 'TotalCarbEmis':
						return true;
					case 'CarbIntensityMarketVal':
						return true;
					case 'CarbIntensityRev':
						return true;
					default:
						return true;
				}
		}
	};
	const getWarmingScenario = (tagName) => {
		switch (targetScenario) {
			case 'IPCC':
				switch (tagName) {
					case 'SSP126':
						return true;
					case 'SSP226':
						return true;
					case 'LowEnergyDemand':
						return true;
					case 'SSP426':
						return true;
					case 'SSP526':
						return true;
					default:
						return false;
				}
			case 'IEA':
				switch (tagName) {
					case 'Beyond2':
						return true;
					case '2':
						return true;
					case 'ReferenceTechnology':
						return true;
					default:
						return false;
				}
			case 'NGFS':
				switch (tagName) {
					case 'Current policies (Hot house world, Rep)':
						return true;
					case 'Immediate 2C with CDR (Orderly, Rep)':
						return true;
					case 'Delayed 2C with CDR (Disorderly, Alt)':
						return true;
					case 'Immediate 1.5C with CDR (Orderly, Alt)':
						return true;
					case 'Immediate 1.5C with limited CDR (Disorderly, Alt)':
						return true;
					case 'Immediate 2C with limited CDR (Orderly, Alt)':
						return true;

					case 'Nationally determined contributions (NDCs) (Hot house world, Alt)':
						return true;
					case 'Delayed 2C with limited CDR (Disorderly, Rep)':
						return true;

					default:
						return false;
				}
			default:
				switch (tagName) {
					case 'SSP126':
						return true;
					case 'SSP226':
						return true;
					case 'LowEnergyDemand':
						return true;
					case 'SSP426':
						return true;
					case 'SSP526':
						return true;
					default:
						return false;
				}
		}
	};

	const updateTags = (grpindex, tagindex, selected) => {
		const newData = [ ...data ];
		if (selected) {
			// eslint-disable-next-line
			newData[grpindex].tagsList.map((tags) => {
				tags.selected = false;
			});
			newData[grpindex].tagsList[tagindex].selected = selected;
			setFilterData(newData);

			const grpName = newData[grpindex].grpKey;

			dispatch(
				setFilterItem({
					key: grpName,
					value: newData[grpindex].tagsList[tagindex].value
				})
			);
		}
		if (newData[grpindex]['grpKey'] === 'targetScenario') {
			const scenarioVal = newData[grpindex].tagsList[tagindex].value;
			switch (scenarioVal) {
				case 'IPCC':
					dispatch(
						setFilterItem({
							key: 'warmingScenario',
							value: 'LowEnergyDemand'
						})
					);
					break;
				case 'IEA':
					dispatch(
						setFilterItem({
							key: 'warmingScenario',
							value: 'Beyond2'
						})
					);
					break;
				case 'NGFS':
					dispatch(
						setFilterItem({
							key: 'warmingScenario',
							value: 'Current policies (Hot house world, Rep)'
						})
					);
					break;
				default:
					dispatch(
						setFilterItem({
							key: 'warmingScenario',
							value: 'LowEnergyDemand'
						})
					);
					break;
			}
		}
	};
	useEffect(
		() => {
			getConfigs();
		},

		[ tabValue, targetScenario,moduleName ]
	);
	const hideFilterSection = async () => {
		await dispatch(setFilterVisibility(false));
	};

	return (
		<React.Fragment>
			{filterData.map((e, index) => {
				if (configs.includes(e.grpKey)) {
					return (
						<Accordion style={{ position: 'relative',background:'none',width:300 }}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-label="Expand"
								aria-controls="additional-actions1-content"
								id="additional-actions1-header"
							>
								<div className="tags-label">{e.grpname}</div>
								<div style={{fontSize:12,font:'inherit',fontFamily:"Roboto,Helvetica,Arial,sans-serif",fontWeight:'500'}}>{filterRes[filterItem[e.grpKey]]}</div>

							</AccordionSummary>
							<AccordionDetails>
								<div>
									{e.tagsList.map((t, i) => {
										const val = getEmission(t.value);
										const fpValue = getFootprintMetric(t.value);
										const warmingScValue = getWarmingScenario(t.value);
										if (e.grpKey === 'emission') {
											if (val) {
												return (
													<FilterTags
														name={t.name}
														selected={t.selected}
														grpindex={index}
														tagindex={i}
														action={updateTags}
													/>
												);
											}
										} else if (e.grpKey === 'footprintMetric') {
											if (fpValue) {
												return (
													<FilterTags
														name={t.name}
														selected={t.selected}
														grpindex={index}
														tagindex={i}
														action={updateTags}
													/>
												);
											}
										} else if (e.grpKey === 'warmingScenario') {
											if (warmingScValue) {
												return (
													<FilterTags
														name={t.name}
														selected={t.selected}
														grpindex={index}
														tagindex={i}
														action={updateTags}
													/>
												);
											}
										} else {
											return (
												<FilterTags
													name={t.name}
													selected={t.selected}
													grpindex={index}
													tagindex={i}
													action={updateTags}
												/>
											);
										}
									})}
								</div>
							</AccordionDetails>
						</Accordion>
					);
				}
			})}
			{/* {configs.length > 0 ? (
				<span onClick={hideFilterSection}>
					<ArrowBackIosIcon style={{ position: 'fixed', left: 400, top: window.innerHeight / 3 }} />
				</span>
			) : (
				<span onClick={hideFilterSection}>
					<ArrowBackIosIcon style={{ position: 'fixed', left: 80, top: window.innerHeight / 3 }} />
				</span>
			)} */}
		</React.Fragment>
	);
}
