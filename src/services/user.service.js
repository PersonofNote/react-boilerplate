import axios from "axios";
import authHeader from "./auth-header";

// TODO: set up environment variables
const API_URL =  process.env.NODE_ENV === "development" ? "http://localhost:5000/" : process.env.REACT_APP_URL;

const getPublicContent = () => {
  return axios.get(API_URL);
};

const getUserBoard = (userId) => {
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