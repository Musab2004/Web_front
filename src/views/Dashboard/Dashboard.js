import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import { useHistory } from 'react-router-dom'

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { TableBody, TableCell, TableHead, Table, TableRow, Button, Avatar } from '@material-ui/core'

// import Purchases from '../Purchases/Purchases'
// import { getCustomers } from "Services/Customers";
// import { getDeliveryBoys } from "Services/DeliveryBoys";
// import { getStores } from "Services/Stores";
// import { getComplains } from "Services/Complains";
import { getPurchases } from "Services/Purchases";
import { MoneyOffRounded } from "@material-ui/icons";
import { getTopCustomers } from "Services/Statistics";
import { getTopProducts } from "Services/Statistics";
import { getCurrentMonthSales } from "Services/Statistics";
import { getCurrentMonthCustomers } from "Services/Statistics";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory()
  const [complains, setComplains] = React.useState(null)
  const [customers, setcustomers] = React.useState([])
  const [products, setproducts] = React.useState([])
  const [registers, setregisters] = React.useState(0)
  const [sales, setSales] = React.useState(100)

  React.useEffect(() => {
    // getComplains(1,true).then(res => {
    //   setComplains(res.results)
    // })
    // getDeliveryBoys().then(res => setriders(res.length))
    // getStores().then(res => setstores(res.length))
    // getCustomers().then(res => setcustomers(res.length))
    // let price=0;
    // getPurchases(true).then(res => {
    //   for (let m in res) {
    //     price += res.price
    //   }
    // })
    // setSales(price)
  }, [])

  React.useEffect(() => {
    getTopCustomers().then(res => {
      setcustomers(res)
    }
    )
  }, [])

  React.useEffect(() => {
    getTopProducts().then(res => {
      setproducts(res)
    }
    )
  }, [])

  React.useEffect(() => {
    getCurrentMonthCustomers().then(res => {
      console.log(res)
      setregisters(res)
    }
    )
  }, [])
  const [monthSales, setMonthSales] = React.useState({});

  React.useEffect(() => {
    getCurrentMonthSales().then(res => {
      console.log(res)

      let stat = (res.currentMonthSales.total_sales_count / (res.previousMonthSales.total_sales_count === 0 ? 1 : res.previousMonthSales.total_sales_count)) * 100;
      let stat2 =
        (res.currentMonthSales.total_sales /
          (res.previousMonthSales.total_sales === null ? 1 : res.previousMonthSales.total_sales)) * 100;
      setMonthSales({
        ...res,
        stat: stat,
        stat2
      })
    }
    )
  }, [])
  return (
    <div>
      <div class="w-full shadow stats">
        <div class="stat">
          <div class="stat-figure text-primary">
            <Icon>content_copy</Icon>
          </div>
          <div class="stat-title">Current Month Sales</div>
          <div class="stat-value text-primary">{monthSales.currentMonthSales ? monthSales.currentMonthSales.total_sales_count : 0}</div>
          <div class="stat-desc">{monthSales.stat}% {monthSales.stat > 1 ? "more" : "less"} than last month</div>
        </div>


        <div class="stat">
          <div class="stat-figure text-info">
            <MoneyOffRounded />
          </div>
          <div class="stat-title">Monthly Revenue</div>
          <div class="stat-value text-info">Rs. {monthSales.currentMonthSales ? monthSales.currentMonthSales.total_sales : 0}</div>
          <div class="stat-desc">{monthSales.stat2}% {monthSales.stat2 > 1 ? "more" : "less"} than last month</div>
        </div>


        <div class="stat">
          <div class="stat-figure text-primary">
            <Store />
          </div>
          <div class="stat-value">{registers.currentMonthCustomers}</div>
          <div class="stat-title">New Customers This Month</div>
          <div class="stat-desc text-info">{registers.previousMonthCustomers} Customers Registered Last Month</div>
        </div>


      </div>

      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Top Selling Products</h4>
              <p className={classes.cardCategoryWhite}>
                Below, you can see the top selling products recently
              </p>
            </CardHeader>
            <CardBody>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {products?.map((product, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.total_quantity}</TableCell>
                        <TableCell>
                          <Button onClick={() => history.push({ pathname: '/admin/products/' + product.id, product: product })} color="success" >View</Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Top Buying Customers</h4>
              <p className={classes.cardCategoryWhite}>
                Below, You can see Top 5 Customers who have purchased the most
              </p>
            </CardHeader>
            <CardBody>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {customers?.map((customer, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{customer.id}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.total_quantity}</TableCell>
                        <TableCell>
                          <Button onClick={() => history.push({ pathname: '/admin/customers/' + customer.id, customer: customer })} color="success" >View</Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </GridItem>

        {/* <Purchases /> */}
      </GridContainer>
    </div>
  );
}
