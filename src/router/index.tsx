import React from "react";
import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
const Login = React.lazy(() => import("../views/login"));
const Home = React.lazy(() => import("../views/home"));
const Address = React.lazy(() => import("../views/address"));
const AddressEdit = React.lazy(() => import("../views/address-edit"));
const Category = React.lazy(() => import("../views/category"));
const CreateOrder = React.lazy(() => import("../views/createorder"));
const Order = React.lazy(() => import("../views/order"));
const OrderDetailed = React.lazy(() => import("../views/order-detailed"));
const Product = React.lazy(() => import("../views/product"));
const Search = React.lazy(() => import("../views/search"));
const Setting = React.lazy(() => import("../views/setting"));
const User = React.lazy(() => import("../views/user"));
const Cart = React.lazy(() => import("../views/cart"));
const My = React.lazy(() => import("../views/my"));
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/address",
    element: <Address />,
  },
  {
    path: "/address-edit/:id",
    element: <AddressEdit />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/address/:id",
    element: <Address />,
  },
  {
    path: "/createorder/:id",
    element: <CreateOrder />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/order-detailed/:id",
    element: <OrderDetailed />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/search/:info",
    element: <Search />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/my",
    element: <My />,
  },
];
export default routes;
