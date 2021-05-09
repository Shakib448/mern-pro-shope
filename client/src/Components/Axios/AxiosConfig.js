import axios from "axios";

const instance = axios.create({
  //   baseURL: "https://boiling-taiga-68224.herokuapp.com",
  baseURL: "http://localhost:5000",
});

export default instance;
