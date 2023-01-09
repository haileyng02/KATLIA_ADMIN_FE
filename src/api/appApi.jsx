import axios from "axios";

const appApi = axios.create({
  baseURL: "http://localhost:2041", //https://katlia-server.onrender.com //http://localhost:2041
});

export default appApi;
