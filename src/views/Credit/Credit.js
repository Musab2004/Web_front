import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Grid } from "@material-ui/core";

import CreditTable from 'components/Credit/CreditTable';
import { getCreditRequests } from 'Services/Credit';
import Loading from '../../components/Loading/Loading'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


const useStyles = makeStyles(styles);


function Credit() {
    const [data,setData] = React.useState()
    const [loading,setLoading] = React.useState(true)
   
    const [errorMsg,setMsg] = React.useState(false)
    const [err,setErr] = React.useState(false)
    const [type,setType] = React.useState(false)

  React.useEffect(() => {
        getCreditRequests().then(res => {
          console.log(res)
          setData(res)
          setLoading(false)
        }).catch(e => {
          setLoading(false)
          if (!e.response) setMsg("Network Error")
          else setMsg(e.response.data.detail)
          setType("error")
          setErr(true)
        })
    },[])

  const classes = useStyles();



        if (loading) {
            return <Loading open={loading} />
        }
        return (
          <GridContainer>
            <Snackbar open={err} autoHideDuration={2000} onClose={() => {
                setErr(false)
                window.location.reload()
              }} >
                <Alert  severity={type}>
                  {errorMsg ||"Nothing Here" }
                </Alert>
            </Snackbar>    
          <GridItem xs={12} sm={12} md={12}>
    
            <Card>
              <CardHeader color="primary">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={10} >
                    <h4 className={classes.cardTitleWhite}>Credit Requests</h4>
                    <p className={classes.cardCategoryWhite}>
                      Below, you can see the recent customer Credit Requests.
                    </p>
                </Grid>
                <Grid item xs={12} sm={12} md={2} >
    
    
                </Grid>
    
              </Grid>
              </CardHeader>
              <CardBody>

                <CreditTable setErr={setErr} setMsg={setMsg} setLoading={setLoading} setType={setType} data={data} /> 
              </CardBody>
            </Card>
          </GridItem>
          
        </GridContainer>
)}

export default Credit;



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
  }
};