import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

const Axios = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// const authHeaders = () => {
//   if (typeof window !== "undefined") {
//     const item = localStorage.getItem("access_token");
//     const token = item ? JSON.parse(item) : null;
//     Axios.defaults.headers["Authorization"] = "JWT " + token;
//   } else {
//     console.log("ssr for auth headers");
//   }
// };

// authHeaders();

const interceptor = ({ error }) => {
  if (typeof window !== "undefined") {
    const initialLogin = localStorage.getItem("initialLogin");
    console.log(initialLogin);
  }
  const originalRequest = error.config;
  if (
    initialLogin === (false || undefined) &&
    error.response?.status === 401 &&
    error.response.statusText === "Unauthorized"
  ) {
    console.log("token expired");

    const item = localStorage.getItem("refresh_token");
    const token = item ? JSON.parse(item) : null;
    if (token !== null) {
      return Axios.post("/accounts/token/refresh/", { refresh_token: token })
        .then((response) => {
          SetLocalStorage({
            keyname: "access_token",
            val: response.data.access,
          });
          SetLocalStorage({
            keyname: "refresh_token",
            val: response.data.refresh,
          });

          Axios.defaults.headers["Authorization"] =
            "JWT " + response.data.access;
          originalRequest.headers["Authorization"] =
            "JWT " + response.data.access;

          return Axios(originalRequest);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.defaults.headers["Authorization"] = null;
      originalRequest.headers["Authorization"] = null;
      console.log("token not found in local storage");
    }
  } else {
    console.log("network error");
  }
};

// This is to do a intercept of failed requests incase access token epires, and get a new access token
// with the local refresh token, all in the background

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    interceptor({ error: error });
    return Promise.reject(error);
  }
);

export default Axios;
