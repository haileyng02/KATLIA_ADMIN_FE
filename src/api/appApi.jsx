import axios from "axios";

const appApi = axios.create({
  baseURL: "http://localhost:2041", //https://katlia-server.onrender.com
});

export default appApi;
