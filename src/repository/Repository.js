import axios from 'axios'

const baseDomain = 'http://localhost:5000'
const baseURL = `${baseDomain}`

const instance = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('access-token'),
    'X-Auth-Token': sessionStorage.getItem('session-id')
  }
})

const errorHandler = (error) => {
  return Promise.reject({ error })
}

const successHandler = (response) => {
  sessionStorage.setItem('session-id',response.headers["x-auth-token"])
  return response
}

instance.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
);

export default instance

export const setAuthorizationHeader = (axiosInstance, token) => {
  axiosInstance.defaults.headers['Authorization'] = token
  axios.defaults.headers['Authorization'] = token
}
