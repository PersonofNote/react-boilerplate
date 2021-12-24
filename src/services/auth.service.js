import axios from "axios";

// TODO: set up env vars
const API_URL = "http://localhost:5000/";

const register = (username, email, password) => {
  return axios.post(API_URL + "auth/signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  console.log("Logging in")
  return axios
    .post(API_URL + "/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.user.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data.user;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;