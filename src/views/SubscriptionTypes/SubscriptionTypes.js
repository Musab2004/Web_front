import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddIcon from '@material-ui/icons/Add';
import {useHistory} from 'react-router-dom'

import { 
  Button,ButtonGroup,Fab,Grid,Dialog,DialogTitle,DialogContent,
  DialogContentText,DialogActions } from "@material-ui/core";
import Loading from '../../components/Loading/Loading'
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import MUIDataTable from "mui-datatables";
import { getSubscriptionTypes } from "Services/SubscriptionTypes";
import AddSubscriptionType from "./AddSubscriptionType";
import UpdateSubscriptionType from "./UpdateSubscriptionType";
import { deleteSubscriptionType } from "Services/SubscriptionTypes";


const useStyles = makeStyles(styles);

export default function SubscriptionType() {
  const [data,setData] = React.useState([])
  const [showModal,setShowModal] = React.useState(false)
  const [showUpdateModal,setShowUpdateModal] = React.useState(false)
  const [selected,setSelected] = React.useState(false)
  const [loading,setLoading] = React.useState(true)



  const [errorMsg,setMsg] = React.useState(false)
  const [err,setErr] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      getSubscriptionTypes().then(res => {
        setData(res)
        setLoading(false)
        console.log(res)
      }).catch(e => {
          setLoading(false)
          if (!e.response) setMsg("Network Error")
          else setMsg(e.response.data.detail)
          setErr(true)
      })
    })()
  },[])

  const classes = useStyles();
  const history = useHistory()

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleDelete = (id) => {
    setSelected(id)
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleDeletePress = () => {
    setLoading(true)
    deleteSubscriptionType(selected).then(res => {
      setOpenDelete(false);
      setMsg("SubscriptionType Deleted Successfully")
      setLoading(false)
      setErr(true)
    }).catch(e => {
      setLoading(false)
      if (!e.response) setMsg("Network Error")
      else setMsg(e.response.data.detail)
      setErr(true)
  })
  };
  


  if (loading) 
    return <Loading open={loading} />

  return (
    <GridContainer>
            <Snackbar open={err} autoHideDuration={2000} onClose={() => {
                setErr(false)
                window.location.reload()
              }} >
                <Alert  severity="error">
                  {errorMsg ||"Nothing Here" }
                </Alert>
            </Snackbar>
      <GridItem xs={12} sm={12} md={12}>

        <Card>
          <CardHeader color="primary">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={10} >
                <h4 className={classes.cardTitleWhite}>SubscriptionType</h4>
                <p className={classes.cardSubscriptionTypeWhite}>
                  Below, you can delete,add and list the SubscriptionType.
                </p>
            </Grid>
            <Grid item xs={12} sm={12} md={2} >

              <Fab onClick={() => setShowModal(true)}>
                <AddIcon />
              </Fab>


            </Grid>
          </Grid>
          </CardHeader>
          <CardBody>
          <MUIDataTable 
            title={"Subscription Types"} 
            data={
                data?.map((item,index) => {
                    return {
                        "ID" : item.id,
                        "Name" :item.name,
                        "Interval" :item.interval,
                        "Actions" : (    
                        <ButtonGroup disableElevation variant="contained" color="primary">
                            <Button onClick={() =>{
                              setSelected(item)
                              setShowUpdateModal(true)
                            }} color="primary" >UPDATE</Button>
                            <Button color="secondary" onClick={() => handleDelete(item.id)}>DELETE</Button>

                        </ButtonGroup>
                        )
                    }

            })}
            columns={columns} 
            options={options} 
            />
          </CardBody>
        </Card>
      </GridItem>
      <AddSubscriptionType setLoading={setLoading}  setMsg={setMsg} setErr={setErr} show={showModal} handleClose={() => setShowModal(false)} />
      <UpdateSubscriptionType setLoading={setLoading} setMsg={setMsg} setErr={setErr} show={showUpdateModal} item={selected} handleClose={() => setShowUpdateModal(false)} />

    <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            By Agreeing, you will delete the selected SubscriptionType!
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleDeleteClose} color="primary">
            Cancel
        </Button>
        <Button onClick={() => handleDeletePress()} color="primary" autoFocus>
            Agree
        </Button>
        </DialogActions>
    </Dialog>
    </GridContainer>
  );
}


const styles = {
  cardSubscriptionTypeWhite: {
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


const columns = [
  {
      name: "ID",
      options: {
          filter: false,
          sort: true
      }
  }, 
  {
     name : "Name",
     options: {
          filter: false,
          sort: true
      }
  }, 
  {
      name: 'Interval',
      options: {
        filter: false,
      },
  },
  {
      name : "Actions",
      options : {
          filter : false,
          sort : false
      }
  }];


const options = {
filterType: 'checkbox',
};