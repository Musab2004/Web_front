import React from 'react'
import { getPurchaseHistory } from '../../Services/Purchases'
import { getPurchases } from '../../Services/Purchases'

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom'
import {
  TableBody, TableCell, TableHead, TableRow, Table, Avatar, Button,
  ButtonGroup, Fab, Grid, Modal, Typography, CardContent,
  Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText
} from "@material-ui/core";

import PurchasesTable from '../../components/Purchases/PurchasesTable'
import { TextField } from '@material-ui/core';
import moment from 'moment';
import Loading from '../../components/Loading/Loading'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(styles);


function Purchases() {
  const [data, setData] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const [startDate, setSDate] = React.useState(new Date())
  const [endDate, setEDate] = React.useState(new Date())

  React.useEffect(() => {
    getPurchases().then(res => {
      console.log(res)
      setData(res)
      setLoading(false)
    }).catch(e => {
      setLoading(false)
      console.log(e)
      if (!e.response) {
        alert('Network Error')
      }
      else {
        alert(e.response.data.detail)
      }
      setErr(true)
    })

  }, [])


  const classes = useStyles();

  const handleDateSearch = () => {
    if (startDate == null) {
      alert("Please select a Start Date")
      return;
    }
    if (endDate == null) {
      alert("Please select a End Date")
      return;
    }
    if (startDate > endDate) {
      alert("Start Date can't be greater than END DATE")
      return;
    }
    setLoading(true)
    getPurchaseHistory(startDate, endDate).then(res => {
      console.log(res)
      setData(res)
      setLoading(false)
    }).catch(e => {
      setLoading(false)
      console.log(e)
      if (!e.response) {
        setMsg('Network Error')
      }
      else {
        setMsg(e.response.data)
      }
      setErr(true)
    })
  }
  const history = useHistory()
  const [errorMsg, setMsg] = React.useState(false)
  const [err, setErr] = React.useState(false)
  if (loading) {
    return <Loading open={loading} />
  }
  return (

    <GridItem xs={12} sm={12} md={12}>
      <Snackbar open={err} autoHideDuration={2000} onClose={() => {
        setErr(false)
        window.location.reload()
      }} >
        <Alert severity="error">
          {errorMsg || "Nothing Here"}
        </Alert>
      </Snackbar>
      <Card>
        <CardHeader color="primary">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={10} >
              <h4 className={classes.cardTitleWhite}>Purchases</h4>
              <p className={classes.cardCategoryWhite}>
                Below, you can delete,add and list the Purchases.
              </p>
            </Grid>
            <Grid item xs={12} sm={12} md={2} >

              <Grid item xs={12} sm={12} md={2} >

                <Fab onClick={() => history.push('/admin/purchases/add')} style={{ alignSelf: "flex-end" }}>
                  <AddIcon />
                </Fab>

              </Grid>
            </Grid>

          </Grid>
        </CardHeader>
        <CardBody>
          <div style={styles.container} noValidate>
            <TextField
              id="startdate"
              label="From"
              type="date"
              defaultValue={moment(startDate).format('YYYY-MM-DD')}
              value={moment(startDate).format('YYYY-MM-DD')}
              onChange={e => setSDate(moment(e.target.value, 'YYYY-MM-DD').toDate())}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginRight: '20px' }}
            />

            <TextField
              id="enddate"
              label="To"
              type="date"
              defaultValue={moment(endDate).format('YYYY-MM-DD')}
              value={moment(endDate).format('YYYY-MM-DD')}
              onChange={e => setEDate(moment(e.target.value, 'YYYY-MM-DD').toDate())}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button onClick={handleDateSearch} variant="contained" color="secondary" >Search</Button>
          </div>

          <PurchasesTable data={data} />
        </CardBody>
      </Card>
    </GridItem>

  )
}

export default Purchases



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  container: {
    paddingVertical: '20px',
    justifyContent: "space-around",
    alignItems: "center"
  }
};
