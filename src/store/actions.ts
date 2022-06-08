import * as actionTypes from "./constants";
export const addToken: any = (value: string) => ({
  type: actionTypes.ADD_TOKEN,
  value,
});
export const addUserInfo: any = (value: object) => ({
  type: actionTypes.ADD_USERINFO,
  value,
});
export const changeLogin: any = (value: object) => ({
  type: actionTypes.CHANGE_LOGIN,
  value,
});

export const changeShop: any = (value: number) => ({
  type: actionTypes.CHANGE_SHOP,
  value,
});
