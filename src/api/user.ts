import request from "../utils/request";
export function getUserInfo() {
  return request.get("/user/info");
}
export function editUserInfo(params: any) {
  return request.put("/user/info", params);
}
export function logout() {
  return request.post("/user/logout");
}
