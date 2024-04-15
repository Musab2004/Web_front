import Cookies from 'js-cookie'//Here is the base API
import axios from './API'

export function getCustomers(num = 0, today = false) {
    const token = Cookies.get('token')
    let params = {};
    if (today) {
        params.today = today;
    }
    if (num > 0) {
        params.num = num
    }
    return axios.get(`/customer/`, {
        headers: {
            "Authorization": `Token ${token}`
        },
        params
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}

export function getCustomer(id) {
    const token = Cookies.get('token')
    return axios.get('/customer/' + id + '/', {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        console.log(response.data)
        return response.data
    }).catch(e => {
        console.log(e.message, e.data)
    })
}

export function deletecustomer(id) {
    const token = Cookies.get('token')
    return axios.delete('/customer/' + id + '/', {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}

export async function registerCustomer(data) {
    const token = Cookies.get('token')
    return axios.post('/customer/', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address
    },
        {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(e => {
            console.log(e)
        })
}


export async function updateCustomer(data, id) {
    const token = Cookies.get('token')
    return axios.put('/customer/' + id + "/", data,
        {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(e => {
            console.log(e)
        })
}


export async function getCustomerPurchases(id) {
    const token = Cookies.get('token')
    return axios.get('/customer/purchases/' + id, {
        headers: {
            "Authorization": `Token ${token}`
        },
    }).then(response => {
        return response.data
    }).catch(e => {
        alert(e.message, (e.response.data.detail))
    })
}


export async function getRechargeHistory(id) {
    let token = await Cookies.get('token')
    return axios.get('/recharge-history/' + id + '/', {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(res => {
        console.log(res.data)
        return res.data
    }).catch(e => {
        throw e;
    })
}



// search customers
export async function searchCustomers(search) {
    let token = await Cookies.get('token')
    return axios.get('/customer/search', {
        headers: {
            "Authorization": `Token ${token}`
        },
        params: {
            query: search
        }
    }).then(res => {
        console.log(res.data)
        return res.data
    }).catch(e => {
        throw e;
    })
}