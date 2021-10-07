const configs = {
	TABLE: {
		UPLOAD_PORTFOLIO: {
			HEADING: 'Uploaded Portfolio'
		},
		PORTFOLIO_INTENSITY: {
			HEADING: 'Portfolio Footprint'
		},
		SOVEREIGN_FOOTPRINT: {
			HEADING: 'Sovereign Footprint'
		},
		AVOIDED_EMISSIONS: {
			HEADING: 'Avoided Emission'
		},
		SECTORAL_SCOPE3_HEATMAP: {
			HEADING: 'Company Scope 3 Category Breakdown'
		},
		PORT_OPTIMIZATION: {
			HEADING: ''
		},
		RISK_CONTRIBUTOR: {
			HEADING: 'Risk Contribution Table'
		},
		FOSSIL_FUEL: {
			HEADING: ''
		},
		FOSSIL_FUEL_COUNTRY: {
			HEADING: ''
		},
		COAL_POWER: {
			HEADING: ''
		},
		TEMP_SCORE: {
			HEADING: 'Temperature Score'
		},
		COMPANY_ANALYSIS: {
			HEADING: 'Company Metrics'
		},
		DOWNLOAD:{
			HEADING:'Selected Data'
		},
		TARGET_SETTING:{
			HEADING: 'Target Setting'
		},
		COMPANY_PROFILE:{
			HEADING: 'Company Profile'
		},
		CARBON_ADJUSTED_RETURNS_TABLE1:{
			HEADING: 'Return (in %)'
		},
		CARBON_ADJUSTED_RETURNS_TABLE2:{
			HEADING: 'Carbon-Adjusted Returns (Carbon price = $100)'
		},
		MISSING_COVERAGE:{
			HEADING: 'Missing Coverage'
		},
		BACKGROUND:{
			HEADING: ''
		}
	},
	CHART: {
		PORTFOLIO_INTENSITY: {
			TITLE: 'Portfolio Footprint',
		},
		SECTOR_INTENSITY: {
			TITLE: 'Sector Intensity'
		},
		SECTOR_CONTRIBUTION: {
			TITLE: 'Sector Contribution'
		},
		SECTOR_WEIGHT: {
			TITLE: 'Sector Weights',
			Y_AXIS_TITLE: 'Sector Weight (%)',
            TOOLTIP_UNIT:'%'
		},
		SOV_GDP_CHART: {
			TITLE: 'Sovereign Footprint (per GDP)',
			Y_AXIS_TITLE: 'Emissions Intensity of GDP (tCO2/1M USD)'
		},
		SOV_POP_CHART: {
			TITLE: 'Sovereign Footprint (per Population)',
			Y_AXIS_TITLE: 'Emissions Intensity of Population (tCO2/person)'
		},
		AVOIDED_EMISSIONS: {
			TITLE: 'Portfolio Intensity'
		},
		DISCLOSURE_SCOPE12: {
			TITLE: 'Scope 1+2 Carbon Emissions Disclosure',
			Y_AXIS_TITLE: '%',
		},
		DISCLOSURE_SCOPE3: {
			TITLE: 'Scope 3 Carbon Emissions Disclosure',
			Y_AXIS_TITLE: 'Percentage Disclosed (%)',
			X_AXIS_TITLE:'Number of Scope 3 Categories Disclosed'
		},
		CARBON_ATTRIBUTION: {
			TITLE: 'Carbon Attribution',
			Y_AXIS_TITLE: 'GHG Intensity (tCO2e / 1M USD )',
			X_AXIS_TITLE:'Sector'
		},
		SCOPE3_HEATMAP: {
			TITLE: 'Supply and Value Chain Scope 3 Materiality'
		},
		SECTORAL_SCOPE3_HEATMAP: {
			TITLE: 'Supply and Value Chain Scope 3 Materiality'
		},
		PORT_OPTIMIZATION: {
			TITLE: 'Low Carbon Backtesting Module',
			Y_AXIS_TITLE: 'Return (%)'
		},
		PORT_OPTIMIZATION_INTENSITY: {
			TITLE: 'Portfolio Carbon Intensity'
		},
		PORT_OPTIMIZATION_WEIGHT: {
			TITLE: 'Sector Weights',
			Y_AXIS_TITLE: 'Weight (%)'
		},
		PORT_OPTIMIZATION_CONTRIB: {
			TITLE: 'Sector Contribution'
		},
		PERFORMANCE_ATTRIBUTION: {
			TITLE: 'Performance Attribution',
			Y_AXIS_TITLE: 'Returns (%)'
		},
		RISK_CONTRIBUTOR: {
			TITLE: 'Portfolio Risk Contributions'
		},
		FOSSIL_FUEL: {
			TITLE: 'Fossil-Fuel Reserves Footprint'
		},
		COAL_POWER: {
			TITLE: 'Coal Power Analysis',
			Y_AXIS_TITLE: 'MW'
		},
		TEMP_SCORE: {
			TITLE: ''
		},
		PORT_COMPANIES_SCORE: {
			TITLE: '',
			X_AXIS_TITLE: ''
		},
		COMPANY_ANALYSIS: {
			TITLE: 'Company Level Analysis',
			Y_AXIS_TITLE: 'Temperature Score'
		},
		TEMP_ATTRIBUTION: {
			TITLE: 'Temperature Attribution',
			Y_AXIS_TITLE: '°C'
		},
		PORT_HEATMAP: {
			TITLE: 'Temperature Score per Sector and Region',
			Y_AXIS_TITLE: 'Sector'
		},
		CONTRIBUTION_ANALYSIS: {
			TITLE: 'Temperature Scores per sector (℃)',
			Y_AXIS_TITLE: 'Temperature Score'
		},
		INVESTMENT: {
			TITLE: 'Investments'
		},
		CONTRIBUTION: {
			TITLE: 'Contributions'
		},
		PORT_ALIGNMENT:{
			TITLE: 'Portfolio Alignment',
			Y_AXIS_TITLE: 'Global Emissions (%)'
		},
		TARGET_SETTING:{
			TITLE: 'Target Setting',
			Y_AXIS_TITLE: 'Carbon Emissions (tCo2e)'
		},
		COMPANY_PROFILE:{
			Y_AXIS_TITLE: 'Carbon Emissions (tCo2e)'
		},
		CARBON_ADJUSTED_RETURNS:{
			TITLE: 'Comparison of Returns'
		},
		PORTFOLIO_SENTIMENT:{
			TITLE: 'Portfolio Sentiment Score',
			X_AXIS_TITLE:'Sentiment'
		},
		BENCHMARK_SENTIMENT:{
			TITLE: 'Benchmark Sentiment Score',
			X_AXIS_TITLE:'Sentiment'
		},
		PORTFOLIO_SENTIMENT_SERIES:{
			TITLE: 'Portfolio Sentiment Time Series',
			Y_AXIS_TITLE:'Aggregated Sentiment Score'
		},
		BENCHMARK_SENTIMENT_SERIES:{
			TITLE: 'Benchmark Sentiment Time Series',
			Y_AXIS_TITLE:'Aggregated Sentiment Score'
		},
		SECTOR_SENTIMENT:{
			TITLE: 'Sector Sentiment Score',
			Y_AXIS_TITLE:'Sentiment'
		},
		SECTOR_SENTIMENT_SERIES:{
			TITLE: 'Sector Sentiment Time Series',
			Y_AXIS_TITLE:'Aggregated Sector Sentiment'
		},
		SUMMARY:{
			TITLE: 'Fund of Funds Composition : Weights',
			Y_AXIS_TITLE: '%'
		},
		FOOTPRINT_PIE:{
			TITLE: "Children's footprint contribution to the parent",
		},
		FOOTPRINT_STACK:{
			TITLE: "Fund of Funds Portfolio Weight Composition",
			Y_AXIS_TITLE:'Weight (%)',

		},
		FOOTPRINT_STACK_COL:{
			TITLE: "Children Sector Intensity",
		},
		PARENT_INTENSITY:{
			TITLE:"Parent Sector Intensity",
			Y_AXIS_TITLE:"tCO2e/1M USD"
		},
		FUND_TARGET_SETTINGS:{
			TITLE:"Children’s Targets Breakdown",
			Y_AXIS_TITLE:"Carbon Emissions(tCo2e)"
		}
	}
};
export default configs;
