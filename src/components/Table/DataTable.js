import React from 'react';
import DataTable from 'react-data-table-component';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Card, Button } from '@material-ui/core';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import CONFIG from '../../util/config';

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: '100%'
	},
	textField: {
		minWidth: '50%',
		marginTop: 7,
		marginLeft: 10
	},
	actionItem: {
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(2)
	},
	select: {
		height: 40,
		marginTop: 7
	},
	exportIcon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 5
	}
}));

class ReactDataTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFilterOption: '',
			filterValue: '',
			isFilter: false,
			filteredData: []
		};
	}
	convertArrayOfObjectsToCSV = (array) => {
		let result;

		const columnDelimiter = ',';
		const lineDelimiter = '\n';
		const keys = Object.keys(array[0]);

		result = '';
		result += keys.join(columnDelimiter);
		result += lineDelimiter;

		array.forEach((item) => {
			let ctr = 0;
			keys.forEach((key) => {
				if (ctr > 0) result += columnDelimiter;

				result += item[key];

				ctr++;
			});
			result += lineDelimiter;
		});

		return result;
	};

	downloadCSV = (array) => {
		const link = document.createElement('a');
		let csv = this.convertArrayOfObjectsToCSV(array);
		if (csv == null) return;

		const filename = 'export113.csv';

		if (!csv.match(/^data:text\/csv/i)) {
			csv = `data:text/csv;charset=utf-8,${csv}`;
		}

		link.setAttribute('href', encodeURI(csv));
		link.setAttribute('download', filename);
		link.click();
	};
	render() {
		const { columns, data, loading, tableHeading,fixedHeader } = this.props;

		const title = CONFIG['TABLE'][tableHeading]['HEADING'];

		console.log('props>>>', this.props);
		const actionsMemo = (
			<React.Fragment>
				<CloudDownloadOutlinedIcon onClick={this.downloadCSV} style={{ fontSize: 30 }} />
			</React.Fragment>
		);
		return (
			<Card style={{ marginTop: 40 }}>
				<DataTable
					title={title}
					columns={columns}
					data={data}
					pagination={true}
					paginationRowsPerPageOptions={[ 10, 25, 100 ]}
					actions={actionsMemo}
					highlightOnHover={false}
					fixedHeader={fixedHeader ? fixedHeader : false}
					progressPending={loading}
				/>
			</Card>
		);
	}
}

export default ReactDataTable;
