import request from "../utils/request";
export function getCart() {
  return request.get("/shop-cart");
}
export function modifyCart(params: any) {
  return request.put("/shop-cart", params);
}
