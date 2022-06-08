import request from "../utils/request";
export function createOrder(params: any) {
  return request.post("/saveOrder", params);
}
export function payOrder(params: any) {
  return request.get("/paySuccess", { params });
}

export function getOrderList(params: any) {
  return request.get("/order", { params });
}

export function getOrderDetail(id: any) {
  return request.get(`/order/${id}`);
}

export function cancelOrder(id: any) {
  return request.put(`/order/${id}/cancel`);
}

export function confirmOrder(id: any) {
  return request.put(`/order/${id}/finish`);
}
