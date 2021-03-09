import MUIDataTable from "mui-datatables";
import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

class MuiDataTable extends Component {
    state = { options: this.props.options }

    componentDidMount() {
        var options = this.props.options
        options['download'] = !this.props.userInfo.Trial
        this.setState({ options: options })
    }

    getMuiTheme = () => createMuiTheme({
        overrides: {
            MuiTable: {
                root: {
                    tableLayout: this.props.style.tableLayout,
                }
            },
            MUIDataTableBodyCell: {
                root: {
                    fontSize: this.props.style.fontSize + 'rem',
                    textAlign: 'right'
                }
            },
            MUIDataTableHeadCell: {
                sortActive: { color: "#D8F781" },
                data: { textAlign: 'right' },
                toolButton:{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'flex-end'
                },
                fixedHeaderCommon: {
                    color: this.props.style.color.colorIcons,
                    backgroundColor: this.props.style.color.backgroundAppbar,
                    textAlign: 'right'

                },
                root: {
                    fontSize: this.props.style.fontSize + 'rem',
                    textAlign: 'right'
                }
            }
        }
    })
    getDefaultTheme = () => createMuiTheme({
        overrides: {
            MUIDataTableHeadCell: {
                sortActive: { color: "#D8F781" },
                data: { textAlign: 'right' },
                fixedHeaderCommon: {
                    textAlign: 'right',
                
                },
                root: {
                    textAlign: 'right'
                }
            },
            MUIDataTable: {
                responsiveScroll: {
                  overflowX: 'infinite'
                },
              },
        }
    })
    render() {
        console.log("rows>>>",this.props.rows)
        var columns = this.props.columns[0].map(x => {

            return ({
                name: x.name,
                customHeadRender: (x) => (
                    <th key={x.name} style={{ cursor: 'pointer', textAlign: 'right' }} >
                        {x.name}
                    </th >
                ),
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const header=tableMeta.columnData.name
                      return (
                         header==='Portfolio Percentage' || header ==='Ownership Percentage' ? value.toFixed(2): typeof(value)==='number' && header!=='Year' ? value === -999999 || value===-1 ? "NA" : new Intl.NumberFormat().format(value) :value
                    )                    
                }
            }    
        })
    })

        let data=this.props.rows.map(x=>{
             var rowItems = Object.values(x)
            return rowItems
        })
        console.log("data>>>",data)
        if (this.props.custom) {
            return (
                <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable

                        data={data}
                        columns={columns}
                        options={this.state.options}

                    />
                </MuiThemeProvider>);
        } else {
            return (
                <MuiThemeProvider theme={this.getDefaultTheme()}>
                <MUIDataTable

                    data={data}
                    columns={columns}
                    options={this.state.options}

                />
                </MuiThemeProvider>
            );
        }

    }
}

export default MuiDataTable;
