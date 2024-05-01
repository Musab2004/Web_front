import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from 'formik'
import * as yup from 'yup'
import Cookies from 'js-cookie'
import { signUser } from '../../Services/User'
import { useHistory } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { userState } from "states/userState";


export default function Login() {
  const history = useHistory()

  const [loading, setLoading] = React.useState(false)
  const [errorMsg, setMsg] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [user, setUser] = userState.use()
  async function handleLogin(values) {
    console.log(values)
    setLoading(true)
    await signUser(values.email, values.password).then(async res => {
      try {
        Cookies.set('token', res.token)
        res.user.permissions = res.user.permissions.map(p => p.name)
        // Cookies.set('user', (res.user))
        setUser(res.user)
        if (res) {
          console.log(res)
          setLoading(false)
          history.push('/admin')

        }
      } catch (e) {
        setLoading(false)
        setMsg(e.response.data.detail)
        setErr(true)
        console.log(e)
      }
    }).catch(e => {
      console.log(e.response)
      setLoading(false)
      if (!e.response)
        setMsg("Network Error! Check Your Internet Connection")
      else
        setMsg(e.response.data.detail)
      setErr(true)
      console.log(e)
    })
  }

  return (
    <div>
      <Snackbar open={err} autoHideDuration={2000} onClose={() => {
        setErr(false)
        window.location.reload()
      }} >
        <Alert severity="error">
          {errorMsg || "Nothing Here"}
        </Alert>
      </Snackbar>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .required(),
          password: yup
            .string()
            .min(4)
            .required(),
        })}
        onSubmit={values => handleLogin(values)}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <div class="hero min-h-screen bg-base-200 card shadow-lg rounded-lg ">
            <div class="flex-col justify-center hero-content lg:flex-row">

              <div class="text-center font-sans lg:text-left">
                <h1 class="mb-5 text-5xl font-bold">
                  Getx POS Login
                </h1>
                <p class="mb-5">
                  Sign In To Getx POS
                </p>
              </div>


              <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form class="card-body" >
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-sans">Email</span>
                    </label>
                    <input
                      placeholder="Email"
                      name="email"
                      class="input font-sans input-bordered"
                      type="text"
                      required
                      value={values.email}
                      onChange={handleChange('email')}
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-sans">Password</span>
                    </label>
                    <input
                      placeholder="password"
                      name="password"
                      class="input font-sans input-bordered"
                      type="password"
                      value={values.password}
                      required
                      autoComplete="current-password"
                      onChange={handleChange('password')}
                    />
                  </div>
                  <div class="form-control mt-6">
                    <input
                      type="submit"
                      value="Login"
                      class="btn btn-primary"
                      disabled={!isValid}
                      onClick={handleSubmit}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
      <Loading open={loading} />
    </div>
  );
}
