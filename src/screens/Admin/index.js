import React, { useState } from 'react'
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
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { NotificationManager } from 'react-notifications'
import DataTable from '../../components/Table/DataTable'
import { deletePortfolioRequest } from '../../redux/actions/authActions'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'

const Admin = ({}) => {
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const portfolioTableRes = useSelector((state) => state.auth.portfolioTableRes)

  const [dialog, setDialog] = useState(false)
  const [portIds, setPortIds] = useState([])

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
      <Header />
      <SideBar />
      <Box style={{ marginTop: 73, marginLeft: 100 }}>
        <Typography gutterBottom variant="h5" component="h2">
          Delete portfolios
        </Typography>
        <Typography style={{ color: 'rgb(120,120,120),fontSize:12' }}>
          To delete any of the portfolios uploaded to your account, please click
          on the link below and select a portfolio from the list.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={deletePortfolioHandler}
        >
          Delete Portfolio
        </Button>
      </Box>

      <Dialog open={dialog} keepMounted onClose={handleClose} maxWidth="sm">
        <DialogTitle>Delete Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <DataTable
              data={portfolioTableRes}
              columns={headCells}
              tableHeading="UPLOAD_PORTFOLIO"
              isSelectableRows={true}
              handleSelection={handleSelectedRowsChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={deletePortfolio}
            disabled={portIds.length === 0}
          >
            Delete
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
export default Admin
