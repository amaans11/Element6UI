 const data = [
    {
      grpname: "Sector Classification",
      grpKey:'sector',
      tagsList: [
        { name: "SASB", value: "SASB", selected: true },
        { name: "GICS", value: "GICS", selected: false },
      ],
    },
    {
      grpname: "Footprint Metric",
      grpKey:'footprintMetric',
      tagsList: [
        { name: "Weighted Average Intensity (Revenue)", value: "Revenue", selected: true },
        { name: "Weighted Average Intensity (Market Value)", value: "MarketVal", selected: false },
        { name: "Total Carbon Emissions", value: "FinancedEmis", selected: false },
        { name: "Portfolio Carbon Intensity (Revenue)", value: "PortInt", selected: false },
        { name: "Portfolio Carbon Intensity (Market Value)", value: "CarbFootMV", selected: false },
      ],
    },
    {
      grpname: "Market Value",
      grpKey:'marketValue',
      tagsList: [
        { name: "Market Capitalization", value: "Equity", selected: true },
        { name: "Market Capitalization + Total Debt", value: "EquityDebt", selected: false },
        { name: "Total Debt", value: "Debt", selected: false },
        { name: "Enterprise Value", value: "EV", selected: false },
      ],
    },
    {
      grpname: "Asset Class",
      grpKey:'assetClass',
      tagsList: [
        { name: "Equity", value: "Eq", selected: false },
        { name: "Corporate Bonds", value: "CB", selected: false },
        { name: "Equity + Corporate Bonds", value: "EqCB", selected: true },
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
        { name: "All companies without targets set a 2 degree target", value: "1", selected: false },
        { name: "All companies without targets set a 1.75 degree target", value: "2", selected: false },
        { name: "Enterprise Owned Emissions Weighted Temperature Score", value: "3", selected: false },
        { name: "Top 10 contributors set 2 degrees targets", value: "4", selected: false },
        { name: "Top 10 contributors set 1.75 degree targets", value: "5", selected: false },
      ]
    },
    {
      grpname: "Score Type",
      grpKey:'scoreType',
      tagsList: [
        { name: "Short Term Score", value: "shortTerm", selected: true },
        { name: "Mid Term Score", value: "midTerm", selected: false },
        { name: "Mid Term Score", value: "longTerm", selected: false },
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
    }

  ]
  
  
  export default data;