import axios from 'axios'
import * as env from '../environment'

const { API_URL } = env[process.env.REACT_APP_ENVIRONMENT]

const http = axios.create({
  baseURL: API_URL,
  headers: {'Content-Type': 'application/json', withCredentials: true}
})

export default http;