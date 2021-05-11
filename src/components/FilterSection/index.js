import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails, Card, Box } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterTags from './tags';
import data from '../../util/filter-config';
import filterConfig from '../../util/tabs-filter-config';
import { setFilterItem, setFilterVisibility, setPortfolio } from '../../redux/actions/authActions';

export default function FilterGroup() {
	const [ filterData, setFilterData ] = useState(data);
	const isVisible = useSelector((state) => state.auth.isVisible);
	const [ configs, setConfigs ] = useState([]);

	const dispatch = useDispatch();

	const moduleName = useSelector((state) => state.auth.moduleName);
	const tabValue = useSelector((state) => state.auth.tabValue);

	const getConfigs = () => {
		let config = [];
		switch (moduleName) {
			case 'Emission':
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
			case 'Emission':
				switch (tagName) {
					case 'Sc12':
						return true;
					case 'Sc123':
						return true;
					case 'Sc3':
						return false;
				}
				break;
			case 'Scope3':
				switch (tagName) {
					case 'Sc12':
						return false;
					case 'Sc123':
						return true;
					case 'Sc3':
						return true;
				}
				break;
			case 'Optimization':
				switch (tagName) {
					case 'Sc12':
						return true;
					case 'Sc123':
						return true;
					case 'Sc3':
						return true;
				}
				break;
			default:
				switch (tagName) {
					case 'Sc12':
						return true;
					case 'Sc123':
						return true;
					case 'Sc3':
						return false;
				}
				break;
		}
	};

	const updateTags = (grpindex, tagindex, selected) => {
		if (selected) {
			const newData = [ ...data ];

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
	};
	useEffect(
		() => {
			getConfigs();
		},
		[ tabValue ]
	);
	const hideFilterSection = async () => {
		await dispatch(setFilterVisibility(false));
	};

	return (
		<React.Fragment>
			{filterData.map((e, index) => {
				if (configs.includes(e.grpKey)) {
					return (
						<Accordion style={{ position: 'relative' }}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-label="Expand"
								aria-controls="additional-actions1-content"
								id="additional-actions1-header"
							>
								<label className="tags-label">{e.grpname}</label>
							</AccordionSummary>
							<AccordionDetails>
								<div>
									{e.tagsList.map((t, i) => {
										const val = getEmission(t.value);
										if (e.grpKey == 'emission') {
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
			{configs.length > 0 ? (
				<span onClick={hideFilterSection}>
					<ArrowBackIosIcon style={{ position: 'fixed', left: 400, top: window.innerHeight / 3 }} />
				</span>
			) : (
				<span onClick={hideFilterSection}>
					<ArrowBackIosIcon style={{ position: 'fixed', left: 80, top: window.innerHeight / 3 }} />
				</span>
			)}
		</React.Fragment>
	);
}
