const getScenarioValue = (currentSc) => {
  const scenarios = [
    { key: '1', value: { number: 1, engagement_type: 1 } },
    { key: '2', value: { number: 2, engagement_type: 1 } },
    { key: '3', value: { number: 3, engagement_type: 1 } },
    { key: '4', value: { number: 3, engagement_type: 2 } },
  ]
  let res = {}
  scenarios.map((scenario) => {
    if (scenario.key === currentSc) {
      res = scenario.value
    }
  })
  return res
}
const getScoreType = (scoreType) => {
  if (scoreType === 'shortTerm') {
    return 'short'
  } else if (scoreType === 'longTerm') {
    return 'long'
  } else {
    return 'mid'
  }
}
const getRequestData = (type, auth) => {
  let data = {}
  const {
    currentPortfolio,
    currentBenchmark,
    currentCurrency,
    currentQuarter,
    currentYear,
    currentUser,
    filterItem,
    reweightFactor,
    userInfo,
	selectedDownloadMenu,
	selectedDownloadPort
  } = auth

  const { client, userName } = currentUser

  const { year, quarter, version } = userInfo

  const portfolioId = currentPortfolio.value
  const benchmarkId = currentBenchmark.value
  const versionPortfolio = currentPortfolio.version
  const versionBenchmark = currentBenchmark.version
  const portfolioName = currentPortfolio.label
  const benchmarkName = currentBenchmark.label

  const yearFundamentals =
    year && year.fundamentals ? year.fundamentals : '2019'
  const yearEmissions = year && year.emissions ? year.emissions : '2019'
  const quarterFundamentals =
    quarter && quarter.fundamentals ? quarter.fundamentals : 'Q1'
  const quarterEmissions =
    quarter && quarter.emissions ? quarter.emissions : 'Q1'
  const versionFundamentals =
    version && version.fundamentals ? version.fundamentals : ''
  const versionEmissions = version && version.emissions ? version.emissions : ''
  const quarterAvoided = quarter && quarter.avoided ? quarter.avoided : 'Q1'
  const versionAvoided = version.avoided ? version.avoided : ''
  const quarterReserves = quarter && quarter.reserves ? quarter.reserves : ''

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
    warmingScenario,
  } = filterItem

  const scenarioValue = getScenarioValue(scenario)
  switch (type) {
    case 'PORTFOLIO_EMISSION':
      data = {
        footprint: footprintMetric,
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        sector: sector,
        market_value: marketValue,
        asset_type: assetClass == 'EqCB' ? ['Eq','CB'] : [assetClass],
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
      }
      break
    case 'CARBON_EMISSION':
      data = {
        footprint: footprintMetric,
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        sector: sector,
        market_value: marketValue,
        asset_type: assetClass == 'EqCB' ? ['Eq','CB'] : [assetClass],
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
      }
      break

    case 'SOVEREIGN_FOOTPRINT':
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        quarter_fundamentals: quarterFundamentals,
        version_fundamentals: versionFundamentals,
        year_fundamentals: yearFundamentals,
      }
      break

    case 'CARBON_ATTRIBUTION':
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        sector: sector,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
        asset_type: assetClass == 'EqCB' ? ['Eq','CB'] : [assetClass],
        inference: inferenceType,
        scope: emission,
        footprint: footprintMetric,
        market_value: marketValue,
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
      }
      break

    case 'PORT_DISCLOSURE':
      data = {
        portfolio_id: portfolioId,
        version_portfolio: versionPortfolio,
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
      }
      break
    case 'BENCH_DISCLOSURE':
      data = {
        portfolio_id: benchmarkId,
        version_portfolio: versionPortfolio,
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
      }
      break

    case 'AVOIDED_EMISSION':
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
        sector: sector,
        footprint: footprintMetric,
        market_value: marketValue,
        asset_type: assetClass == 'EqCB' ? ['Eq','CB'] : [assetClass],
        inference: inferenceType,
        scope: 'Sc12',
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
        quarter_avoided: quarterAvoided,
        version_avoided: versionAvoided,
      }
      break
    case 'SCOPE3_MATERILITY':
      data = {
        portfolio_id: portfolioId,
        version_portfolio: versionPortfolio,
        inference: inferenceType,
        scope: emission == 'Sc12' ? 'Sc123' : emission,
        sector: sector,
        asset_type: assetClass == 'EqCB' ? ['Eq','CB'] : [assetClass],
        country_type: 'incorporation',
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
      }
      break
    case 'SECTORAL_SCOPE3_MATERILITY':
      data = {
        portfolio_id: portfolioId,
        version_portfolio: versionPortfolio,
        inference: inferenceType,
        scope: emission,
        sector: sector,
        asset_type: assetClass == 'EqCB' ? ['Eq','CB'] : [assetClass],
        country_type: 'incorporation',
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
      }
      break
    case 'PORTFOLIO_OPTIMIZATION':
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        asset_type: assetClass == 'EqCB' ? ['Eq','CB'] : [assetClass],
        footprint: footprintMetric,
        sector: sector,
        market_value: marketValue,
        scope: emission,
        inference: inferenceType,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
        strategy: 'momentum',
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        reweight_factor: reweightFactor,
      }
      break
    case 'PERFORMANCE_ATTRIBUTION':
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
        asset_type: ['Eq'],
        sector: sector,
        period: returnYear ? returnYear : '3',
        attribution_type: 'PerformanceAttribution',
        year_currency: 2019,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
      }
      break
    case 'RISK_CONTRIBUTOR':
      data = {
        portfolio_id: portfolioId,
        version_portfolio: versionPortfolio,
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
        market_value: marketValue,
        asset_type: ['Eq'],
        inference: inferenceType,
        footprint: footprintMetric,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
      }
      break
    case 'FOSSIL_FUEL':
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
        quarter_fundamentals: quarterFundamentals,
        version_fundamentals: versionFundamentals,
        year_fundamentals: yearFundamentals,
        market_value: marketValue,
        asset_type: assetClass == 'EqCB' ? ['Eq','CB'] : [assetClass],
        footprint: footprintMetric,
      }
      break
    case 'COAL_POWER':
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        quarter_fundamentals: quarterFundamentals,
        version_fundamentals: versionFundamentals,
        year_fundamentals: yearFundamentals,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
      }
      break

    case 'PORT_TEMPERATURE_SCORE':
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
        aggregation_method: aggregation,
        default_score: defaultValue,
      }
      if (scenario != 0) {
        data = {
          ...data,
          what_if: scenarioValue,
        }
      }
      break

    case 'COMPANY_ANALYSIS':
      const score = getScoreType(scoreType)
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
        aggregation_method: aggregation,
        default_score: defaultValue,
        sector_classification: sector,
        scope: emission,
        term: score,
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
      }
      break
    case 'TEMP_ATTRIBUTION':
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
        aggregation_method: aggregation,
        default_score: defaultValue,
        sector_classification: sector,
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
      }
      break
    case 'TEMP_HEATMAP':
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
        aggregation_method: aggregation,
        default_score: defaultValue,
        sector_classification: sector,
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
      }
      break
    case 'CONTRIBUTION_ANALYSIS':
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
        aggregation_method: aggregation,
        default_score: defaultValue,
        sector_classification: sector,
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
      }
      break
    case 'SECTORAL_TEMP_SCORE':
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        aggregation_method: aggregation,
        default_score: defaultValue,
        sector_classification: sector,
      }
      break
    case 'GENERATE_REPORT':
      data = {
        client: client,
        user: userName,
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        portfolio: portfolioName,
        benchmark: benchmarkName,
        footprint_metric: 'WeightAvgRev',
        currency: 'USD',
        quarter_currency: 'Q1',
        year_currency: '2020',
        period: 1,
        reweight_factor: 0,
        strategy: 'momentum',
        scenario_type: 'IPCC',
        scenario: 'LowEnergyDemand',
        approach: 'RelativeAlignment',
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        quarter_avoided: quarterAvoided,
        version_avoided: versionAvoided ? versionAvoided : 0,
        quarter_reserves: quarterReserves,
      }
      break
    case 'PORTFOLIO_ALIGNMENT':
      data = {
        portfolio_id: portfolioId,
        benchmark_id: benchmarkId,
        version_portfolio: versionPortfolio,
        version_benchmark: versionBenchmark,
        scenario: portScenario,
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
        asset_type: ['Eq','CB'],
        market_value: marketValue,
        footprint: footprintMetric == 'CarbIntensityMarketVal' || footprintMetric == 'CarbIntensityRev' ? 'WeightAvgRev' : footprintMetric,
        inference: 'Avg',
        scope: 'Sc123',
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
      }
      break
    case 'TARGET_SETTING':
      data = {
        portfolio_id: portfolioId,
        version_portfolio: versionPortfolio,
        scenario_type: targetScenario === 'NGFS' ? 'IPCC' : targetScenario,
        scope_type: emission.substring(2),
        sector: sector,
        footprint: filterItem.approach == 'MarketShare' ? 'TotalCarbEmis' : footprintMetric == 'CarbIntensityMarketVal' || footprintMetric == 'CarbIntensityRev' ? 'WeightAvgRev' : footprintMetric,
        market_value: marketValue,
        inference: 'Avg',
        asset_type: ['Eq','CB'],
        approach: approach,
        scenario: warmingScenario ? warmingScenario : 'LowEnergyDemand',
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
      }
      break
    case 'COMPANY_PROFILE_COMPANIES':
      data = {
        portfolio_id: portfolioId,
        version_portfolio: versionPortfolio,
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        asset_type: ['Eq','CB'],
      }
      break
    case 'COMPANY_PROFILE':
      data = {
        portfolio_id: portfolioId,
        version_portfolio: versionPortfolio,
        scenario_type: 'IEA',
        scope_type: emission.substring(2),
        sector: sector,
        footprint: filterItem.approach == 'MarketShare' ? 'TotalCarbEmis' : footprintMetric == 'CarbIntensityMarketVal' || footprintMetric == 'CarbIntensityRev' ? 'WeightAvgRev' : footprintMetric,
        market_value: marketValue,
        inference: 'Avg',
        asset_type: ['Eq','CB'],
        approach: approach,
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
      }
      break
    case 'CARBON_ADJUSTED_COMPANIES':
      data = {
        portfolio_id: portfolioId,
        version_portfolio: versionPortfolio,
        quarter_fundamentals: quarterFundamentals,
        version_fundamentals: versionFundamentals,
        asset_type: ['Eq'],
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
      }
      break
    case 'CARBON_ADJUSTED_LINE_RETURNS':
      data = {
        portfolio_id: portfolioId,
        version_portfolio: versionPortfolio,
        asset_type: ['Eq'],
        quarter_fundamentals: quarterFundamentals,
        version_fundamentals: versionFundamentals,
        year_fundamentals: yearFundamentals,
        sector: 'SASB',
        display_ccy: currentCurrency,
        currency_date:{year:currentYear,quarter:currentQuarter},
      }
      break
    case 'CARBON_ADJUSTED_TABLE_RETURNS':
      data = {
        portfolio_id: portfolioId,
        version_portfolio: versionPortfolio,
        inference: 'Avg',
        asset_type: ['Eq'],
        quarter_fundamentals: quarterFundamentals,
        quarter_emissions: quarterEmissions,
        version_fundamentals: versionFundamentals,
        version_emissions: versionEmissions,
        year_fundamentals: yearFundamentals,
        year_emissions: yearEmissions,
        sector: 'SASB',
        market_value: marketValue,
        footprint: footprintMetric,
      }
      break
	  case 'URGENTEM_DOWNLOAD':
		data = {
			year:yearEmissions,
			field:selectedDownloadMenu.join(";"),
			portfolio_id:selectedDownloadPort.value,
			version_portfolio:selectedDownloadPort.version
		  }
		  break;
    default:
      data = {}
      break
  }
  return data
}
export default getRequestData