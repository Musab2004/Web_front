import React from 'react'
import MUIDataTable from "mui-datatables";
import { ButtonGroup, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import moment from 'moment';

const columns = [
    {
        name: "Invoice Number",
        options: {
            filter: false,
            sort: true
        }
    },
    {
        name: "Total",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "Discount",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "Date",
        options: {
            filter: false,
            sort: true
        }
    },
    {
        name: "Actions",
        options: {
            filter: false,
            sort: false
        }
    }];


const options = {
    filterType: 'checkbox',
};


export default function PurchasesTableCustomer(props) {
    const history = useHistory()
    return (
        <MUIDataTable
            title={"Customer Purchases"}
            data={
                props.data?.map((item, index) => {
                    return {
                        "Invoice Number": item.invoice_no,
                        "Discount": item.discount_amount || 0,
                        "Total": item.final_total,
                        "Date": moment(item.transaction_date).format("h:mm DD-MM"),
                        "Actions": (
                            <ButtonGroup disableElevation variant="contained" color="primary">
                                <Button color="primary"
                                    onClick={() => history.push('/admin/sales/view/' + item.id)}
                                >View</Button>
                            </ButtonGroup>)
                    }

                })}
            columns={columns}
            options={options}
        />
    )
}
