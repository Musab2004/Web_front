import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import Cookies from 'js-cookie'
import { TextField } from "@material-ui/core";
const styles = {
  cardCategoryWhite: {
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
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [data, setData] = React.useState({})
  React.useEffect(() => {
    let temp = Cookies.getJSON('user')
    setData(temp)
    console.log(temp)
  }, [])
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id="username"
                    label="Username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={data.username}
                    onChange={(e) => { setData({ ...data, username: e.target.value }) }}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    label="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={data.email}
                    onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                  />
                </GridItem>
              </GridContainer>


              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id="firstname"
                    label="First Name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={data.firstname}
                    onChange={(e) => { setData({ ...data, firstname: e.target.value }) }}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    label="Last Name"
                    id="lname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={data.lastname}
                    onChange={(e) => { setData({ ...data, lastname: e.target.value }) }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    label="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={data.password}
                    onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{data.role}</h6>
              <h4 className={classes.cardTitle}>{data.username}</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
