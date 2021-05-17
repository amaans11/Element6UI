const getScenarioValue = (currentSc) => {
	const scenarios = [
		{ key: '1', value: { number: 1, engagement_type: 1 } },
		{ key: '2', value: { number: 2, engagement_type: 1 } },
		{ key: '3', value: { number: 3, engagement_type: 1 } },
		{ key: '4', value: { number: 3, engagement_type: 2 } }
	];

	let res = {};
	scenarios.map((scenario) => {
		if (scenario.key == currentSc) {
			res = scenario.value;
		}
	});
	return res;
};
const getScoreType = (scoreType) => {
	if (scoreType == 'shortTerm') {
		return 'short';
	} else if (scoreType == 'longTerm') {
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
		reweightFactor,
	} = auth;

	const {
		sector,
		footprintMetric,
		marketValue,
		assetClass,
		inferenceType,
		emission,
		strategy,
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
				asset_type: assetClass,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				client: currentUser.client,
				currency: currentCurrency,
				emissions_quarter: 'Q1',
				footprint_metric: footprintMetric,
				fundamentals_quarter: 'Q1',
				market_value: marketValue,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				quarter: currentQuarter,
				year: currentYear,
				sector: sector,
				version: '',
				version_emissions: '11',
				version_fundamentals: '1'
			};
			break;
		case 'CARBON_EMISSION':
			data = {
				asset_type: assetClass,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				client: currentUser.client,
				currency: currentCurrency,
				emissions_quarter: 'Q1',
				footprint_metric: footprintMetric,
				fundamentals_quarter: 'Q1',
				market_value: marketValue,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				quarter: currentQuarter,
				year: currentYear,
				sector: sector,
				version: '',
				version_emissions: '11',
				version_fundamentals: '1'
			};
			break;

		case 'SOVEREIGN_FOOTPRINT':
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
				country_type: 'dom',
				fundamentals_quarter: 'Q1',
				version_fundamentals: '1',
				asset_type: 'Sov'
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
				year: currentYear,
				quarter: currentQuarter,
				currency: currentCurrency,
				sector: sector,
				asset_type: assetClass,
				interference_type: inferenceType,
				emissions: emission,
				metric: footprintMetric,
				market_value: marketValue,
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11'
			};
			break;

		case 'PORT_DISCLOSURE':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				fundamentals_quarter: 'Q1',
				emissions_quarter: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				emissions_quarter: 'Q1',
				version_emissions: '11',
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value
			};
			break;
		case 'BENCH_DISCLOSURE':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				fundamentals_quarter: 'Q1',
				emissions_quarter: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				emissions_quarter: 'Q1',
				version_emissions: '11',
				portfolio: currentBenchmark.label,
				portfolio_date: currentBenchmark.value
			};
			break;

		case 'AVOIDED_EMISSION':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				data_objects: [ 'PF_Avoided_Emissions' ],
				year: currentYear,
				quarter: currentQuarter,
				currency: currentCurrency,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				sector_classification: sector,
				footprint_metric: footprintMetric,
				market_value: marketValue,
				asset_class: assetClass,
				interference_type: inferenceType,
				emissions: 'Sc12',
				fundamentals_quarter: 'Q1',
				emissions_quarter: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				avoided_quarter: 'Q1',
				version_avoided: '1',
				country_type: 'inc'
			};
			break;
		case 'SCOPE3_MATERILITY':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				database: currentUser.client + '_Portfolios',
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				interference_type: inferenceType,
				emissions: emission,
				sector: sector,
				asset_type: assetClass,
				country_type: 'inc',
				fundamentals_quarter: 'Q1',
				emissions_quarter: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11'
			};
			break;
		case 'SECTORAL_SCOPE3_MATERILITY':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				database: currentUser.client + '_Portfolios',
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				interference_type: inferenceType,
				emissions: emission,
				sector: sector,
				asset_type: assetClass,
				country_type: 'inc',
				fundamentals_quarter: 'Q1',
				emissions_quarter: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11'
			};
			break;
		case 'PORTFOLIO_OPTIMIZATION':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				asset_type: assetClass,
				footprint_metric: footprintMetric,
				sector: sector,
				market_value: marketValue,
				emissions: emission,
				inference: inferenceType,
				currency: currentCurrency,
				strategy: 'momentum',
				fundamentals_quarter: 'Q1',
				emissions_quarter: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				reweight_factor: reweightFactor
			};
			break;
		case 'PERFORMANCE_ATTRIBUTION':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				asset_type: assetClass,
				sector: sector,
				currency: currentCurrency,
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				attribution_type: 'PerformanceAttribution',
				req_year: returnYear
			};
			break;
		case 'RISK_CONTRIBUTOR':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				interference_type: inferenceType,
				asset_type: 'Eq',
				footprint_metric: footprintMetric,
				market_value: marketValue,
				version_fundamentals: '1',
				version_emissions: '11',
				fundamentals_quarter: 'Q1',
				emissions_quarter: 'Q1'
			};
			break;
		case 'FOSSIL_FUEL':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				year: currentYear,
				quarter: currentQuarter,
				currency: currentCurrency,
				fundamentals_quarter: 'Q1',
				emissions_quarter: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				reserves_quarter: 'Q1',
				market_value: marketValue,
				asset_type: assetClass,
				footprint_metric: footprintMetric
			};
			break;
		case 'COAL_POWER':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				currency: currentCurrency,
				fundamentals_quarter: 'Q1',
				emissions_quarter: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				year_fundamentals: 2019
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
			if (scenario != 0) {
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
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				benchmark: currentBenchmark.label,
				benchmark_date: currentBenchmark.value,
				fundamentals_quarter: 'Q1',
				emissions_quarter: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				asset_type: 'EqCB',
				market_value: marketValue,
				interference_type: 'Avg',
				footprint_metric: footprintMetric,
				emissions: 'Sc123',
				Scenario: portScenario
			};
			break;
		case 'TARGET_SETTING':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				asset_type: 'EqCB',
				metric: footprintMetric,
				market_value: marketValue,
				interference_type: 'Avg',
				emissions: emission,
				sector: sector,
				scope: emission.substring(2),
				scenario: targetScenario == 'NGFS' ? 'IPCC' : targetScenario,
				warming_scenario: warmingScenario,
				approach: approach
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
				asset_type: 'EqCB',
			};
			break;
		case 'COMPANY_PROFILE':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				quarter: 'Q1',
				approach: approach,
				emissions: emission,
				asset_type: 'EqCB',
				interference_type: 'Avg',
				market_value: marketValue,
				metric: approach == 'MarketShare' ? 'FinancedEmis' : footprintMetric,
				sector: sector,
				scope: emission.substring(2),
				scenario: 'IEA'
			};
			break;
		case 'CARBON_ADJUSTED_RETURNS':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				portfolio: currentPortfolio.label,
				portfolio_date: currentPortfolio.value,
				fundamentals_quarter: 'Q1',
				emissions_quarter: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				inference: 'Avg',
				asset_type: 'Eq',
				quarter_fundamentals: 'Q1',
				quarter_emissions: 'Q1',
				sector: 'SASB',
				market_value: marketValue,
				footprint_metric: footprintMetric
			};
			break;

		default:
			data = {};
			break;
	}
	return data;
};
export default getRequestData;
