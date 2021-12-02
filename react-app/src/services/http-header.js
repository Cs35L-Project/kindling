import axios from "axios";
import AuthService from "./auth.service.js";

export default axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-type": "application/json"
  }
});