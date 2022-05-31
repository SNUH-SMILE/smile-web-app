import axios from "axios";

const AuthorizationAxios = axios.create({
  baseURL:process.env.REACT_APP_BASE_URL
})

// 요청전에 LocalStorage 에 담겨 있는 토큰 헤더에 세팅
AuthorizationAxios.interceptors.request.use(
    function (config) {
        config.headers={'Authorization':`Bearer ${localStorage.getItem('Authorization')}`,...config.headers}
      return config;
    }
)

export default AuthorizationAxios;
