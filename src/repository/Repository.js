import axios from 'axios'

const baseDomain = 'http://cols-be.ml'
const baseURL = `${baseDomain}`

export default axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Content-Type': 'application/json',
    Authorization: `${localStorage.getItem('access-token')}`
  }
})

export const setAuthorizationHeader = (axiosInstance, token) => {
  axiosInstance.defaults.headers['Authorization'] = token
  axios.defaults.headers['Authorization'] = token
}
