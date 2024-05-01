import Cookies from 'js-cookie'//Here is the base API
import axios from './API'

export function getSuppliers(num = 0, today = false) {
    const token = Cookies.get('token')
    let params = {};
    if (today) {
        params.today = today;
    }
    if (num > 0) {
        params.num = num
    }
    return axios.get(`/supplier/`, {
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

export function getSupplier(id) {
    const token = Cookies.get('token')
    return axios.get('/supplier/' + id + '/', {
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

export function deletesupplier(id) {
    const token = Cookies.get('token')
    return axios.delete('/supplier/' + id + '/', {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}

export async function registerSupplier(data) {
    const token = Cookies.get('token')
    return axios.post('/supplier/', {
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


export async function updateSupplier(data, id) {
    const token = Cookies.get('token')
    return axios.put('/supplier/' + id + "/", data,
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


export async function getSupplierPurchases(id) {
    const token = Cookies.get('token')
    return axios.get('/supplier/purchases/' + id, {
        headers: {
            "Authorization": `Token ${token}`
        },
    }).then(response => {
        return response.data
    }).catch(e => {
        alert(e.message, (e.response.data.detail))
    })
}


// search suppliers
export async function searchSuppliers(search) {
    let token = await Cookies.get('token')
    return axios.get('/supplier/search', {
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