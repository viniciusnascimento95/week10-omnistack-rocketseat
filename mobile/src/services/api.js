import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.8:3333"
  // exp://192.168.43.186:19000
});

export default api;
