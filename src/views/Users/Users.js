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
import { useHistory } from 'react-router-dom'
import AddUser from './AddUser'


import { deleteUser, getUsers } from '../../Services/User'
import {
  TableBody, TableCell, TableHead, TableRow, Table, Avatar,
  Button, ButtonGroup, Fab, Grid, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Chip
} from "@material-ui/core";
import UpdateUser from "./UpdateUser";
import Loading from '../../components/Loading/Loading'
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";


const useStyles = makeStyles(styles);

export default function Users() {
  const [data, setData] = React.useState([])
  const [showModal, setShowModal] = React.useState(false)
  const [showUpdateModal, setShowUpdateModal] = React.useState(false)
  const [selected, setSelected] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  let [permissions, setPermissions] = React.useState(null)


  const [errorMsg, setMsg] = React.useState(false)
  const [err, setErr] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      getUsers().then(res => {

        setData(res)
        setLoading(false)
        console.log(res)
      }).catch(e => {
        setLoading(false)
        if (!e.response) setMsg("Network Error")
        else setMsg(e.response.data.detail)
        setErr(true)
      })
      // getPermissions().then(res => {
      //   setPermissions(res)
      //   setLoading(false)
      //   console.log(res)
      // }).catch(e => {
      //   setLoading(false)
      //   if (!e.response) setMsg("Network Error")
      //   else setMsg(e.response.data.detail)
      //   setErr(true)
      // })
    }
    )()
  }, [])

  const classes = useStyles();
  const history = useHistory()

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleDeletePress = (id) => {
    setLoading(true)
    deleteUser(id).then(res => {
      setOpenDelete(false);
      setMsg("User Deleted Successfully")
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
        <Alert severity="error">
          {errorMsg || "Nothing Here"}
        </Alert>
      </Snackbar>
      <GridItem xs={12} sm={12} md={12}>

        <Card>
          <CardHeader color="primary">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={10} >
                <h4 className={classes.cardTitleWhite}>Users</h4>
                <p className={classes.cardUserWhite}>
                  Below, you can delete,add and list the users.
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((user, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.firstname} {user.lastname}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <ButtonGroup disableElevation variant="contained" color="primary">
                          <Button color="primary" onClick={() => {
                            setSelected(user)
                            // wait for state to change
                            setShowUpdateModal(true)
                          }} >UPDATE</Button>
                          {user.id !== 1 && <Button color="secondary" onClick={handleDelete}>DELETE</Button>}
                          <Dialog
                            open={openDelete}
                            onClose={handleDeleteClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                By Agreeing, you will delete the selected User!
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleDeleteClose} color="primary">
                                Cancel
                              </Button>
                              <Button onClick={() => handleDeletePress(user.id)} color="primary" autoFocus>
                                Agree
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </GridItem>
      <AddUser permissions={permissions} setLoading={setLoading} setMsg={setMsg} setErr={setErr} show={showModal} handleClose={() => setShowModal(false)} />
      <UpdateUser
        setLoading={setLoading}
        setMsg={setMsg}
        setErr={setErr}
        show={showUpdateModal}
        item={selected}
        handleClose={() => setShowUpdateModal(false)}
      />
    </GridContainer>
  );
}


const styles = {
  cardUserWhite: {
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
