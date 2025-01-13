import axios from "axios";
import { api } from "../common/constants";

let token = localStorage.getItem("data");
let refresh = localStorage.getItem("refresh");

// localStorage.removeItem("data")

// localStorage.removeItem("refresh")

console.log(token);
const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    "Content-Type": "application/json;",
    Authorization: token ? `Bearer ${token}` : ``, // до цього ми ще повернемося якось потім
  },
});
instance.interceptors.response.use((res) => res.data);

export default instance;
