import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAvoidedEmissions } from '../../redux/actions/footprintActions';
import HorizontalBar from '../../components/ChartsComponents/HorizontalBar';
import DataTable from '../../components/Table/DataTable';
import filterConfig from '../../util/filter-config'

const categories = [ 'Scope 1+2', 'Scope 3', 'Scope 1+2+3', 'Avoided Emissions', 'Net Emissions' ];
const headCells = [
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

const AvoidedEmission = ({}) => {
	const currentPortfolio = useSelector((state) => state.auth.currentPortfolio);
	const currentBenchmark = useSelector((state) => state.auth.currentBenchmark);
	const currentYear = useSelector((state) => state.auth.currentYear);
	const currentCurrency = useSelector((state) => state.auth.currentCurrency);
	const currentQuarter = useSelector((state) => state.auth.currentQuarter);
	const currentUser = useSelector((state) => state.auth.currentUser);
	const filterItem = useSelector((state) => state.auth.filterItem);
	const avoidedEmissions = useSelector((state) => state.footprint.avoidedEmission);

	const [ chartData, setChartData ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ tableData, setTableData ] = useState([]);
	const [ yAxisTitle, setYAxisTitle ] = useState('');

	const dispatch = useDispatch();

	const fetchDetails = async () => {
		setLoading(true);
		const { sector, footprintMetric, marketValue, assetClass, inferenceType } = filterItem;

		const data = {
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
		await dispatch(getAvoidedEmissions(data));
		setLoading(false);
	};

	const getTableData = () => {
		const data =
			avoidedEmissions && Object.keys(avoidedEmissions).length > 0
				? avoidedEmissions['data']['PF_Avoided_Emissions']
				: [];

		let tableData = [];
		if (data && data.length > 0) {
			tableData = [
				{
					name: data[1]['name'],
					Sc12: data[1]['Sc12'],
					Sc3: data[1]['Sc3'],
					Sc123: data[1]['Sc123'],
					avoidedEmissions: data[1]['AvoidedEmissions'],
					netEmissions: data[1]['NetEmissions']
				},
				{
					name: data[0]['name'],
					Sc12: data[0]['Sc12'],
					Sc3: data[0]['Sc3'],
					Sc123: data[0]['Sc123'],
					avoidedEmissions: data[0]['AvoidedEmissions'],
					netEmissions: data[0]['NetEmissions']
				}
			];
		}
		setTableData(tableData);
	};

	const getEmissionChartData = () => {
		const data =
			avoidedEmissions && Object.keys(avoidedEmissions).length > 0
				? avoidedEmissions['data']['PF_Avoided_Emissions']
				: [];
		let chartData = [];

		const title =
			avoidedEmissions && Object.keys(avoidedEmissions).length > 0
				? avoidedEmissions['data']['y_axis_title']
				: '';

		if (data && data.length > 0) {
			const portSc12 = data[1]['Sc12'];
			const portSc123 = data[1]['Sc123'];
			const portSc3 = data[1]['Sc3'];
			const portavoidedEmissions = data[1]['AvoidedEmissions'];
			const portnetEmissions = data[1]['NetEmissions'];
			const benchSc12 = data[0]['Sc12'];
			const benchSc123 = data[0]['Sc123'];
			const benchSc3 = data[0]['Sc3'];
			const benchavoidedEmissions = data[0]['AvoidedEmissions'];
			const benchnetEmissions = data[0]['NetEmissions'];

			chartData = [
				{
					name: 'portfolio',
					data: [ portSc12, portSc3, portSc123, portavoidedEmissions, portnetEmissions ]
				},
				{
					name: 'benchmark',
					data: [ benchSc12, benchSc3, benchSc123, benchavoidedEmissions, benchnetEmissions ]
				}
			];
		}
		setChartData(chartData);
		setYAxisTitle(title);
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	useEffect(
		() => {
			getTableData();
			getEmissionChartData();
		},
		[ avoidedEmissions ]
	);

    const { footprintMetric} = filterItem;
    let fpMetricOptions=filterConfig[1]['tagsList'];
    let metric='';

    if(fpMetricOptions && fpMetricOptions.length > 0){
        fpMetricOptions.map(option=>{
            if(option.value == footprintMetric){
                metric=option.name
            }
        })
    }
    const chartTitle=`Portfolio Intensity - ${metric}`

	return (
		<React.Fragment>
				<HorizontalBar
					categories={categories}
					data={chartData}
					chartKey="AVOIDED_EMISSIONS"
					yAxisTitle={yAxisTitle}
                    chartTitle={chartTitle}
				/>
			<DataTable data={tableData} columns={headCells} tableHeading="AVOIDED_EMISSIONS" loading={loading} />
		</React.Fragment>
	);
};
export default AvoidedEmission;
