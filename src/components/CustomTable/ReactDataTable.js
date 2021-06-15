import React from "react";
import DataTable ,{createTheme} from "react-data-table-component";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card
} from "@material-ui/core";
import {get} from 'lodash'
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';


const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: "100%"
      },
      textField: {
        minWidth: "50%",
        marginTop: 7,
        marginLeft: 10
      },
      actionItem: {
        marginBottom: theme.spacing(1)
      },
      select: {
        height: 40,
        marginTop: 7
      },
      exportIcon:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:5
      }
}));
const FilterComponent = ({
  filterOptions,
  selectedFilterOption,
  handleFilterOption,
  filterValue,
  handleFilterValue,
  exportCsv
}) => {
  console.log("selectedFilterOption1", selectedFilterOption);
  const classes = useStyles();
  return (
    <Grid container className={classes.actionItem}>
      <Grid item xs={3}></Grid>
      <Grid item xs={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="filter-by">Filter By</InputLabel>
          <Select
            labelId="filter-by"
            value={selectedFilterOption}
            onChange={handleFilterOption}
            className={classes.select}
          >
            {filterOptions.map((option) => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <TextField
          placeholder="Filter value"
          variant="outlined"
          value={filterValue}
          onChange={handleFilterValue}
          className={classes.textField}
          size="small"
        />
      </Grid>
      <Grid item xs={1} className={classes.exportIcon}>
       <CloudDownloadOutlinedIcon onClick={exportCsv} style={{fontSize:30}} />
      </Grid>
    </Grid>
  );
};

class ReactDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilterOption: "",
      filterValue: "",
      isFilter: false,
      filteredData: []
    };
  }
  convertArrayOfObjectsToCSV = (array) => {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]);

    result = "";
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
    const link = document.createElement("a");
    let csv = this.convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = "export113.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      console.log("test1");

      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  };

  getFilterOptions = () => {
    const { columns } = this.props;
    let result = [];
    columns.map((column) => {
      result.push({
        label: column.name,
        value: column.selector
      });
    });

    return result;
  };
  onChangeFilterValue = (e) => {
    const { data } = this.props;
    const { selectedFilterOption } = this.state;
    this.setState(
      {
        filterValue: e.target.value,
        isFilter: true
      },
      () => {
        if (data.length > 0) {
          let filteredData = [];
          if (this.state.filterValue.length > 0 && selectedFilterOption!== '') {
            filteredData = data.filter(
              (item) =>
                item[selectedFilterOption] &&
                item[selectedFilterOption]
                  .toString()
                  .toLowerCase()
                  .includes(this.state.filterValue)
            );
          } else {
            filteredData = [...data];
          }

          this.setState({
            filteredData: filteredData
          });
        }
      }
    );
  };

  customStyles = {
    tableWrapper: {
        style: {
          display: 'block',
        },
      },
    
    cells: {
      style: {
        fontSize: this.props.style
          ? this.props.style.fontSize + "rem"
          : "0.85rem",
      },
    },
    headCells: {
      style: {
        background: this.props.style
          ? this.props.style.color.backgroundAppbar
          : "#1E2732",
        color: this.props.style ? this.props.style.color.colorIcons : "#F7DC81",
        height:this.props.customStyle && this.props.customStyle.headerHeight ?   this.props.customStyle.headerHeight :50,
        fontSize:this.props.customStyle && this.props.customStyle.headerFontSize ?   this.props.customStyle.headerFontSize :12,
        textAlign:'right'
      },
      activeSortStyle: {
        "&:focus": {
          color: this.props.style
            ? this.props.style.color.colorIcons
            : "#F7DC81"
        }
      },
      inactiveSortStyle: {
        "&:hover": {
          color: this.props.style
            ? this.props.style.color.colorIcons
            : "#F7DC81"
        }
      }
    },
    rows: {
      style: {
        fontSize: '13px',
        minHeight: this.props.customStyle && this.props.customStyle.rowHeight ? this.props.customStyle.rowHeight :'48px' 
      }
      },
  };
  render() {
    const { columns, data } = this.props;
    const title=get(this.props,"title",'')
    const {
      selectedFilterOption,
      filterValue,
      isFilter,
      filteredData
    } = this.state;
    const filterOptions = this.getFilterOptions();
    const actionsMemo = (
      <React.Fragment>
        <FilterComponent
          filterOptions={filterOptions}
          handleFilterOption={(e) => {
            this.setState({ selectedFilterOption: e.target.value });
          }}
          selectedFilterOption={selectedFilterOption}
          handleFilterValue={this.onChangeFilterValue}
          filterValue={filterValue}
          exportCsv={()=>this.downloadCSV(data)}
        />
      </React.Fragment>
    );
    return (
      <Card style={{ marginTop: 40 }}>
        <DataTable
          title={title}
          columns={columns}
          data={isFilter ? filteredData : data}
          pagination={true}
          customStyles={this.customStyles}
          paginationRowsPerPageOptions={[10, 25, 100]}
          actions={actionsMemo}
          highlightOnHover={false}
          fixedHeader={this.props.fixedHeader ? this.props.fixedHeader :false}
        />
      </Card>
    );
  }
}

export default ReactDataTable;
