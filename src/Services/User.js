import Cookies from 'js-cookie'//Here is the base API
import axios from './API'

export function checkUser() {
  try {
    console.log("trying")
    const value = Cookies.get('token')
    console.log(value)
    return value
  } catch (e) {
    console.log(e.message)
  }
}

export async function signUser(email, password) {
  return axios.post('/auth/login/', {
    "email": email,
    "password": password
  },
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
}

export function signOut() {
  const token = Cookies.get('token')
  Cookies.remove('token')
  Cookies.remove('user')
  return axios.post('/auth/logout/', {
  },
    {
      headers: {
        "Authorization": `Token ${token}`
      }
    }).then(res => {
      return res.data
    }).catch(e => {
      console.log(e.message, JSON.stringify(e.response.data))
    })
}

export function updateUser(data, id) {
  const user = Cookies.getJSON('user')
  const token = Cookies.get('token')
  return axios
    .put(`/user/${id}/`, data,
      {
        headers: {
          "Authorization": `Token ${token}`
        }
      })
    .then(res => {
      return res.data
    })
    .catch(err => { throw err });
}

export function updateLocation(value) {
  console.log(value)
  const user = Cookies.getJSON('user')
  const token = Cookies.get('token')
  axios
    .patch(`/user/${user.id}/`, {
      "address": value.address,
      "latitude": value.latitude,
      "longitude": value.longitude,
    },

      {
        headers: {
          "Authorization": `Token ${token}`
        }
      })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err.message, JSON.stringify(err.data.data)));
}

export function updatePassword(values) {
  console.log(values)
  const user = Cookies.getJSON('user')
  const token = Cookies.get('token')
  console.log("User data is : ", user)
  axios
    .patch(`/changePassword/`, {
      "old_password": values.oldpassword,
      "new_password": values.password,
      "user": user.id
    },

      {
        headers: {
          "Authorization": `Token ${token}`
        }
      })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err.message, JSON.stringify(err.data.data)));
}


export async function getCities() {
  try {
    const response = await axios.get('/city/')
    return response.data
  } catch (e) {
    console.log(e.data)
    alert(e.message, JSON.stringify(e.response))
  }
}

export async function getAreas(id) {
  const token = await Cookies.get('token')
  return axios.get('/area/?city_id=' + id).then(response => {
    return response.data
  }).catch(e => {
    console.log(e.data)
    throw e
  })
}

export async function getSubAreas(id) {
  const token = await Cookies.get('token')
  return axios.get('/subareas/?area_id=' + id).then(response => {
    return response.data
  }).catch(e => {
    console.log(e.data)
    throw e
  })
}


export async function updateSubArea(value) {
  console.log(value)
  const user = await Cookies.getJSON('customer')
  const token = await Cookies.get('token')
  let userData = JSON.parse(user)
  console.log(userData.id)
  console.log("User data is : ", userData)
  axios
    .patch(`/customer/${userData.id}/`, {
      // "address" : value.address,
      "subarea": value,
    },

      {
        headers: {
          "Authorization": `Token ${token}`
        }
      })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => alert(err.message, JSON.stringify(err.data.data)));
}

// add a new user
export async function addUser(values) {
  const token = await Cookies.get('token')
  return axios.post('/user/', values,
    {
      headers: {
        "Authorization": `Token ${token}`
      }
    }).then(res => {
      return res.data
    }).catch(e => {
      console.log(e.message, JSON.stringify(e.response.data))
    })
}

// delete a user
export async function deleteUser(id) {
  const token = await Cookies.get('token')
  return axios.delete('/user/' + id,
    {
      headers: {
        "Authorization": `Token ${token}`
      }
    }).then(res => {
      return res.data
    }).catch(e => {
      console.log(e.message, JSON.stringify(e.response.data))
    })
}

// get all users
export async function getUsers() {
  const token = await Cookies.get('token')
  return axios.get('/user/',
    {
      headers: {
        "Authorization": `Token ${token}`
      }
    }).then(res => {
      return res.data
    }).catch(e => {
      console.log(e.message, JSON.stringify(e.response.data))
    })
}

// get a user
export async function getUser(id) {
  const token = await Cookies.get('token')
  return axios.get('/user/' + id,
    {
      headers: {
        "Authorization": `Token ${token}`
      }
    }).then(res => {
      return res.data
    }).catch(e => {
      console.log(e.message, JSON.stringify(e.response.data))
    })
}