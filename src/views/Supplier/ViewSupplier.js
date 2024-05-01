import React from 'react'
import { useParams } from 'react-router-dom'
import MapComponent from '../../components/Map/MapComponent'

// Here we use Material Ui Components
import {
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography, List, ListItem, ListItemAvatar, IconButton, ListItemText,
  Avatar
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import Person from '@material-ui/icons/Person'
import Email from '@material-ui/icons/Mail'
import { Phone, House, RssFeed, Money, MoneyOffRounded } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete';
import { getSupplier, getSupplierPurchases, getSupplierSubscriptions } from 'Services/Supplier'
import PurchasesTable from 'components/Purchases/PurchasesTable'
import { getRechargeHistory } from 'Services/Supplier'
import Loading from '../../components/Loading/Loading'
import CardHeader from 'components/Card/CardHeader'
import BillingHistoryTable from 'components/BillingHistory/BillingHistoryTable'
import { Modal } from '@material-ui/core'
import moment from 'moment'
import CardIcon from 'components/Card/CardIcon'
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { Chip } from '@material-ui/core'
import SubscriptionsTable from 'components/Subscriptions/SubscriptionsTable'

function ViewSupplier(props) {
  let { id } = useParams('id')
  let { item } = props.location
  let [data, setData] = React.useState(null)
  const [supplierData, setSupplierData] = React.useState(null)
  React.useEffect(() => {
    getSupplier(id).then(res => setData(res))

  }, [])

  const [loading, setLoading] = React.useState(true)
  const [rechargeHistory, setRechargeHistory] = React.useState(true)
  const [startDate, setSDate] = React.useState(new Date())
  const [endDate, setEDate] = React.useState(new Date())

  const [errorMsg, setMsg] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [modal, setModal] = React.useState(false)
  const [selected, setSelected] = React.useState(false)

  React.useEffect(() => {

  }, [])

  if (data == null || rechargeHistory == null) return <Loading open={loading} />
  return (
    <Grid container>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12} sm={12} md={5}>
          <Card elevation={3} style={{ marginTop: '20px' }}>
            <CardHeader>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >

                <Grid item xs={6} >
                  <Typography color="textSecondary" gutterBottom>
                    Payment Status
                  </Typography>
                </Grid>

                <Grid item style={{ alignSelf: "flex-end" }} xs={6} >
                  <Typography color="textPrimary" variant="h4" align="right" >
                    {selected && selected.payment_detail.status}
                  </Typography>
                  <p style={{ textAlign: 'right' }} >
                    Transaction # {selected && selected.payment_detail.transaction_id}
                  </p>
                </Grid>
              </Grid>
            </CardHeader>
            <CardContent >
              <Grid
                container
                spacing={2}
                justifyContent="space-between"
              >

                <Grid
                  item
                  xs={4}
                >
                  <Typography variant="h5" >
                    Date:
                  </Typography>
                  <Typography variant="caption" >{selected && moment(selected.date).format('DD/MM/YYYY')}</Typography>
                </Grid>

                <Grid
                  item
                  xs={4}
                >
                  <Typography variant="h5" >
                    Type:
                  </Typography>
                  <Chip size="small"
                    color={selected && selected.payment_detail.type_of == "JAZZ" ? "secondary" : "primary"}
                    label={selected && selected.payment_detail.type_of} />
                </Grid>

                <Grid
                  item
                  xs={4}
                >
                  <Typography variant="h5" >
                    Amount:
                  </Typography>
                  <Chip
                    variant="outlined"
                    size="small"
                    icon={<Money />}
                    label={`Rs.${selected && selected.payment_detail.amount}`}
                    color="secondary"
                  />
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Modal>

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
                  {data.name}
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
                  {data.email}
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
                  {data.phone}
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
                  {data.address}
                </Typography>
              </ListItem>
            </List>
          </CardContent>

        </Card>

      </Grid>
      <br />
      <br />

      <GridContainer xs={12} sm={12} md={12}>
        <GridItem xs={12} sm={6} md={4}>
          <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <MoneyOffRounded />
              </CardIcon>
              <p style={{ color: "black" }}>Wallet Balance</p>
              <h3 style={{ color: "black" }}>Rs.{data.balance}</h3>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
      <Grid item xs={12} sm={12} md={12} style={{ marginTop: "20px" }} >

        <Card elevation={3} >
          <CardHeader>
            <Typography>
              Supplier Recharge History
            </Typography>
          </CardHeader>
          <CardContent >
            {rechargeHistory && <BillingHistoryTable setOpen={setModal} setItem={setSelected} loading={loading} data={rechargeHistory} />}
          </CardContent>
        </Card>
      </Grid>

      <div style={{ marginTop: '20px', width: "100%" }} >
        <PurchasesTable data={supplierData} />
      </div>


    </Grid>
  )
}

export default ViewSupplier
