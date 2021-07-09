import React, { Component } from 'react'
import { Typography, List, Divider, Box } from '@material-ui/core'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Grid } from '@material-ui/core'

class UrgentemApi extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={8}>
          <Box style={{width:'60%'}} mt={4}>
            <Typography variant="h3">
              Urgentem Client API
            </Typography>
            <br />
            <Divider />
            <br />
            <Box p={1}>
              <Typography variant="h4">API Call</Typography>
            </Box>
            <Box p={1}>
              <Typography>
                Via API you can upload a portfolio in an Excel file to get data
                for securities in your portfolio. Currently we support the
                following excel file formats for the portfolio:
              </Typography>
              <List>
                <Typography>1. .xslx</Typography>
                <Typography>2. .xls</Typography>
                <Typography>3. .csv</Typography>
              </List>

              <div>
                <Typography>
                  The excel file should have one worksheet (except for csv). It
                  should have the following columns:
                </Typography>
                <List>
                  <Typography>
                    1. ISIN <code>{'<string>'}</code>
                  </Typography>
                  <Typography>
                    {
                      '2.	Ticker<string> in the format `ssss ee` where `ssss` is the Bloomberg ticker symbol and `ee` is the Bloomberg exchange code, example: `AAPL US`'
                    }
                  </Typography>
                  <Typography>
                    {'3.	Year <string in the `yyyy` format, example `2020`>'}
                  </Typography>
                  <Typography>
                    {
                      '4.	Field <string, example `IntensityAcceptedScope123Total`>. You have have multiple fields each separated by a semi-colon (;). Example `IntensityAcceptedScope123Total;IntensityAcceptedScope1Total`'
                    }{' '}
                  </Typography>
                </List>
              </div>
              <div>
                <Typography>
                  The `Field` can be one field or a group. Here are the possible
                  group values:{' '}
                </Typography>
                <List>
                  <Typography>1. avg_int_cols</Typography>
                  <Typography>{'2.	max_int_cols'}</Typography>
                  <Typography>{'3.	rep_emis_cols'}</Typography>
                  <Typography>{'4.	rep_int_cols'} </Typography>
                  <Typography>{'5.	sovs'} </Typography>

                  <Typography>{'6.	summary'} </Typography>
                </List>
                <Typography>
                  You can also mix group values with fields. Example
                  `IntensityAcceptedScope123Total;IntensityAcceptedScope1Total;avg_int_cols;sovs`
                </Typography>
              </div>
            </Box>
            <br />
            <Divider />
            <br />
            <div>
              <Box p={1}>
                <Typography variant="h5">
                  Request: in .xlsx, .xls or .csv
                </Typography>
                <Typography variant="h6">Sample Request csv</Typography>
                <Box p={1}>
                  <List>
                    <Typography>{'ISIN,Ticker,Year,Field'}</Typography>
                    <Typography>
                      {'CH0008742519,SCMN SW,2018,Scope12_Intensity_Revenue'}
                    </Typography>
                    <Typography>{'ES0178430E18,TEF SM,2018,'}</Typography>
                    <Typography>
                      {'JP3165650007,9437 JP,2018,max_int_cols'}
                    </Typography>
                    <Typography>
                      {'US0378331005,AAPL US,2018,avg_int_cols'}
                    </Typography>
                    <Typography>
                      {'JP3973400009,7752 JP,2018,Summary'}
                    </Typography>
                    <Typography>
                      {'CA05534B7604,BXX CN,2018,Scope12_Intensity_Revenue'}
                    </Typography>
                    <Typography>
                      {'FR0000133308,ORA FP,2018,Scope12_Intensity_Revenue'}
                    </Typography>
                    <Typography>
                      {
                        'JP3201200007,7733 JP,2018,IntensityAcceptedScope123Total;IntensityAvgInferenceScope3Franchises'
                      }
                    </Typography>
                    <Typography>
                        GB0030913577,BT/A LN,2018,IntensityAvgInferenceScope2LocationGrossSource;
                    </Typography>
                    <Typography>
                    IntensityReportedScope3Investments;IntensityAcceptedScope12TotalSource
                    </Typography>
                    <Typography>
                      {
                        'US0758871091,BDX US,2018,IntensityAcceptedScope2LocationGrossSource;IntensityAcceptedScope2LocationGross'
                      }
                    </Typography>
                  </List>
                </Box>
              </Box>
            </div>
            <br />
            <Divider />
            <br />
            <div>
              <Typography variant="h5">Response: JSON</Typography>
              <Typography variant="h6">Sample Response</Typography>
              <Typography> </Typography>
              <SyntaxHighlighter language="javascript" style={docco}>
                {`{
    "status": "Success",
    "data": [
        {
            "SelShortName": "ORANGE",
            "SelISIN": "FR0000133308",
            "SelTkr": "ORA FP",
            "IntensityAcceptedScope123Total": 158.94537249585,
            "Year": 2018
        },
        {
            "SelShortName": "SWISSCOM AG-REG",
            "SelISIN": "CH0008742519",
            "SelTkr": "SCMN SW",
            "IntensityAcceptedScope123Total": 38.9021564029189,
            "Year": 2018
        },
        {
            "SelShortName": "",
            "SelISIN": "CA05534B7604",
            "SelTkr": "BXX CN",
            "IntensityAcceptedScope123Total": "",
            "Year": 2018
        },
        {
            "SelShortName": "TELEFONICA",
            "SelMarketCapD1": 44420000000.0,
            "SelISIN": "ES0178430E18",
            "SelTkr": "TEF SM",
            "SelSEDOL1": "5732524",
            "SelRevenueY": 58754779525.9226,
            "GICSIndustryGroupName": "Telecommunication Services",
            "GICSSectorName": "Communication Services",
            "SelETCountryLF": "Spain",
            "SelRegion": "Europe",
            "SelMarketStatus": "Dev",
            "SelETSizeSecurity": "L",
            "DataSource": "CDP",
            "DisclosureScope12Category": 1.0,
            "DisclosureNumberofS3Categories": 15.0,
            "IntensityAcceptedScope123Total": 85.372738972744,
            "IntensityAcceptedScope12Total": 23.1935249373254,
            "IntensityAcceptedScope3Total": 62.1792140354186,
            "IntensityReportedScope12Total": 23.1935249373254,
            "IntensityReportedScope3Total": 41.8802665968404,
            "SASBSICSSector": "Technology and Communications",
            "SASBSICSSubsector": "Telecommunications",
            "SASBSICSIndustry": "Telecommunication Services",
            "Group": "Telecommunications",
            "Subgroup": "Telephone-Integrated",
            "Sector": "Communications",
            "GICSSubIndustryName": "Integrated Telecommunication Services",
            "CDPAppeal": "",
            "EmissionsReportedScope12Total": 1362725.0,
            "EmissionsReportedScope1Gross": 328582.0,
            "EmissionsReportedScope2LocationGross": 1735429.0,
            "EmissionsReportedScope2MarketNet": 1034143.0,
            "EmissionsReportedScope3Total": 2460656.0,
            "EmissionsReportedScope3PurchasedGoodsandServices": 1059229.0,
            "EmissionsReportedScope3CapitalGoods": 457448.0,
            "EmissionsReportedScope3FuelandEnergyRelatedActivities": 269026.0,
            "EmissionsReportedScope3UpstreamTransportandDistribution": 0.0,
            "EmissionsReportedScope3WasteGenerated": 0.0,
            "EmissionsReportedScope3BusinessTravel": 70361.0,
            "EmissionsReportedScope3EmployeeCommuting": 0.0,
            "EmissionsReportedScope3UpstreamLeasedAssets": 0.0,
            "EmissionsReportedScope3DownstreamTransportDistribution": 0.0,
            "EmissionsReportedScope3ProcessingofSoldProducts": 0.0,
            "EmissionsReportedScope3UseofSoldProducts": 604592.0,
            "EmissionsReportedScope3EndofLifeTreatmentofSoldProducts": 0.0,
            "EmissionsReportedScope3DownstreamLeasedAssets": 0.0,
            "EmissionsReportedScope3Franchises": 0.0,
            "EmissionsReportedScope3Investments": 0.0,
            "EmissionsReportedScope3OtherDownstream": "",
            "EmissionsReportedScope3OtherUpstream": "",
            "EmissionsReportedScope3OtherUnspecified": "",
            "EmissionsReportedScope3OtherBundled": "",
            "EmissionsReportedScope3OtherTotal": "",
            "IntensityReportedScope1Gross": 5.5924524837779,
            "IntensityReportedScope2LocationGross": 29.5369320944854,
            "IntensityReportedScope2MarketNet": 17.6010724535475,
            "IntensityReportedScope3PurchasedGoodsandServices": 18.0280351691194,
            "IntensityReportedScope3CapitalGoods": 7.78574664406216,
            "IntensityReportedScope3FuelandEnergyRelatedActivities": 4.57881174836368,
            "IntensityReportedScope3UpstreamTransportandDistribution": 0.0,
            "IntensityReportedScope3WasteGenerated": 0.0,
            "IntensityReportedScope3BusinessTravel": 1.19754140278864,
            "IntensityReportedScope3EmployeeCommuting": 0.0,
            "IntensityReportedScope3UpstreamLeasedAssets": 0.0,
            "IntensityReportedScope3DownstreamTransportDistribution": 0.0,
            "IntensityReportedScope3ProcessingofSoldProducts": 0.0,
            "IntensityReportedScope3UseofSoldProducts": 10.2901316325065,
            "IntensityReportedScope3EndofLifeTreatmentofSoldProducts": 0.0,
            "IntensityReportedScope3DownstreamLeasedAssets": 0.0,
            "IntensityReportedScope3Franchises": 0.0,
            "IntensityReportedScope3Investments": 0.0,
            "IntensityReportedScope3OtherDownstream": "",
            "IntensityReportedScope3OtherUpstream": "",
            "IntensityReportedScope3OtherUnspecified": "",
            "IntensityReportedScope3OtherTotal": 0.0,
            "IntensityAcceptedScope12TotalSource": "Reported",
            "IntensityAcceptedScope1GrossSource": "Reported",
            "IntensityAcceptedScope1Gross": 5.5924524837779,
            "IntensityAcceptedScope2LocationGrossSource": "Reported",
            "IntensityAcceptedScope2LocationGross": 29.5369320944854,
            "IntensityAcceptedScope2MarketNetSource": "Reported",
            "IntensityAcceptedScope2MarketNet": 17.6010724535475,
            "IntensityAcceptedScope3PurchasedGoodsandServicesSource": "Reported",
            "IntensityAcceptedScope3PurchasedGoodsandServices": 18.0280351691194,
            "IntensityAcceptedScope3CapitalGoodsSource": "Reported",
            "IntensityAcceptedScope3CapitalGoods": 7.78574664406216,
            "IntensityAcceptedScope3FuelandEnergyRelatedActivitiesSource": "Reported",
            "IntensityAcceptedScope3FuelandEnergyRelatedActivities": 4.57881174836368,
            "IntensityAcceptedScope3UpstreamTransportandDistributionSource": "Winsorized - Lower Threshold - Up to sector winsor",
            "IntensityAcceptedScope3UpstreamTransportandDistribution": 0.0742862039277063,
            "IntensityAcceptedScope3WasteGeneratedSource": "Winsorized - Lower Threshold - Up to sector winsor",
            "IntensityAcceptedScope3WasteGenerated": 0.00414438518331906,
            "IntensityAcceptedScope3BusinessTravelSource": "Reported",
            "IntensityAcceptedScope3BusinessTravel": 1.19754140278864,
            "IntensityAcceptedScope3EmployeeCommutingSource": "Inferred - Upper Threshold - Up to sector winsor",
            "IntensityAcceptedScope3EmployeeCommuting": 19.7561851263657,
            "IntensityAcceptedScope3UpstreamLeasedAssetsSource": "Reported 0, relevant lower threshold 0.03",
            "IntensityAcceptedScope3UpstreamLeasedAssets": 0.0,
            "IntensityAcceptedScope3DownstreamTransportDistributionSource": "Winsorized - Lower Threshold - Up to sector winsor",
            "IntensityAcceptedScope3DownstreamTransportDistribution": 0.049497411462375,
            "IntensityAcceptedScope3ProcessingofSoldProductsSource": "Reported 0, relevant lower threshold 1.87",
            "IntensityAcceptedScope3ProcessingofSoldProducts": 0.0,
            "IntensityAcceptedScope3UseofSoldProductsSource": "Reported",
            "IntensityAcceptedScope3UseofSoldProducts": 10.2901316325065,
            "IntensityAcceptedScope3EndofLifeTreatmentofSoldProductsSource": "Winsorized - Lower Threshold - Up to sector winsor",
            "IntensityAcceptedScope3EndofLifeTreatmentofSoldProducts": 0.00260592279683332,
            "IntensityAcceptedScope3DownstreamLeasedAssetsSource": "Reported 0, relevant lower threshold 0.01",
            "IntensityAcceptedScope3DownstreamLeasedAssets": 0.0,
            "IntensityAcceptedScope3FranchisesSource": "Reported 0, relevant lower threshold 1.09",
            "IntensityAcceptedScope3Franchises": 0.0,
            "IntensityAcceptedScope3InvestmentsSource": "Winsorized - Lower Threshold - Up to sector max",
            "IntensityAcceptedScope3Investments": 0.412228388842311,
            "IntensityAvgInferenceScope12TotalSource": "Reported",
            "IntensityAvgInferenceScope12Total": 23.1935249373254,
            "IntensityAvgInferenceScope1GrossSource": "Reported",
            "IntensityAvgInferenceScope1Gross": 5.5924524837779,
            "IntensityAvgInferenceScope2LocationGrossSource": "Reported",
            "IntensityAvgInferenceScope2LocationGross": 29.5369320944854,
            "IntensityAvgInferenceScope2MarketNetSource": "Reported",
            "IntensityAvgInferenceScope2MarketNet": 17.6010724535475,
            "IntensityAvgInferenceScope3PurchasedGoodsandServicesSource": "Reported",
            "IntensityAvgInferenceScope3PurchasedGoodsandServices": 18.0280351691194,
            "IntensityAvgInferenceScope3CapitalGoodsSource": "Reported",
            "IntensityAvgInferenceScope3CapitalGoods": 7.78574664406216,
            "IntensityAvgInferenceScope3FuelandEnergyRelatedActivitiesSource": "Reported",
            "IntensityAvgInferenceScope3FuelandEnergyRelatedActivities": 4.57881174836368,
            "IntensityAvgInferenceScope3UpstreamTransportandDistributionSource": "Winsorized - Lower Threshold - Up to sector winsor",
            "IntensityAvgInferenceScope3UpstreamTransportandDistribution": 0.0742862039277063,
            "IntensityAvgInferenceScope3WasteGeneratedSource": "Winsorized - Lower Threshold - Up to sector winsor",
            "IntensityAvgInferenceScope3WasteGenerated": 0.00414438518331906,
            "IntensityAvgInferenceScope3BusinessTravelSource": "Reported",
            "IntensityAvgInferenceScope3BusinessTravel": 1.19754140278864,
            "IntensityAvgInferenceScope3EmployeeCommutingSource": "Inferred - Average - Up to sector winsor",
            "IntensityAvgInferenceScope3EmployeeCommuting": 2.98502541929827,
            "IntensityAvgInferenceScope3UpstreamLeasedAssetsSource": "Reported 0, relevant lower threshold 0.03",
            "IntensityAvgInferenceScope3UpstreamLeasedAssets": 0.0,
            "IntensityAvgInferenceScope3DownstreamTransportDistributionSource": "Winsorized - Lower Threshold - Up to sector winsor",
            "IntensityAvgInferenceScope3DownstreamTransportDistribution": 0.049497411462375,
            "IntensityAvgInferenceScope3ProcessingofSoldProductsSource": "Reported 0, relevant lower threshold 1.87",
            "IntensityAvgInferenceScope3ProcessingofSoldProducts": 0.0,
            "IntensityAvgInferenceScope3UseofSoldProductsSource": "Reported",
            "IntensityAvgInferenceScope3UseofSoldProducts": 10.2901316325065,
            "IntensityAvgInferenceScope3EndofLifeTreatmentofSoldProductsSource": "Winsorized - Lower Threshold - Up to sector winsor",
            "IntensityAvgInferenceScope3EndofLifeTreatmentofSoldProducts": 0.00260592279683332,
            "IntensityAvgInferenceScope3DownstreamLeasedAssetsSource": "Reported 0, relevant lower threshold 0.01",
            "IntensityAvgInferenceScope3DownstreamLeasedAssets": 0.0,
            "IntensityAvgInferenceScope3FranchisesSource": "Reported 0, relevant lower threshold 1.09",
            "IntensityAvgInferenceScope3Franchises": 0.0,
            "IntensityAvgInferenceScope3InvestmentsSource": "Winsorized - Lower Threshold - Up to sector max",
            "IntensityAvgInferenceScope3Investments": 0.412228388842311,
            "IntensityAcceptedScope3TotalSource": "Sum of Accepted Category Intensities",
            "IntensityAvgInferenceScope3TotalSource": "Winsorized - Lower Threshold - Industry winsor",
            "IntensityAvgInferenceScope3Total": 78.6657135866672,
            "IntensityAvgInferenceScope123Total": 101.859238523993,
            "BICSL4SubIndNm": "Wireless Telecom Services",
            "BICSL1SectNm": "Communications",
            "BICSL2IGNm": "Telecom",
            "BICSL3IndNm": "Telecom Carriers",
            "BICSIntensityAverageInfScope12TotalSource": "Reported",
            "BICSIntensityAverageInfScope12Total": 23.1935249373254,
            "BICSIntensityAverageInfScope3PurchasedGoodsandServicesSource": "Reported",
            "BICSIntensityAverageInfScope3PurchasedGoodsandServices": 18.0280351691194,
            "BICSIntensityAverageInfScope3CapitalGoodsSource": "Reported",
            "BICSIntensityAverageInfScope3CapitalGoods": 7.78574664406216,
            "BICSIntensityAverageInfScope3FuelandEnergyRelatedActivitiesSource": "Reported",
            "BICSIntensityAverageInfScope3FuelandEnergyRelatedActivities": 4.57881174836368,
            "BICSIntensityAverageInfScope3UpstreamTransportandDistributionSource": "Reported",
            "BICSIntensityAverageInfScope3UpstreamTransportandDistribution": 0.0,
            "BICSIntensityAverageInfScope3WasteGeneratedSource": "Reported",
            "BICSIntensityAverageInfScope3WasteGenerated": 0.0,
            "BICSIntensityAverageInfScope3BusinessTravelSource": "Reported",
            "BICSIntensityAverageInfScope3BusinessTravel": 1.19754140278864,
            "BICSIntensityAverageInfScope3EmployeeCommutingSource": "Inferred - Average - Sub.Industry",
            "BICSIntensityAverageInfScope3EmployeeCommuting": 1.57012517907592,
            "BICSIntensityAverageInfScope3UpstreamLeasedAssetsSource": "Reported 0",
            "BICSIntensityAverageInfScope3UpstreamLeasedAssets": 0.0,
            "BICSIntensityAverageInfScope3DownstreamTransportDistributionSource": "Reported",
            "BICSIntensityAverageInfScope3DownstreamTransportDistribution": 0.0,
            "BICSIntensityAverageInfScope3ProcessingofSoldProductsSource": "Reported 0",
            "BICSIntensityAverageInfScope3ProcessingofSoldProducts": 0.0,
            "BICSIntensityAverageInfScope3UseofSoldProductsSource": "Reported",
            "BICSIntensityAverageInfScope3UseofSoldProducts": 10.2901316325065,
            "BICSIntensityAverageInfScope3EndofLifeTreatmentofSoldProductsSource": "Reported",
            "BICSIntensityAverageInfScope3EndofLifeTreatmentofSoldProducts": 0.0,
            "BICSIntensityAverageInfScope3DownstreamLeasedAssetsSource": "Reported 0",
            "BICSIntensityAverageInfScope3DownstreamLeasedAssets": 0.0,
            "BICSIntensityAverageInfScope3FranchisesSource": "Reported 0",
            "BICSIntensityAverageInfScope3Franchises": 0.0,
            "BICSIntensityAverageInfScope3InvestmentsSource": "Reported 0",
            "BICSIntensityAverageInfScope3Investments": 0.0,
            "BICSIntensityAvgInferenceScope3Total": 43.4503917759163,
            "Year": 2018
        },
        {
            "SelShortName": "NTT DOCOMO INC",
            "SelISIN": "JP3165650007",
            "SelTkr": "9437 JP",
            "IntensityAcceptedScope3Total": 52.1019642084603,
            "IntensityAcceptedScope12TotalSource": "Reported",
            "IntensityAcceptedScope1GrossSource": "Reported",
            "IntensityAcceptedScope1Gross": 1.56899908693166,
            "IntensityAcceptedScope2LocationGrossSource": "Inferred - Upper Threshold - Industry winsor",
            "IntensityAcceptedScope2LocationGross": 262.518145836943,
            "IntensityAcceptedScope2MarketNetSource": "Reported",
            "IntensityAcceptedScope2MarketNet": 35.9504991870573,
            "IntensityAcceptedScope3PurchasedGoodsandServicesSource": "Reported",
            "IntensityAcceptedScope3PurchasedGoodsandServices": 2.56939516841893,
            "IntensityAcceptedScope3CapitalGoodsSource": "Reported",
            "IntensityAcceptedScope3CapitalGoods": 38.2898027851384,
            "IntensityAcceptedScope3FuelandEnergyRelatedActivitiesSource": "Reported",
            "IntensityAcceptedScope3FuelandEnergyRelatedActivities": 2.73433578478633,
            "IntensityAcceptedScope3UpstreamTransportandDistributionSource": "Reported",
            "IntensityAcceptedScope3UpstreamTransportandDistribution": 0.246243725050005,
            "IntensityAcceptedScope3WasteGeneratedSource": "Reported",
            "IntensityAcceptedScope3WasteGenerated": 0.0334597190315003,
            "IntensityAcceptedScope3BusinessTravelSource": "Winsorized - Lower Threshold - Industry winsor",
            "IntensityAcceptedScope3BusinessTravel": 0.101760090257462,
            "IntensityAcceptedScope3EmployeeCommutingSource": "Winsorized - Lower Threshold - Up to sector winsor",
            "IntensityAcceptedScope3EmployeeCommuting": 0.127944889891862,
            "IntensityAcceptedScope3UpstreamLeasedAssetsSource": "Reported 0, relevant lower threshold 0.03",
            "IntensityAcceptedScope3UpstreamLeasedAssets": 0.0,
            "IntensityAcceptedScope3DownstreamTransportDistributionSource": "Winsorized - Lower Threshold - Up to sector winsor",
            "IntensityAcceptedScope3DownstreamTransportDistribution": 0.049497411462375,
            "IntensityAcceptedScope3ProcessingofSoldProductsSource": "Reported 0, relevant lower threshold 1.87",
            "IntensityAcceptedScope3ProcessingofSoldProducts": 0.0,
            "IntensityAcceptedScope3UseofSoldProductsSource": "Reported",
            "IntensityAcceptedScope3UseofSoldProducts": 6.00322536128804,
            "IntensityAcceptedScope3EndofLifeTreatmentofSoldProductsSource": "Reported",
            "IntensityAcceptedScope3EndofLifeTreatmentofSoldProducts": 0.0220235218995217,
            "IntensityAcceptedScope3DownstreamLeasedAssetsSource": "Reported 0, relevant lower threshold 0.01",
            "IntensityAcceptedScope3DownstreamLeasedAssets": 0.0,
            "IntensityAcceptedScope3FranchisesSource": "Reported",
            "IntensityAcceptedScope3Franchises": 1.92427575123583,
            "IntensityAcceptedScope3InvestmentsSource": "Reported 0, relevant lower threshold 0.41",
            "IntensityAcceptedScope3Investments": 0.0,
            "IntensityAcceptedScope3TotalSource": "Sum of Accepted Category Intensities",
            "Year": 2018
        },
        {
            "SelShortName": "APPLE INC",
            "SelISIN": "US0378331005",
            "SelTkr": "AAPL US",
            "IntensityAvgInferenceScope1GrossSource": "Reported",
            "IntensityAvgInferenceScope1Gross": 0.198037812889885,
            "IntensityAvgInferenceScope2LocationGrossSource": "Inferred - Average - Industry winsor",
            "IntensityAvgInferenceScope2LocationGross": 56.9998379312286,
            "IntensityAvgInferenceScope2MarketNetSource": "Winsorized - Lower Threshold - Up to subsector winsor",
            "IntensityAvgInferenceScope2MarketNet": 1.29736523076038,
            "IntensityAvgInferenceScope3PurchasedGoodsandServicesSource": "Reported",
            "IntensityAvgInferenceScope3PurchasedGoodsandServices": 92.0456825776281,
            "IntensityAvgInferenceScope3CapitalGoodsSource": "Winsorized - Lower Threshold - Up to subsector winsor",
            "IntensityAvgInferenceScope3CapitalGoods": 0.543515725819148,
            "IntensityAvgInferenceScope3FuelandEnergyRelatedActivitiesSource": "Winsorized - Lower Threshold - Industry winsor",
            "IntensityAvgInferenceScope3FuelandEnergyRelatedActivities": 0.146700216625088,
            "IntensityAvgInferenceScope3UpstreamTransportandDistributionSource": "Reported",
            "IntensityAvgInferenceScope3UpstreamTransportandDistribution": 1.52682411858625,
            "IntensityAvgInferenceScope3WasteGeneratedSource": "Winsorized - Lower Threshold - Industry winsor",
            "IntensityAvgInferenceScope3WasteGenerated": 0.0155150677534349,
            "IntensityAvgInferenceScope3BusinessTravelSource": "Reported",
            "IntensityAvgInferenceScope3BusinessTravel": 0.527844909568389,
            "IntensityAvgInferenceScope3EmployeeCommutingSource": "Reported",
            "IntensityAvgInferenceScope3EmployeeCommuting": 0.750324995419528,
            "IntensityAvgInferenceScope3UpstreamLeasedAssetsSource": "Winsorized - Lower Threshold - Up to sector winsor",
            "IntensityAvgInferenceScope3UpstreamLeasedAssets": 0.00872506246914637,
            "IntensityAvgInferenceScope3DownstreamTransportDistributionSource": "Reported",
            "IntensityAvgInferenceScope3DownstreamTransportDistribution": 3.62075433836167,
            "IntensityAvgInferenceScope3ProcessingofSoldProductsSource": "Reported 0, relevant lower threshold 0.03",
            "IntensityAvgInferenceScope3ProcessingofSoldProducts": 0.0,
            "IntensityAvgInferenceScope3UseofSoldProductsSource": "Reported",
            "IntensityAvgInferenceScope3UseofSoldProducts": 20.503066735301,
            "IntensityAvgInferenceScope3EndofLifeTreatmentofSoldProductsSource": "Reported",
            "IntensityAvgInferenceScope3EndofLifeTreatmentofSoldProducts": 0.436235462453214,
            "IntensityAvgInferenceScope3DownstreamLeasedAssetsSource": "Reported 0, relevant lower threshold 0.05",
            "IntensityAvgInferenceScope3DownstreamLeasedAssets": 0.0,
            "IntensityAvgInferenceScope3FranchisesSource": "Reported 0, relevant lower threshold 0",
            "IntensityAvgInferenceScope3Franchises": 0.0,
            "IntensityAvgInferenceScope3InvestmentsSource": "Reported 0, relevant lower threshold 0.01",
            "IntensityAvgInferenceScope3Investments": 0.0,
            "Year": 2018
        },
        {
            "SelShortName": "RICOH CO LTD",
            "SelISIN": "JP3973400009",
            "SelTkr": "7752 JP",
            "SelETCountryLF": "Japan",
            "SelRegion": "Asia-Pacific",
            "DataSource": "CDP",
            "DisclosureScope12Category": 2.0,
            "DisclosureNumberofS3Categories": 15.0,
            "SASBSICSSector": "Technology and Communications",
            "SASBSICSSubsector": "Technology",
            "SASBSICSIndustry": "Hardware",
            "IntensityAvgInferenceScope12TotalSource": "Reported",
            "IntensityAvgInferenceScope3TotalSource": "Winsorized - Lower Threshold - Industry winsor",
            "Year": 2018
        },
        {
            "SelShortName": "OLYMPUS CORP",
            "SelISIN": "JP3201200007",
            "SelTkr": "7733 JP",
            "IntensityAcceptedScope123Total": 171.249021388784,
            "IntensityAvgInferenceScope3Franchises": 0.0,
            "Year": 2018
        },
        {
            "SelShortName": "BT GROUP PLC",
            "SelISIN": "GB0030913577",
            "SelTkr": "BT/A LN",
            "IntensityReportedScope3Investments": 0.0,
            "IntensityAcceptedScope12TotalSource": "Reported",
            "IntensityAvgInferenceScope2LocationGrossSource": "Reported",
            "Year": 2018
        },
        {
            "SelShortName": "BECTON DICKINSON",
            "SelISIN": "US0758871091",
            "SelTkr": "BDX US",
            "IntensityAcceptedScope2LocationGrossSource": "Reported",
            "IntensityAcceptedScope2LocationGross": 33.2663524352931,
            "Year": 2018
        }
    ]
}
`}
              </SyntaxHighlighter>
            </div>
            <br />
            <Divider />
            <br />
            <div>
              <Typography variant="h5">Python Code</Typography>
              <Typography variant="h6"> </Typography>
              <Typography> </Typography>
              <SyntaxHighlighter language="python" style={docco}>
                {`from requests import post
from argparse import ArgumentParser

parser = ArgumentParser()

parser.add_argument(
    "-fn",
    "--filename",
    type=str,
    help="enter the full path of the file: example: /Users/xyz/abc.xlsx",
    default='')
parser.add_argument(
    "-key",
    "--x_api_key",
    type=str,
    help="pls contact your Urgentum contact to get your API key",
    default='')
parser.add_argument(
    "-url",
    "--url",
    type=str,
    help="url should include the full end point, example: http://XXXXXX/files/upload",
    default='http://40.69.41.103/files/upload')
args = parser.parse_args()

if args.filename != '':
    file_ext = args.filename.split('.')[-1]
    if file_ext == 'xlsx':
        files2 = {'excel_file': (
            args.filename,
            open(args.filename, 'rb'),
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            {}
            )}
    elif file_ext == 'xls':
        files2 = {'excel_file': (
            args.filename,
            open(args.filename, 'rb'),
            'application/vnd.ms-excel',
            {}
            )}
    elif file_ext == 'csv':
        files2 = {
        'excel_file': open(args.filename, 'rb')
        } 
    headers = {'x-api-key': args.x_api_key,
    'Access-Control-Allow-Origin': '*'} 

    # url ="http://XXXXXXXXXXXXXX/files/upload"
    response = post(url=args.url,files=files2,headers=headers)

    print(response.status_code)
    print(response.text)

else:
    print('Please enter a filename with full path')

`}
              </SyntaxHighlighter>
            </div>
            <br />
            <Divider />
            <br />
            <div>
              <Typography variant="h5">R Code</Typography>
              <Typography variant="h6"> </Typography>
              <Typography> </Typography>
              <SyntaxHighlighter language="R" style={docco}>
                {`library(openxlsx)
library(jsonlite)
library(httr)

ET_data_request_API=function(path=path,key=key,url=url){
  if(length(grep(".xlsx",path))>0){
    returned_data=POST(url, body=list("excel_file"=upload_file(path, type= "application/vnd.ms-excel"),"Content-Type" = "multipart"), add_headers("x-api-key" = key,"Access-Control-Allow-Origin"="*"))
  } else {
    returned_data=POST(url, body=list("excel_file"=upload_file(path, "text/csv"),"Content-Type" = "multipart"), add_headers("x-api-key" = key,"Access-Control-Allow-Origin"="*"))
  }
  data_toTEXT=suppressWarnings(content(returned_data, as = "text"))
  dataframe=fromJSON(data_toTEXT)
  #View(dataframe$data)

  if("data" %in% names(dataframe)){
    print("Data returned")
  } else {
    print("Faulty request")
  }
  return(dataframe$data)
}

#### File to pass ####-------------------------------------------------------
path=(“XXXXXXXXXXXXXXXXXX/XXXXXXXXXX/XXXXXXX.csv")   #or .xlsx
key="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx"
url="http://XXXXXXXXXXXXXX/files/upload"

APIdata=ET_data_request_API(path=paste0(path,first),key=key,url=url)


`}
              </SyntaxHighlighter>
            </div>
          </Box>
        </Grid>
      </Grid>
    )
  }
}

export default UrgentemApi
