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
      console.log(e.message, JSON.stringify(e.data.data))
    })
}

export function updateUser(field, value) {
  console.log(value)
  const user = Cookies.getJSON('user')
  const token = Cookies.get('token')
  axios
    .patch(`/user/${user.id}/`, {
      "push_token": value
    },
      {
        headers: {
          "Authorization": `Token ${token}`
        }
      })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err.data.data));
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
    alert(e.message, JSON.stringify(e.data))
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