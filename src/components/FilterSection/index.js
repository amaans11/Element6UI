import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterTags from './tags';
import data from '../../util/filter-config';
import filterConfig from '../../util/tabs-filter-config';
import { setFilterItem } from '../../redux/actions/authActions';

export default function FilterGroup() {
	const [ filterData, setFilterData ] = useState(data);
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

	console.log('filterData', filterData);
	console.log('configs', configs);

	return (
		<React.Fragment>
			{filterData.map((e, index) => {
				if (configs.includes(e.grpKey)) {
					return (
						<Accordion>
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
										return (
											<FilterTags
												name={t.name}
												selected={t.selected}
												grpindex={index}
												tagindex={i}
												action={updateTags}
											/>
										);
									})}
								</div>
							</AccordionDetails>
						</Accordion>
					);
				} else {
					return (
						<Accordion disabled={true}>
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
										return (
											<FilterTags
												name={t.name}
												selected={t.selected}
												grpindex={index}
												tagindex={i}
												action={updateTags}
											/>
										);
									})}
								</div>
							</AccordionDetails>
						</Accordion>
					);
				}
			})}
		</React.Fragment>
	);
}
