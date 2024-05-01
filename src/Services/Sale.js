import Cookies from 'js-cookie'


//Here is the base API
import axios from './API'
import { baseURL } from './Constants';
import moment from 'moment';



export async function getSales() {
    const token = Cookies.get('token')
    let params = {};
    // we need to get sales of current month by using startDate and endDate
    let startDate = moment().startOf('month').format('YYYY-MM-DD');
    let endDate = moment().endOf('month').format('YYYY-MM-DD');
    params = {
        startDate: startDate,
        endDate: endDate
    }
    return axios.get('/sales/', {
        headers: {
            "Authorization": `Token ${token}`
        },
        params: params
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}

export async function getSaleHistory(startDate, endDate) {
    const token = Cookies.get('token')
    let params = {};
    params = {
        startDate: startDate,
        endDate: endDate
    }
    return axios.get('/sales/', {
        headers: {
            "Authorization": `Token ${token}`
        },
        params: params
    }).then(response => {
        return response.data
    }).catch(e => {
        throw e
    })
}

export async function getSale(id) {
    const token = Cookies.get('token')
    return axios.get('/sales/' + id + '/', {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}


export async function getCancelledSales(status, search) {
    const token = Cookies.get('token')
    let params = {};
    if (search != null) {
        params.search = search
    }
    params.status = status
    return axios.get(`/cancelled-sale/?type=JAZZ`, {
        headers: {
            "Authorization": `Token ${token}`
        },
        params: params
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}

export function socket() {
    let socket = new WebSocket(`ws://${baseURL}/ws/sales/`)
    return socket
}


// add sale
export async function addSale(data) {
    const token = Cookies.get('token')
    return axios.post('/customer/sale/', data, {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}
