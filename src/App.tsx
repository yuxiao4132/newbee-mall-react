import React, { useEffect } from "react";
import { useRoutes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import routes from "./router";
import { getCart } from "./api/cart";
import { changeShop } from "./store/actions";
let navigate: any;
function App() {
  navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    cartinfo();
  }, []);
  const dispatch = useDispatch();
  const cartinfo = async () => {
    const { data } = await getCart();
    if (data) {
      dispatch(changeShop(data.length));
      if (location.pathname === "/login") {
        navigate("/");
      }
    }
  };

  return <div className="App">{useRoutes(routes)}</div>;
}

export default App;
export { navigate };
