import request from "../utils/request";
export function getDetail(id: string) {
  return request.get(`/goods/detail/${id}`);
}
export function addCart(params: any) {
  return request.post("/shop-cart", params);
}

export function getCategory() {
  return request.get("/categories");
}
