import axios from "axios";

const AuthorizationAxios = axios.create({
  baseURL:process.env.REACT_APP_BASE_URL
})

export default AuthorizationAxios;
