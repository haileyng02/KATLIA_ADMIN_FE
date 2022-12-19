import axios from 'axios'

const appApi = axios.create({
  baseURL: 'https://katlia-server.onrender.com'
})

export default appApi