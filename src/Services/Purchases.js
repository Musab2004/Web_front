import Cookies from 'js-cookie'


//Here is the base API
import axios from './API'
import { baseURL } from './Constants';
import moment from 'moment';



export async function getPurchases() {
    const token = Cookies.get('token')
    let params = {};
    // we need to get purchases of current month by using startDate and endDate
    let startDate = moment().startOf('month').format('YYYY-MM-DD');
    let endDate = moment().endOf('month').format('YYYY-MM-DD');
    params = {
        startDate: startDate,
        endDate: endDate
    }
    return axios.get('/purchases/', {
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

export async function getPurchaseHistory(startDate, endDate) {
    const token = Cookies.get('token')
    let params = {};
    params = {
        startDate: startDate,
        endDate: endDate
    }
    return axios.get('/purchases/', {
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

export async function getPurchase(id) {
    const token = Cookies.get('token')
    return axios.get('/purchases/' + id + '/', {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}


export async function getCancelledPurchases(status, search) {
    const token = Cookies.get('token')
    let params = {};
    if (search != null) {
        params.search = search
    }
    params.status = status
    return axios.get(`/cancelled-purchase/?type=JAZZ`, {
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
    let socket = new WebSocket(`ws://${baseURL}/ws/purchases/`)
    return socket
}


// add purchase
export async function addPurchase(data) {
    const token = Cookies.get('token')
    return axios.post('/supplier/purchase/', data, {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}
