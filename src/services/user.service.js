import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/";

const getPublicContent = () => {
  return axios.get(API_URL);
};

const getUserBoard = (userId) => {
  console.log("In function, user id is: ")
  userId = userId.userId
  return axios.get(API_URL + "/users/" + userId, { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};