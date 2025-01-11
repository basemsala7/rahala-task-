import axios from "axios";

const useAxiosConfig = () => {
  axios.defaults.baseURL = "https://shoes-data-json-server.onrender.com/";
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Accept"] = "application/json";

  return {};
};
export { useAxiosConfig };
