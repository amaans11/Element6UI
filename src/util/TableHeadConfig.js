import React from 'react';


const avoidedEmissionCells = [
	{
		name: '',
		selector: 'name',
		sortable: true,
		right: false,
		wrap: true
	},
	{
		name: 'Scope 1+2',
		selector: 'Sc12',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.Sc12)}</div>
	},
	{
		name: 'Scope 3',
		selector: 'Sc3',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.Sc3)}</div>
	},
	{
		name: 'Scope 1+2+3',
		selector: 'Sc123',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.Sc123)}</div>
	},
	{
		name: 'Avoided Emissions',
		selector: 'avoidedEmissions',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.avoidedEmissions)}</div>
	},
	{
		name: 'Net Emissions',
		selector: 'netEmissions',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.netEmissions)}</div>
	}
];

const sovFootprintCells = [
	{
		name: 'Type',
		selector: 'name',
		sortable: true,
		right: false
	},
	{
		name: 'Emissions Intensity of GDP (tCO2/1M USD)',
		selector: 'gdpData',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.gdpData)}</div>
	},
	{
		name: 'Emissions Intensity of Population (tCO2/person)',
		selector: 'popData',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.popData)}</div>
	}
];
const sectoralScope3Cells = [
	{
		name: 'Company Name',
		selector: 'security',
		sortable: true,
		right: false,
		wrap: true
	},
	{
		name: 'Purchased Goods and Services',
		selector: 'purchased',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.purchased === -1 || row.purchased === -999999 ? 'NA' : new Intl.NumberFormat().format(row.purchased)}
			</div>
		)
	},
	{
		name: 'Capital Goods',
		selector: 'capital',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.capital === -1 || row.capital === -999999 ? 'NA' : new Intl.NumberFormat().format(row.capital)}
			</div>
		)
	},
	{
		name: 'Fuel and Energy Related Activities',
		selector: 'fuel',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>{row.fuel === -1 || row.fuel === -999999 ? 'NA' : new Intl.NumberFormat().format(row.fuel)}</div>
		)
	},
	{
		name: 'Upstream Transport and Distribution',
		selector: 'upstreamTransport',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.upstreamTransport === -1 || row.upstreamTransport === -999999 ? (
					'NA'
				) : (
					new Intl.NumberFormat().format(row.upstreamTransport)
				)}
			</div>
		)
	},
	{
		name: 'Waste Generated',
		selector: 'waste"',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>{row.waste === -1 || row.waste === -999999 ? 'NA' : new Intl.NumberFormat().format(row.waste)}</div>
		)
	},
	{
		name: 'Business Travel',
		selector: 'business',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.business === -1 || row.business === -999999 ? 'NA' : new Intl.NumberFormat().format(row.business)}
			</div>
		)
	},
	{
		name: 'Employee Commuting',
		selector: 'employee',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.employee === -1 || row.employee === -999999 ? 'NA' : new Intl.NumberFormat().format(row.employee)}
			</div>
		)
	},
	{
		name: 'Upstream Leased Assets',
		selector: 'upstreamLeased',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.upstreamLeased === -1 || row.upstreamLeased === -999999 ? (
					'NA'
				) : (
					new Intl.NumberFormat().format(row.upstreamLeased)
				)}
			</div>
		)
	},
	{
		name: 'Downstream Transport Distribution',
		selector: 'downstreamTransport',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.downstreamTransport === -1 || row.downstreamTransport === -999999 ? (
					'NA'
				) : (
					new Intl.NumberFormat().format(row.downstreamTransport)
				)}
			</div>
		)
	},
	{
		name: 'Processing of Sold Products',
		selector: 'processing',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.processing === -1 || row.processing === -999999 ? (
					'NA'
				) : (
					new Intl.NumberFormat().format(row.processing)
				)}
			</div>
		)
	},
	{
		name: 'Use of Sold Products',
		selector: 'useSolid',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.useSolid === -1 || row.useSolid === -999999 ? 'NA' : new Intl.NumberFormat().format(row.useSolid)}
			</div>
		)
	},
	{
		name: 'End of Life Treatment of Sold Products',
		selector: 'endOfLife',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.endOfLife === -1 || row.endOfLife === -999999 ? 'NA' : new Intl.NumberFormat().format(row.endOfLife)}
			</div>
		)
	},
	{
		name: 'Downstream Leased Assets',
		selector: 'downstreamLease',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.downstreamLease === -1 || row.downstreamLease === -999999 ? (
					'NA'
				) : (
					new Intl.NumberFormat().format(row.downstreamLease)
				)}
			</div>
		)
	},
	{
		name: 'Franchises',
		selector: 'franchise',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.franchise === -1 || row.franchise === -999999 ? 'NA' : new Intl.NumberFormat().format(row.franchise)}
			</div>
		)
	},
	{
		name: 'Investments',
		selector: 'investments',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => (
			<div>
				{row.investments === -1 || row.investments === -999999 ? (
					'NA'
				) : (
					new Intl.NumberFormat().format(row.investments)
				)}
			</div>
		)
	}
];
const portOptimizationCells = [
	{
		name: '',
		selector: 'name',
		sortable: true,
		right: false,
		wrap: true
	},
	{
		name: 'Portfolio',
		selector: 'portfolio',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.portfolio)}</div>
	},
	{
		name: 'Benchmark',
		selector: 'benchmark',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.benchmark)}</div>
	},
	{
		name: 'Tilted',
		selector: 'tilted',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.tilted)}</div>
	}
];
const riskContribCells = [
	{
		name: 'Company Name',
		selector: 'company',
		sortable: true,
		right: false,
		wrap: true,
		style: {
			height: 80,
			minWidth: 120
		}
	},
	{
		name: 'ISIN',
		selector: 'isin',
		sortable: true,
		right: false
	},
	{
		name: 'SASB Sector',
		selector: 'sasb_sector',
		sortable: true,
		wrap: true,
		right: false
	},
	{
		name: 'Weight (%)',
		selector: 'weight',
		sortable: true,
		right: true
	},
	{
		name: 'Contribution to Annualized Return',
		selector: 'annualized_return',
		sortable: true,
		right: true,
		cell: (row) => <div>{row.annualized_return === -999999 ? 'NA' : row.annualized_return}</div>
	},
	{
		name: 'Contribution to Annualized Risk',
		selector: 'annualized_risk',
		sortable: true,
		right: true,
		cell: (row) => <div>{row.annualized_risk === -999999 ? 'NA' : row.annualized_risk}</div>
	},
	{
		name: 'Contribution to Emissions Footprint',
		selector: 'intensity',
		sortable: true,
		right: true
	}
];
const fossilFuelCells = [
	{
		name: 'Fossil Fuel Type',
		selector: 'type',
		sortable: true,
		right: false,
	},
	{
		name: 'Portfolio',
		selector: 'portfolio',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.portfolio)}</div>
	},
	{
		name: 'Benchmark',
		selector: 'benchmark',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.benchmark)}</div>
	}
];
const countryFossilCells = [
	{
		name: 'Country',
		selector: 'country',
		sortable: true,
		right: false
	},
	{
		name: 'Contribution to total footprint (%)',
		selector: 'contribution',
		sortable: true,
		right: true,
		wrap: false
	}
];
const coalPowerCells = [
	{
		name: 'Company',
		selector: 'Company',
		sortable: true,
		right: false,
		wrap: true
	},
	{
		name: 'Capacity (MW)',
		selector: 'Capacity(MW)',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row['Capacity(MW)'])}</div>
	},
	{
		name: 'Ownership (% Market Cap)',
		selector: 'Ownership(%MarketCap)',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row['Ownership(%MarketCap)'])}</div>
	},
	{
		name: 'Capacity Owned (MW)',
		selector: 'Capacity Owned (MW)',
		sortable: true,
		right: true,
		wrap: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row['Capacity Owned (MW)'])}</div>
	}
];
const tempScoreCells = [
	{
		name: <div><div>Portfolio</div><div style={{visibility:'hidden'}}>portfolio</div></div>,
		selector: 'name',
		sortable: true,
		right: false,
		wrap: true,
		style: {
			height: 50,
			fontSize: 13
		}
	},
	{
		name: <div><div>Short Term Score °C</div><div>(2021-2025)</div></div>,
		selector: 'shortTerm',
		sortable: true,
		right: true,
		cell: (row) => <div>{row.shortTerm.score}</div>
	},
	{
		name: <div><div>Mid Term Score °C</div><div>(2026-2036)</div></div>,
		selector: 'midTerm',
		sortable: true,
		right: true,
		cell: (row) => <div>{row.midTerm.score}</div>
	},
	{
		name: <div><div>Long Term Score °C</div><div>`({'>'}2036)`</div></div>,
		name: 'Long Term Score °C (>2036)',
		selector: 'longTerm',
		sortable: true,
		right: true,
		cell: (row) => <div>{row.longTerm.score}</div>
	},
	{
		name: <div><div>Coverage (%)</div><div style={{visibility:'hidden'}}>coverage</div></div>,
		selector: 'coverage',
		sortable: true,
		right: true
	}
];
const companyAnalysisCells = [
	{
		name: <div><div>Company Name</div><div style={{visibility:'hidden'}}>portfolio</div></div>,
		selector: 'company_name',
		sortable: true,
		right: false,
		wrap: true,
		style: {
			height: 50,
			fontSize: 13
		}
	},
	{
		name: <div><div>Sector</div><div style={{visibility:'hidden'}}>portfolio</div></div>,
		selector: 'sector',
		sortable: true,
		right: false,
		wrap: true
	},
	{
		name: <div><div>Contribution</div><div>(°C)</div></div>,
		selector: 'contribution',
		sortable: true,
		right: true
	},
	{
		name: <div><div>Temperature Score</div><div>(°C)</div></div>,
		selector: 'temperature_score',
		sortable: true,
		right: true
	},
	{
		name: <div><div>Ownership</div><div>Percentage (°C)</div></div>,
		selector: 'ownership_percentage',
		sortable: true,
		right: true
	},
	{
		name: <div><div>Portfolio Percentage</div><div>(°C)</div></div>,
		selector: 'portfolio_percentage',
		sortable: true,
		right: true
	}
];
const targetSettingCells = [
	{
		name: 'Sector',
		selector: 'sector',
		sortable: true,
		right: false
	},
	{
		name: 'Portfolio',
		selector: 'port',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.port)}</div>
	},
	{
		name: 'Allowance',
		selector: 'allowance',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.allowance)}</div>
	},
	{
		name: 'Annual Reduction %',
		selector: 'annualRed',
		sortable: true,
		right: true,
		cell: (row) => <div>{new Intl.NumberFormat().format(row.annualRed)}</div>
	}
];
const companyProfileCells = [
	{
		name: 'Summary',
		selector: 'name',
		sortable: true,
		right: false,
		wrap:true
	},
	{
		name: '',
		selector: 'summary',
		sortable: true,
		right: true
	}
];
const missingCoverageCells=[
	{
		name: 'ISIN',
		selector: 'ISIN',
		sortable: true,
		right: false
	},
	{
		name: 'Weight',
		selector: 'Weight',
		sortable: true,
		right: true
	},
	{
		name: 'Fundamentals Covered',
		selector: 'Fundamentals_Covered',
		sortable: true,
		right: true
	},
	{
		name: 'Emissions Covered',
		selector: 'Emissions_Covered',
		sortable: true,
		right: true
	},
	{
		name: 'Price Covered',
		selector: 'Price_Covered',
		sortable: true,
		right: true
	},
]
const backgroundCells=[
	{
		name: 'Short Name',
		selector: 'shortName',
		sortable: true,
		right: false
	},
	{
		name: 'ISIN',
		selector: 'isin',
		sortable: true,
		right: true
	},
	{
		name: 'SASB SICS Industry',
		selector: 'sasb_industry',
		sortable: true,
		right: true
	},
	{
		name: 'Scope 1+2 Disclosure Category',
		selector: 'disclousre',
		sortable: true,
		right: true
	},
	{
		name: 'Portfolio Weight',
		selector: 'portfolio_weight',
		sortable: true,
		right: true
	},
]
export {
	avoidedEmissionCells,
	sovFootprintCells,
	sectoralScope3Cells,
	portOptimizationCells,
	riskContribCells,
	fossilFuelCells,
	countryFossilCells,
	coalPowerCells,
	tempScoreCells,
	companyAnalysisCells,
	targetSettingCells,
	companyProfileCells,
	missingCoverageCells,
	backgroundCells
};
