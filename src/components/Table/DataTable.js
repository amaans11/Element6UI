import React from 'react';
import DataTable,{createTheme} from 'react-data-table-component';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Card, Button ,Box} from '@material-ui/core';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import CONFIG from '../../util/config';

const customStyles = {
	headCells: {
	  style: {
		fontWeight:'bold',
		fontSize:14,
		marginBottom:8,
		textAlign:'right'
	  },
	},
	rows: {
		style: {
		  minHeight: 60, // override the row height
		}
	  },
	cells: {
		style: {
		  lineHeight:2
		},
	  },
	
  };
  const scollStyle={
	  table:{
		  style:{
			  width:1
		  }
	  },
	  rows: {
		style: {
		  width:1600, 
		  minHeight: 60, 
		}
	  },
  }
  
createTheme('dark', {
	text: {
		primary: '#FFFFFF',
		secondary: 'rgba(255, 255, 255, 0.7)',
		disabled: 'rgba(0,0,0,.12)',
	  },
	  background: {
		default: '#303030',
	  },
	  context: {
		background: '#E91E63',
		text: '#FFFFFF',
		fontFamily: 'Lucida Grande',
	  },
	  divider: {
		default: 'rgba(81, 81, 81, 1)',
	  },
	  button: {
		default: '#FFFFFF',
		focus: 'rgba(255, 255, 255, .54)',
		hover: 'rgba(255, 255, 255, .12)',
		disabled: 'rgba(255, 255, 255, .18)',
	  },
	  sortFocus: {
		default: 'rgba(255, 255, 255, .54)',
	  },
	  selected: {
		default: 'rgba(0, 0, 0, .7)',
		text: '#FFFFFF',
	  },
	  highlightOnHover: {
		default: 'rgba(0, 0, 0, .7)',
		text: '#FFFFFF',
	  },
	  striped: {
		default: 'rgba(0, 0, 0, .87)',
		text: '#FFFFFF',
	  },
  });
  createTheme('default',{
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    background: {
      default: '#FFFFFF',
    },
    context: {
      background: '#e3f2fd',
      text: 'rgba(0, 0, 0, 0.87)',
	  fontFamily: 'Lucida Grande',
    },
    divider: {
      default: 'rgba(0,0,0,.12)',
    },
    button: {
      default: 'rgba(0,0,0,.54)',
      focus: 'rgba(0,0,0,.12)',
      hover: 'rgba(0,0,0,.12)',
      disabled: 'rgba(0, 0, 0, .18)',
    },
    sortFocus: {
      default: 'rgba(0, 0, 0, .54)',
    },
    selected: {
      default: '#e3f2fd',
      text: 'rgba(0, 0, 0, 0.87)',
    },
    highlightOnHover: {
      default: '#EEEEEE',
      text: 'rgba(0, 0, 0, 0.87)',
    },
    striped: {
      default: '#FAFAFA',
      text: 'rgba(0, 0, 0, 0.87)',
    },
  },);


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
		const { columns, data, loading, tableHeading,fixedHeader,isScroll } = this.props;
		const currentTheme = localStorage.getItem('appTheme');
		const title = CONFIG['TABLE'][tableHeading]['HEADING'];
		const actionsMemo = (
			<React.Fragment>
				<CloudDownloadOutlinedIcon onClick={this.downloadCSV} style={{ fontSize: 30 }} />
			</React.Fragment>
		);
		return (
			<Card style={{ marginTop: 15 }}>
				<DataTable
					title={<Box className="table-header">{title}</Box>}
					columns={columns}
					data={data}
					pagination={true}
					paginationRowsPerPageOptions={[ 10, 25, 100 ]}
					actions={actionsMemo}
					highlightOnHover={false}
					// fixedHeader={fixedHeader ? fixedHeader : false}
					progressPending={loading}
					theme={currentTheme}
					customStyles={isScroll ? {...customStyles,...scollStyle}: customStyles}
				/>
			</Card>
		);
	}
}
ReactDataTable.defaultProps={
	isScroll:false
}
export default ReactDataTable;
