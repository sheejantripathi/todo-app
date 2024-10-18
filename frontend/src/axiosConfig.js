import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtAccessToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Accept"] = "application/json";
    }

    // Skip browser warning for ngrok
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

    // Add your headers here
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
