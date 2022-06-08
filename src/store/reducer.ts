import * as actionTypes from "./constants";
import { getToken } from "../utils/login";
const defaultState = {
  token: getToken() || "",
  shoucount: 0,
};
let reducer: any;
reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_TOKEN:
      return { ...state, token: action.value };
      break;
    case actionTypes.ADD_USERINFO:
      return { ...state, userInfo: action.value };
      break;
    case actionTypes.CHANGE_LOGIN:
      return { ...state, isLogin: action.value };
      break;
    case actionTypes.ADD_SHOP:
      return { ...state, shoucount: action.value };
      break;
    case actionTypes.CHANGE_SHOP:
      return { ...state, shoucount: action.value };
      break;
    default:
      return state;
  }
};
export default reducer;
