import React from 'react'
import { useParams } from 'react-router-dom'

// Here we use Material Ui Components
import {
  Paper,
  Grid,
  CardContent,
  CardActions,
  Typography, List, ListItem, ListItemAvatar, IconButton, ListItemText,
  Avatar
} from '@material-ui/core'
import Person from '@material-ui/icons/Person'
import Email from '@material-ui/icons/Mail'
import { Phone, House, MoneyOffRounded, PictureInPictureSharp } from '@material-ui/icons'
import { getSupplier, getSupplierPurchases } from 'Services/Supplier'
import SupplierPurchases from 'components/Purchases/Supplier'
import Card from 'components/Card/Card'
import Loading from '../../components/Loading/Loading'
import CardHeader from 'components/Card/CardHeader'
import CardIcon from 'components/Card/CardIcon'
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

function ViewSupplier(props) {
  let { id } = useParams('id')
  let { item } = props.location
  let [data, setData] = React.useState(null)
  const [supplierData, setSupplierData] = React.useState({
    result: [],
    purchases: 0,
    purchasesAmount: 0,
  })
  React.useEffect(() => {
    getSupplier(id).then(res => setData(res))
  }, [])

  const [loading, setLoading] = React.useState(true)

  const [errorMsg, setMsg] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [modal, setModal] = React.useState(false)
  const [selected, setSelected] = React.useState(false)

  React.useEffect(() => {
    getSupplierPurchases(id).then(res => {
      setSupplierData(res)
    }).catch(e => {
      setLoading(false)
      if (!e.response) {
        setMsg('Network Error')
      }
      else {
        setMsg(e.response.data.detail)
      }
      setErr(true)
    })

  }, [])

  if (data == null) return <Loading open={loading} />
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <Card >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Supplier Information
            </Typography>
            <List dense={true}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Name"
                />
                <Typography>
                  {data.name || '-'}
                </Typography>
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Email />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Email"
                />
                <Typography>
                  {data.email || '-'}
                </Typography>
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Phone />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Phone"
                />
                <Typography>
                  {data.phone || '-'}
                </Typography>
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <House />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Address"
                />
                <Typography>
                  {data.address || '-'}
                </Typography>
              </ListItem>
            </List>
          </CardContent>

        </Card>
      </Grid>

      <br />

      <GridContainer xs={12} sm={12} md={12}>
        <GridItem xs={12} sm={6} md={4}>
          <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <PictureInPictureSharp />
              </CardIcon>
              <p style={{ color: "black" }}>Supplier Purchase Orders</p>
              <h3 style={{ color: "black" }}>{supplierData.purchases}</h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>

          <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <MoneyOffRounded />
              </CardIcon>
              <p style={{ color: "black" }}>Supplier Bought</p>
              <h3 style={{ color: "black" }}>Rs.{supplierData.purchasesAmount}</h3>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
      <div style={{ marginTop: '20px', width: "100%" }} >
        <SupplierPurchases data={supplierData.result} />
      </div>
    </Grid>
  )
}

export default ViewSupplier
