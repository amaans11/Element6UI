const getRequestData = (type, auth) => {
	let data = {};
	const {
		currentPortfolio,
		currentBenchmark,
		currentCurrency,
		currentQuarter,
		currentYear,
		currentUser,
		filterItem
	} = auth;

	const { sector, footprintMetric, marketValue, assetClass, inferenceType, emission } = filterItem;

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

		case 'DISCLOSURE':
			data = {
				client: currentUser.client,
				user: currentUser.userName,
				fundamentals_quarter: 'Q1',
				emissions_quarter: 'Q1',
				version_fundamentals: '1',
				version_emissions: '11',
				emissions_quarter: 'Q1',
				version_emissions: '11'
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
		default:
			data = {};
			break;
	}
	return data;
};
export default getRequestData;
