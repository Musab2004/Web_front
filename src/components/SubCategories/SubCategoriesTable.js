import React from 'react'
import MUIDataTable from "mui-datatables";
import {
    ButtonGroup,
    Button,
    Chip
} from '@material-ui/core'


export default function SubCategoriesTable(props) {
    const columns = [
        {
            name: "ID",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Name",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Tags",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Category",
            sort: true,
            options: {
                filter: true,
                sort: true,
                filterType: "dropdown"
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


    return (
        <MUIDataTable
            title={"SubCategories"}
            data={
                props.data?.map((item, index) => {
                    return {
                        "ID": item.id,
                        "Name": item.name,
                        "Tags": (
                            <div className='row' >
                                {item.tags.map(tag => (
                                    <Chip label={tag} color="primary" variant="outlined" />
                                ))}
                            </div>),
                        "Category": item.category_detail && (item.category_detail.name),
                        "Actions": (
                            <ButtonGroup disableElevation variant="contained" color="primary">
                                <Button color="primary" onClick={() => props.handleUpdate(item)} >UPDATE</Button>
                                <Button color="secondary" onClick={() => props.handleDelete(item)}>DELETE</Button>

                            </ButtonGroup>
                        )
                    }

                })}
            columns={columns}
            options={options}
        />
    )
}
