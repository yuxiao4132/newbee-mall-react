import axios from "axios";
import { getToken } from "../utils/login";
import { BASE_URL, TIMEOUT } from "../config/baseurl";
import { navigate } from "../App";
import Show from "./tips";
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

instance.interceptors.request.use(
  (config: any) => {
    config.headers["token"] = getToken() || "";
    return config;
  },
  (err) => {
    console.log(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    if (res.data.resultCode === 416) {
      if (res.config.url !== "/shop-cart") {
        Show();
        navigate("/login");
      }
    }
    return res.data;
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log("请求错误");
          break;
        case 401:
          console.log("登录失效");
          break;
        default:
          console.log("其他错误信息");
      }
    }
    return err;
  }
);

export default instance;
