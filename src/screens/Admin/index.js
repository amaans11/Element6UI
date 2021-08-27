import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  Link,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CssBaseline,
  Paper,
  Tabs,
  Tab,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { NotificationManager } from 'react-notifications'
import DataTable from '../../components/Table/DataTable'
import { deletePortfolioRequest,getUploadPortfolioList } from '../../redux/actions/authActions'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import TabPanel from '../../components/TabPanel'
import { useHistory } from 'react-router'

const Admin = ({}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const auth = useSelector((state) => state.auth)
  const portfolioTableRes = useSelector((state) => state.auth.portfolioTableRes)

  const [dialog, setDialog] = useState(false)
  const [portIds, setPortIds] = useState([])

  useEffect(()=>{
    fetchDetails()
  },[])

  const fetchDetails = async() => {
    await dispatch(getUploadPortfolioList())
  }
  const handleClose = () => {
    setDialog(false)
  }
  const deletePortfolioHandler = () => {
    setDialog(true)
  }
  const deletePortfolio = async () => {
    try {
      await dispatch(deletePortfolioRequest(portIds))
      NotificationManager.success('Portfolio deleted successfully')
      setDialog(false)
      window.location.reload()
    } catch (error) {
      NotificationManager.error('Unable to delete the portfolio !')
    }
  }
  const getHeadCells = () => {
    return [
      {
        name: 'Portfolio Name',
        selector: 'name',
        sortable: true,
        right: false,
        wrap: true,
      },
      {
        name: 'Emission Coverage (%)',
        selector: 'coverageEmissions',
        sortable: true,
        right: true,
        wrap: true,
      },
      {
        name: 'Version',
        selector: 'version',
        sortable: true,
        right: true,
        wrap: true,
      },
      {
        name: 'Processing Date',
        selector: 'date_created',
        sortable: true,
        right: true,
        wrap: true,
        cell: (row) => (
          <div style={{ marginLeft: 40 }}>
            {row['date_created'] &&
              moment(row['date_created']).format('DD-MM-YYYY hh:mm:ss')}
          </div>
        ),
      },
    ]
  }
  const handleSelectedRowsChange = (selectedPortfolios) => {
    let portIds = []
    if (selectedPortfolios && selectedPortfolios.length > 0) {
      selectedPortfolios.map((portfolio) => {
        portIds.push(portfolio['portfolio_id'])
      })
    }
    setPortIds(portIds)
  }
  const headCells = getHeadCells()
  return (
    <Box>
      <CssBaseline />
      <Header history ={history} />
      <SideBar />
      <Box style={{ marginTop: 73, marginLeft: 100 }} mr={1}>
        <Paper position="static" color="default">
          <Tabs
            value={0}
            indicatorColor="secondary"
            inkBarStyle={{ background: 'blue' }}
          >
            <Tab label="Delete Portfolio" style={{ fontSize: 11 }} />
          </Tabs>
        </Paper>
        <TabPanel value={0} index={0}>
          <Box>
            <Box
              mt={1}
              mb={1}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                color="primary"
                onClick={deletePortfolio}
                disabled={portIds.length === 0}
                style={{width:150}}
              >
                Delete
              </Button>
            </Box>
            <DataTable
              data={portfolioTableRes}
              columns={headCells}
              tableHeading="UPLOAD_PORTFOLIO"
              isSelectableRows={true}
              handleSelection={handleSelectedRowsChange}
            />
          </Box>
        </TabPanel>
      </Box>
    </Box>
  )
}
export default Admin
