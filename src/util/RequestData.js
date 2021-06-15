const getScenarioValue = (currentSc) => {
	const scenarios = [
		{ key: '1', value: { number: 1, engagement_type: 1 } },
		{ key: '2', value: { number: 2, engagement_type: 1 } },
		{ key: '3', value: { number: 3, engagement_type: 1 } },
		{ key: '4', value: { number: 3, engagement_type: 2 } }
	];

	let res = {};
	scenarios.map((scenario) => {
		if (scenario.key === currentSc) {
			res = scenario.value;
		}
	});
	return res;
};
const getScoreType = (scoreType) => {
	if (scoreType === 'shortTerm') {
		return 'short';
	} else if (scoreType === 'longTerm') {
		return 'long';
	} else {
		return 'mid';
	}
};

const getRequestData = (type, auth) => {
	let data = {};
	const {
		currentPortfolio,
		currentBenchmark,
		currentCurrency,
		currentQuarter,
		currentYear,
		currentUser,
		filterItem,
		reweightFactor
	} = auth;

	const {
		sector,
		footprintMetric,
		marketValue,
		assetClass,
		inferenceType,
		emission,
		returnYear,
		aggregation,
		defaultValue,
		scenario,
		scoreType,
		portScenario,
		targetScenario,
		approach,
		warmingScenario
	} = filterItem;

	const scenarioValue = getScenarioValue(scenario);
	switch (type) {
		case 'PORTFOLIO_EMISSION':
			data = {
				client: currentUser.client,
				footprint: footprintMetric,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				sector: sector,
				market_value: marketValue,
				asset_type: assetClass,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				year_currency: currentYear,
				currency: currentCurrency,
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				year_fundamentals: 2020,
				year_emissions: 2020
			};
			break;
		case 'CARBON_EMISSION':
			data = {
				client: currentUser.client,
				footprint: footprintMetric,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				sector: sector,
				market_value: marketValue,
				asset_type: assetClass,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				year_currency: currentYear,
				currency: currentCurrency,
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				year_fundamentals: 2020,
				year_emissions: 2020
			};
			break;

		case 'SOVEREIGN_FOOTPRINT':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				quarter_fundamentals: 'Q1',
				version_fundamentals: '1',
				year_fundamentals: 2020
			};
			break;

		case 'CARBON_ATTRIBUTION':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				sector: sector,
				currency: currentCurrency,
				year_currency: currentYear,
				quarter: currentQuarter,
				asset_type: assetClass,
				inference: inferenceType,
				scope: emission,
				footprint: footprintMetric,
				market_value: marketValue,
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				year_fundamentals: 2020,
				year_emissions: 2020
			};
			break;

		case 'PORT_DISCLOSURE':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				year_fundamentals: 2020
			};
			break;
		case 'BENCH_DISCLOSURE':
			data = {
				client: currentUser.client,
				portfolio: currentBenchmark.label,
				portfolio_date: currentBenchmark.value,
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				year_fundamentals: 2020
			};
			break;

		case 'AVOIDED_EMISSION':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				year_currency: currentYear,
				currency: currentCurrency,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				sector: sector,
				footprint: footprintMetric,
				market_value: marketValue,
				asset_type: assetClass,
				inference: inferenceType,
				scope: 'Sc12',
				year_fundamentals: 2020,
				year_emissions: 2020,
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				quarter_avoided: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				version_avoided: '1'
			};
			break;
		case 'SCOPE3_MATERILITY':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				inference: inferenceType,
				scope: emission,
				sector: sector,
				asset_type: assetClass,
				country_type: 'incorporation',
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				year_fundamentals: 2020,
				year_emissions: 2020,
				version_fundamentals: '1',
				version_emissions: '11',
				currency: currentCurrency,
				currency_year: 2019
			};
			break;
		case 'SECTORAL_SCOPE3_MATERILITY':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				inference: inferenceType,
				scope: emission,
				sector: sector,
				asset_type: assetClass,
				country_type: 'incorporation',
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				year_fundamentals: 2020,
				year_emissions: 2020,
				version_fundamentals: '1',
				version_emissions: '11',
				currency: currentCurrency,
				currency_year: 2019
			};
			break;
		case 'PORTFOLIO_OPTIMIZATION':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				asset_type: assetClass,
				footprint: footprintMetric,
				sector: sector,
				market_value: marketValue,
				scope: emission,
				inference: inferenceType,
				currency: currentCurrency,
				currency_year: 2019,
				strategy: 'momentum',
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				reweight_factor: reweightFactor
			};
			break;
		case 'PERFORMANCE_ATTRIBUTION':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				asset_type: assetClass,
				sector: sector,
				currency: currentCurrency,
				req_year: returnYear,
				attribution_type: 'PerformanceAttribution',
				year_fundamentals: 2020,
				year_emissions: 2020,
				year_currency: 2019,
				period: '3',
				currency_year: 2019
			};
			break;
		case 'RISK_CONTRIBUTOR':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				version_fundamentals: '1',
				version_emissions: '11',
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				year_emissions: 2020,
				year_fundamentals: 2020,
				market_value: marketValue,
				asset_type: 'Eq',
				inference: inferenceType,
				footprint: footprintMetric,
				currency: currentCurrency,
				currency_year: 2019
			};
			break;
		case 'FOSSIL_FUEL':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				year_currency: currentYear,
				currency: currentCurrency,
				quarter_fundamentals: 'Q1',
				year_fundamentals: 2020,
				version_fundamentals: '1',
				market_value: marketValue,
				asset_type: assetClass,
				footprint: footprintMetric
			};
			break;
		case 'COAL_POWER':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				currency: currentCurrency,
				quarter_fundamentals: 'Q1',
				version_fundamentals: '1',
				year_fundamentals: 2020,
				year_currency: 2019
			};
			break;

		case 'PORT_TEMPERATURE_SCORE':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				currency: currentCurrency,
				year: currentYear,
				quarter: currentQuarter,
				aggregation_method: aggregation,
				default_score: defaultValue
			};
			if (scenario !== 0) {
				data = {
					...data,
					what_if: scenarioValue
				};
			}
			break;

		case 'COMPANY_ANALYSIS':
			const score = getScoreType(scoreType);
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				currency: currentCurrency,
				year: currentYear,
				quarter: currentQuarter,
				aggregation_method: aggregation,
				default_score: defaultValue,
				sector_classification: sector,
				scope: emission,
				term: score
			};
			break;
		case 'TEMP_ATTRIBUTION':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				currency: currentCurrency,
				year: currentYear,
				quarter: currentQuarter,
				aggregation_method: aggregation,
				default_score: defaultValue,
				sector_classification: sector
			};
			break;
		case 'TEMP_HEATMAP':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				currency: currentCurrency,
				year: currentYear,
				quarter: currentQuarter,
				aggregation_method: aggregation,
				default_score: defaultValue,
				sector_classification: sector
			};
			break;
		case 'CONTRIBUTION_ANALYSIS':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				currency: currentCurrency,
				year: currentYear,
				quarter: currentQuarter,
				aggregation_method: aggregation,
				default_score: defaultValue,
				sector_classification: sector
			};
			break;

		case 'GENERATE_REPORT':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				Scenario: 'LowEnergyDemand',
				footprint_metric: 'Revenue',
				currency: 'USD',
				quarter: 'Q1',
				quarter_avoided: 'Q1',
				quarter_emissions: 'Q1',
				quarter_fundamentals: 'Q1',
				quarter_reserves: 'Q1',
				req_year: 1,
				reweight_factor: 0,
				scenario: 'IPCC',
				strategy: 'momentum',
				version: '',
				version_avoided: 'Q1',
				version_emissions: '11',
				version_fundamentals: '1',
				warming_scenario: 'LowEnergyDemand',
				year: '2020',
				approach: 'MarketShare'
			};
			break;
		case 'PORTFOLIO_ALIGNMENT':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				scenario: portScenario,
				quarter_emissions: 'Q1',
				quarter_fundamentals: 'Q1',
				year_emissions: 2020,
				year_fundamentals: 2020,
				version_fundamentals: '1',
				version_emissions: '11',
				asset_type: 'EqCB',
				market_value: marketValue,
				footprint: footprintMetric,
				inference: 'Avg',
				scope: 'Sc123',
				currency: 'USD',
				currency_year: 2019
			};
			break;
		case 'TARGET_SETTING':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				scenario_type: targetScenario === 'NGFS' ? 'IPCC' : targetScenario,
				scope_type: emission.substring(2),
				sector: sector,
				footprint: footprintMetric,
				market_value: marketValue,
				inference: 'Avg',
				asset_type: 'EqCB',
				approach: approach,
				scenario: warmingScenario ? warmingScenario : 'LowEnergyDemand',
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				currency: currentCurrency,
				currency_year: 2019
			};
			break;
		case 'COMPANY_PROFILE_COMPANIES':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				asset_type: 'EqCB'
			};
			break;
		case 'COMPANY_PROFILE':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				scenario_type: 'IEA',
				scope_type: emission.substring(2),
				sector: sector,
				footprint: footprintMetric,
				market_value: marketValue,
				inference: 'Avg',
				asset_type: 'EqCB',
				approach: approach,
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				year_fundamentals: 2020,
				year_emissions: 2020,
				currency: currentCurrency,
				currency_year: 2019
			};
			break;
		case 'CARBON_ADJUSTED_COMPANIES':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				quarter_fundamentals: 'Q1',
				version_fundamentals: '1',
				asset_type: 'Eq',
				currency: 'USD',
				currency_year: 2019
			};
			break;
		case 'CARBON_ADJUSTED_LINE_RETURNS':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				asset_type: 'Eq',
				quarter_fundamentals: 'Q1',
				year_fundamentals: 2020,
				version_fundamentals: '1',
				sector: 'SASB',
				currency: currentCurrency,
				currency_year: 2019
			};
			break;
		case 'CARBON_ADJUSTED_TABLE_RETURNS':
			data = {
				client: currentUser.client,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				inference: 'Avg',
				asset_type: 'Eq',
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				year_fundamentals: 2020,
				year_emissions: 2020,
				version_fundamentals: '1',
				version_emissions: '11',
				sector: 'SASB',
				market_value: marketValue,
				footprint: footprintMetric
			};
			break;

		default:
			data = {};
			break;
	}
	return data;
};
export default getRequestData;
