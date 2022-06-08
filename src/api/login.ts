import request from "../utils/request";
export function login(params: any) {
  return request.post("/user/login", params);
}
export function register(params: any) {
  return request.post("/user/register", params);
}
