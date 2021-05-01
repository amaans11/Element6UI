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
  ]
  
  
  export default data;