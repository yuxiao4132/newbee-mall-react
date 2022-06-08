import request from "../utils/request";
export function getDefaultAddress() {
  return request.get("/address/default");
}

export function getAddressList() {
  return request.get("/address");
}
export function getAddressDetail(id: any) {
  return request.get(`/address/${id}`);
}

export function editAddress(params: any) {
  return request.put("/address", params);
}
export function addAddress(params: any) {
  return request.post("/address", params);
}
export function deleteAddress(id: any) {
  return request.delete(`/address/${id}`);
}
