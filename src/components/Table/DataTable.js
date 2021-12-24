import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Card, Box } from '@material-ui/core'
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined'
import CONFIG from '../../util/config'

const currentTheme = localStorage.getItem('appTheme')

const customStyles = {
  headCells: {
    style: {
      fontSize: 12,
      textAlign: 'right',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      background: currentTheme === 'dark' ? '#424242' : '#1E2732',
      color: currentTheme === 'dark' ? '#FFFFFF' : '#F7DC81',
    },
    activeSortStyle: {
      '&:focus': {
        color: currentTheme === 'dark' ? '#1bdecb':'#F7DC81',
      },
    },
    inactiveSortStyle: {
      '&:hover': {
        color: currentTheme === 'dark' ? '#1bdecb':'#F7DC81',
      },
    },
  },
  rows: {
    style: {
      minHeight: 40, // override the row height
    },
  },
  cells: {
    style: {
      lineHeight: 1,
      fontSize: 12,
    },
  },
}
const scollStyle = {
  table: {
    style: {
      width: 1,
    },
  },
  headCells: {
      style: {
        fontSize: 12,
        textAlign: 'right',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        background: currentTheme === 'dark' ? '#424242' : '#1E2732',
        color: currentTheme === 'dark' ? '#FFFFFF' : '#F7DC81',
      },
      activeSortStyle: {
        '&:focus': {
          color: currentTheme === 'dark' ? '#1bdecb':'#F7DC81',
        },
      },
      inactiveSortStyle: {
        '&:hover': {
          color: currentTheme === 'dark' ? '#1bdecb':'#F7DC81',
        },
      },
  },
  cells: {
    style: {
      fontSize: 12,
      background:currentTheme === 'dark' ? '#303030':'#f5f5f5',
    },
  },
  rows: {
    style: {
      minHeight: 60,
      borderBottom: '1px solid red',
    },
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
    background: '#303030',
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
})
createTheme('default', {
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  background: {
    default: '#F5F5F5',
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
})

class ReactDataTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFilterOption: '',
      filterValue: '',
      isFilter: false,
      filteredData: [],
    }
  }
  convertArrayOfObjectsToCSV = (array) => {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = array.length > 0 ? Object.keys(array[0]) : []
    console.log("keys>>",keys)

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach((item) => {
      let ctr = 0
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  downloadCSV = (array) => {
    const link = document.createElement('a')
    let csv = this.convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
  render() {
    const { columns, data, loading, tableHeading, isScroll,isSelectableRows,handleSelection,isTrial } = this.props
    const currentTheme = localStorage.getItem('appTheme')
    const title = CONFIG['TABLE'][tableHeading]['HEADING']
    console.log("isTrial",isTrial)

    return isSelectableRows ? (
      <Card style={{ position: 'relative' }}>
        <DataTable
          noHeader={true}
          columns={columns}
          data={data}
          pagination={true}
          paginationRowsPerPageOptions={[10, 25, 100]}
          highlightOnHover={false}
          progressPending={loading}
          theme={currentTheme}
          customStyles={isScroll ? scollStyle : customStyles}
          onSelectedRowsChange={(e) => {handleSelection(e.selectedRows)}}
          selectableRows
        />
      </Card>
    ) : (
      <Card style={{ position: 'relative' }}>
        <DataTable
          noHeader={true}
          columns={columns}
          data={data}
          pagination={true}
          paginationRowsPerPageOptions={[10, 25, 100]}
          highlightOnHover={false}
          progressPending={loading}
          theme={currentTheme}
          customStyles={isScroll ? scollStyle : customStyles}
        />
        {!isTrial && <CloudDownloadOutlinedIcon
          onClick={() => this.downloadCSV(data)}
          style={{
            fontSize: 30,
            position: 'absolute',
            left: 10,
            bottom: 10,
            color: 'black',
          }}
        />}
      </Card>
    )
  }
}
ReactDataTable.defaultProps = {
  isScroll: false,
}
export default ReactDataTable