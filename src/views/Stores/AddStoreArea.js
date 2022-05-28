import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Card,TextField,InputLabel,makeStyles,FormControl,Select,MenuItem} from '@material-ui/core' 
import CardHeader from 'components/Card/CardHeader'// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
  
import { addStoreArea } from 'Services/Stores';
import { getCities,getAreas } from 'Services/User';
import { getSubAreas } from 'Services/User';
import { getDeliveryBoys } from 'Services/DeliveryBoys';

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
    width : "100%"
  },
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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
//
export default function TransitionsModal(props) {
  const classes = useStyles();

  const [city,setCity] = React.useState(null)
  const [area,setArea] = React.useState(null)
  const [subarea,setSubArea] = React.useState(null)
  const [cities,setCities] = React.useState(null)
  const [areas,setAreas] = React.useState(null)
  const [subareas,setSubAreas] = React.useState(null)
  const [rider,setRider] = React.useState(null)
  const [riders,setRiders] = React.useState(null)

  const handleSubmit =() => {
        let data={};
        data.sub_area = subarea;
        data.store_id = props.id;
        data.rider = rider;
        props.setLoading(true)
        addStoreArea(data).then((res) => {
          console.log('After Adding',res)
          props.setMsg("Added Successfully")
          props.setType("success")
          props.setErr(true)
          props.setLoading(false)
        }).catch(e => {
          if (!e.response) props.setMsg("Network Error")
          else {
            let err = "";
            for (let property in e.response.data) {
              err += `${property} : ${e.response.data[property]}\n`
            }
            props.setMsg(err)
          }
          props.setType("error")
          props.setErr(true)
          props.setLoading(false)
        })
        
  }

    React.useEffect(() => {
      props.setLoading(true)
      try {
        getCities().then(res => {
          setCities(res)
        })
        getDeliveryBoys().then((res) => {
            setRiders(res)
        })
        props.setLoading(false)
      }
      catch (e) {
        if (!e.response) props.setMsg("Network Error")
        else props.setMsg(e.response.data.detail)
        props.setType("error")
        props.setErr(true)
        props.setLoading(false)
      }
    },[])


  return (
    <div>
      <Modal
        aria-labelledby="Add A New Store"
        aria-describedby="Fill in the Details"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>


    <GridContainer>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Stores</h4>
              <p className={classes.cardCategoryWhite}>Add A New Store</p>
            </CardHeader>
            <CardBody>
            
              <GridContainer style={{marginTop: '20px'}}>

                <GridItem xs={12} sm={12} md={12}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="city-holder">City</InputLabel>
                        <Select
                            labelId="city-holder"
                            id="city"
                            value={city}
                            onChange={e => {
                                setCity(e.target.value);
                                console.log(e.target.value)
                                getAreas(e.target.value).then(res => setAreas(res))
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {cities?.map((item,index) => {
                                return(
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </GridItem>


                {areas && (
                <GridItem xs={12} sm={12} md={12}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="area-holder">Store Area</InputLabel>
                        <Select
                            labelId="area-holder"
                            id="area"
                            value={area}
                            onChange={e => {
                                setArea(e.target.value);
                                getSubAreas(e.target.value).then(res => setSubAreas(res));
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {areas?.map((item,index) => {
                            return(
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                            )
                            })}
                        </Select>
                    </FormControl>
                </GridItem>
                )}

                {subareas && (
                <GridItem xs={12} sm={12} md={12}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="area-holder">Store Sub Area</InputLabel>
                        <Select
                            labelId="area-holder"
                            id="area"
                            value={subarea}
                            onChange={e => {
                                setSubArea(e.target.value);
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {subareas?.map((item,index) => {
                            return(
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                            )
                            })}
                        </Select>
                    </FormControl>
                </GridItem>
                )}

            {subareas && (
                <GridItem xs={12} sm={12} md={12}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="area-holder">Store Delivery Boy</InputLabel>
                        <Select
                            labelId="area-holder"
                            id="area"
                            value={rider}
                            onChange={e => {
                                setRider(e.target.value);
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {riders?.map((item,index) => {
                            return(
                                <MenuItem value={item.id}>{item.user.username}</MenuItem>
                            )
                            })}
                        </Select>
                    </FormControl>
                </GridItem>
                )}
              </GridContainer>


              <GridContainer style={{marginTop: '20px'}}>


              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => handleSubmit()} >Add</Button>
            </CardFooter>
          </Card>
        
      </GridContainer>


        </Fade>
      </Modal>
    </div>
  );
}