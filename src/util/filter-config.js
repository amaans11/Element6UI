 const data = [
    {
      grpname: "Sector Classification",
      grpKey:'sector',
      tagsList: [
        { name: "SASB", value: "SASB", selected: true },
        { name: "Standard", value: "GICS", selected: false },
      ],
    },
    {
      grpname: "Footprint Metric",
      grpKey:'footprintMetric',
      tagsList: [
        { name: "Weighted Average Intensity (Revenue)", value: "WeightAvgRev", selected: true },
        { name: "Weighted Average Intensity (Market Value)", value: "WeightAvgMarketVal", selected: false },
        { name: "Total Carbon Emissions", value: "TotalCarbEmis", selected: false },
        { name: "Portfolio Carbon Intensity (Revenue)", value: "CarbIntensityRev", selected: false },
        { name: "Portfolio Carbon Intensity (Market Value)", value: "CarbIntensityMarketVal", selected: false },
      ],
    },
    {
      grpname: "Market Value",
      grpKey:'marketValue',
      tagsList: [
        { name: "Market Capitalization", value: "MarketCap", selected: true },
        { name: "Market Capitalization + Total Debt", value: "MarketCapDebt", selected: false },
        { name: "Total Debt", value: "Debt", selected: false },
        { name: "Enterprise Value", value: "EnterpriseVal", selected: false },
        { name: "Enterprise Value Including Cash", value: "EnterpriseValCash", selected: false },
      ],
    },
    {
      grpname: "Asset Class",
      grpKey:'assetClass',
      tagsList: [
        { name: "Equity", value: "Eq", selected: true },
        { name: "Corporate Bonds", value: "CB", selected: true },
        { name: "Loan", value: "Loan", selected: false },
      ],
    },
    {
      grpname: "Inference Type",
      grpKey:'inferenceType',
      tagsList: [
        { name: "Average", value: "Avg", selected: true },
        { name: "Maximum", value: "Max", selected: false },
      ],
    },
    {
      grpname: "Emissions",
      grpKey:'emission',
      tagsList: [
        { name: "Scope 1+2", value: "Sc12", selected: true },
        { name: "Scope 1+2+3", value: "Sc123", selected: false },
        { name: "Scope 3", value: "Sc3", selected: false },
      ],
    },
    {
      grpname: "Materiality Type",
      grpKey:'materiality',
      tagsList: [
        { name: "Portfolio", value: "matPort", selected: true },
        { name: "Sector", value: "matSector", selected: false },
      ],
    },
    {
      grpname: "Strategy",
      grpKey:'strategy',
      tagsList: [
        { name: "Carbon Momentum", value: "momentum", selected: true },
        { name: "Emissions Reduction", value: "emissions_reduction", selected: false },
      ],
    },
    {
      grpname: "Return Year",
      grpKey:'returnYear',
      tagsList: [
        { name: "5 Year Return", value: "5", selected: false },
        { name: "3 Year Return", value: "3", selected: true },
        { name: "1 Year Return", value: "1", selected: false },
      ],
    },
    {
      grpname: "Year",
      grpKey:'year',
      tagsList: [
        { name: "1 Year", value: "1Y", selected: true },
        { name: "3 Years", value: "3Y", selected: false },
        { name: "5 Years", value: "5Y", selected: false },
      ],
    },
    {
      grpname: "Intensity Contribution Scope",
      grpKey:'intensityScope',
      tagsList: [
        { name: "Scope 1+2", value: "Sc12", selected: true },
        { name: "Scope 1+2+3", value: "Sc123", selected: false },
      ],
    },
    {
      grpname: "Aggregation",
      grpKey:'aggregation',
      tagsList: [
        { name: "Weighted Average", value: "WATS", selected: true },
        { name: "Total Emissions", value: "TETS", selected: false },
        { name: "Market Owned Emissions", value: "MOTS", selected: false },
        { name: "Enterprise Owned Emissions", value: "EOTS", selected: false },
        { name: "Enterprise Value Including Cash Emissions", value: "ECOTS", selected: false },
        { name: "Revenue Owned Emissions", value: "ROTS", selected: false },

      ],
    },
    {
      grpname: "What-If Scenario",
      grpKey:'scenario',
      tagsList: [
        { name: "None", value: "0", selected: true },
        { name: "All companies without targets set a 1.5 degree target", value: "1", selected: false },
        { name: "All companies without targets set a 1.75 degree target", value: "2", selected: false },
        { name: "Top 10 contributors set 1.5 degree targets", value: "3", selected: false },
        { name: "Top 10 contributors set 1.75 degree targets", value: "4", selected: false },
      ]
    },
    {
      grpname: "Score Type",
      grpKey:'scoreType',
      tagsList: [
        { name: "Short Term Score", value: "shortTerm", selected: true },
        { name: "Mid Term Score", value: "midTerm", selected: false },
        { name: "Long Term Score", value: "longTerm", selected: false },
      ]
    },
    {
      grpname: "Default Value",
      grpKey:'defaultValue',
      tagsList: [
        { name: "0.50", value: "0.50", selected: false },
        { name: "1.00", value: "1.00", selected: false },
        { name: "1.50", value: "1.50", selected: false },
        { name: "2.00", value: "2.00", selected: false },
        { name: "2.50", value: "2.50", selected: false },
        { name: "3.00", value: "3.00", selected: false },
        { name: "3.20", value: "3.20", selected: true },
        { name: "3.50", value: "3.50", selected: false },
        { name: "4.00", value: "4.00", selected: false },
        { name: "4.50", value: "4.50", selected: false },
        { name: "5.00", value: "5.00", selected: false },
      ]
    },
    {
      grpname: "Set 1.5 Scenario",
      grpKey:'portScenario',
      tagsList: [
        { name: "SSP1", value: "SSP126", selected: false },
        { name: "SSP2", value: "SSP226", selected: false },
        { name: "Low Energy Demand", value: "LowEnergyDemand", selected: true },
      ]
    },
    {
      grpname: "Scenario Database",
      grpKey:'targetScenario',
      tagsList: [
        { name: "IPCC 1.5", value: "IPCC", selected: true },
        { name: "IEA", value: "IEA", selected: false },
        { name: "NGFS", value: "NGFS", selected: false },
      ]
    },
    {
      grpname: "Approach",
      grpKey:'approach',
      tagsList: [
        { name: "Market Share", value: "MarketShare", selected: false },
        { name: "Relative Alignment", value: "RelativeAlignment", selected: true },
      ]
    },
    {
      grpname: "Warming Scenario",
      grpKey:'warmingScenario',
      tagsList: [
        { name: "SSP1-26", value: "SSP126", selected: false },
        { name: "SSP2-26", value: "SSP226", selected: false },
        { name: "Low Energy Demand", value: "LowEnergyDemand", selected: true },
        { name: "SSP4-26", value: "SSP426", selected: false },
        { name: "SSP5-26", value: "SSP526", selected: false },
        { name: "Beyond 2 Degrees", value: "Beyond2", selected: true },
        { name: "2 Degrees", value: "2", selected: false },
        { name: "Reference Technology", value: "ReferenceTechnology", selected: false },
        { name: "Current policies (Hot house world, Rep)", value: "Current policies (Hot house world, Rep)", selected: true },
        { name: "Immediate 2C with CDR (Orderly, Rep)", value: "Immediate 2C with CDR (Orderly, Rep)", selected: false },
        { name: "Delayed 2C with CDR (Disorderly, Alt)", value: "Delayed 2C with CDR (Disorderly, Alt)", selected: false },
        { name: "Immediate 1.5C with CDR (Orderly, Alt)", value: "Immediate 1.5C with CDR (Orderly, Alt)", selected: false },
        { name: "Immediate 1.5C with limited CDR (Disorderly, Alt)", value: "Immediate 1.5C with limited CDR (Disorderly, Alt)", selected: false },
        { name: "Immediate 2C with limited CDR (Orderly, Alt)", value: "Immediate 2C with limited CDR (Orderly, Alt)", selected: false },
        { name: "Nationally determined contributions (NDCs) (Hot house world, Alt)", value: "Nationally determined contributions (NDCs) (Hot house world, Alt)", selected: false },
        { name: "Delayed 2C with limited CDR (Disorderly, Rep)", value: "Delayed 2C with limited CDR (Disorderly, Rep)", selected: false },
      ]
    },
    {
      grpname: "Alignment Year",
      grpKey:'alignmentYear',
      tagsList: [
        { name: "2020", value: "2020", selected: true },
        { name: "2030", value: "2030", selected: false },
        { name: "2040", value: "2040", selected: false },
        { name: "2050", value: "2050", selected: false },
        { name: "2060", value: "2060", selected: false },
      ]
    },

  ]
  
  
  export default data;
