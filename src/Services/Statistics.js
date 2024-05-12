import Cookies from 'js-cookie'//Here is the base API
import axios from './API'


// get top customers
export function getTopCustomers() {
    const token = Cookies.get('token')
    return axios.get(`/statistics/top-customers/`, {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}

// get top products
export function getTopProducts() {
    const token = Cookies.get('token')
    return axios.get(`/statistics/top-products/`, {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}

// get current month sales
export function getCurrentMonthSales() {
    const token = Cookies.get('token')
    return axios.get(`/statistics/current-month-sales/`, {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}


// get current month customers
export function getCurrentMonthCustomers() {
    const token = Cookies.get('token')
    return axios.get(`/statistics/current-month-customers/`, {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}