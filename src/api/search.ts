import request from "../utils/request";
export function getsearch(params: any) {
  return request.get("/search", { params });
}
