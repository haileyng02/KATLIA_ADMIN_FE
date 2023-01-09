import axios from "axios";

const appApi = axios.create({
  baseURL: "https://katlia-server.onrender.com", //https://katlia-server.onrender.com //http://localhost:2041
});

export default appApi;
