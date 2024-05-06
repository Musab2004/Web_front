import React from 'react'
import { Card, Typography, TextField, CardContent, InputLabel, Button, Modal, Snackbar, Select, MenuItem, Grid } from '@material-ui/core'
import CardHeader from 'components/Card/CardHeader'
import CardFooter from 'components/Card/CardFooter'
import { addUser, getUser, getUsers, updateUser } from '../../Services/User'

import AddAlert from "@material-ui/icons/AddAlert";
import { makeStyles } from '@material-ui/core'
import MultiSelect from 'components/MultiSelect/MultiSelect'
import { getRoles } from 'Services/Role'
import { useParams } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "100%"
  },
  cardUserWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

function UpdateUser(props) {
  const classes = useStyles();

  let [tc, setTC] = React.useState(false)

  const handleSubmit = async () => {
    let data = {
      username,
      role,
      first_name: firstName,
      last_name: lastName,
      email
    }
    if (password !== "" || password !== undefined || password !== null) {
      data.password = password
    }
    updateUser(data, props.item.id).then(res => {
      console.log(res)
      setTC(true)
      props.setMsg("User Updated Successfully!")
      props.setLoading(false)
      props.setErr(true)
    }).catch(e => {
      props.setLoading(false)
      if (!e.response) props.setMsg("Network Error")
      else props.setMsg(e.response.data.detail)
      props.setErr(true)
    })

  }
  const [firstName, setFirstName] = React.useState(null)
  const [lastName, setLastName] = React.useState(null)
  const [email, setEmail] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [username, setUsername] = React.useState(null)
  const [role, setRole] = React.useState(null)
  const [roles, setRoles] = React.useState([])

  React.useEffect(() => {
    getRoles().then(res => {
      setRoles(res)
    }
    )
  }, [])
  React.useEffect(() => {
    console.log(props)
    if (props.show) {

      getUser(props.item.id).then(res => {
        setUsername(res.username)
        setFirstName(res.firstname)
        setLastName(res.lastname)
        setEmail(res.email)
        // setPassword(res.password)
        setRole(res.role_id)
      })
    }
  }, [props.item])

  return (
    <Modal open={props.show} onClose={props.handleClose} className={classes.modal} >
      <div style={{ width: "50%" }}  >
        <Card >
          <CardHeader>
            <Typography gutterBottom>Update A New User</Typography>
          </CardHeader>

          <CardContent>
            <form>
              <Grid container spacing={1}
                className={classes.formControl}
              >
                <Grid item xs={12} sm={6}>

                  <InputLabel style={{ color: "#AAAAAA" }}>First Name</InputLabel>
                  <TextField
                    value={firstName}
                    required
                    type="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Last Name</InputLabel>
                  <TextField
                    value={lastName}
                    required
                    type="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                  />


                </Grid>
                <Grid item xs={12} sm={6}>

                  <InputLabel style={{ color: "#AAAAAA" }}>Username</InputLabel>
                  <TextField
                    value={username}
                    required
                    type="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />

                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Email</InputLabel>
                  <TextField
                    value={email}
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </Grid>
                <Grid item xs={12} sm={6}>

                  <InputLabel style={{ color: "#AAAAAA" }}>Password</InputLabel>
                  <TextField
                    value={password}
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}

                  />

                  <br />


                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Role</InputLabel>
                  <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    inputProps={{
                      name: 'role',
                      id: 'role',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {roles.map(item => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>

                </Grid>
              </Grid>

              <br />
              <CardFooter>
                <Button color="primary" disableElevation variant="contained" onClick={() => handleSubmit()}>UPDATE USER</Button>
              </CardFooter>

            </form>
            <Snackbar
              place="tc"
              color="info"
              icon={AddAlert}
              message="User was updated Successfully."
              open={tc}
              closeNotification={() => setTC(false)}
              close
            />
          </CardContent>
        </Card>
      </div>
    </Modal>
  )
}

export default UpdateUser
