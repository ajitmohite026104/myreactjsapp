import axios from "axios";
import { Server } from "../config";

export default class LoginService {
  authenticateUser = (email, password) => {
    return axios
      .post(`${Server.BASE_API_URL}/authenticate`, {
        email: email,
        password: password,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  addUserLogin = (userData) => {
    return axios
      .post(`${Server.BASE_API_URL}/user`, userData)
      .then((res) => {
        if (res.data.success === true) {
          return res.data;
        }
      })
      .catch((err) => console.log(err));
  };

  getUserDetails = (email) => {
    return axios
      .get(`${Server.BASE_API_URL}/user/${email}`)
      .then((res) => {
        if (res.data.success === true) {
          return res.data;
        }
      })
      .catch((err) => console.log(err));
  };
}
