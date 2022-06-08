import request from "../utils/request";
export function getHome() {
  return request.get("/index-infos");
}
