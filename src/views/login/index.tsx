import React, { memo, useContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginWrapper } from "./style";
import {
  LeftOutline,
  MoreOutline,
  ExclamationOutline,
} from "antd-mobile-icons";
import { Form, Input, Button, Toast } from "antd-mobile";
import md5 from "js-md5";
import Verification from "../../components/verification";
import { verificationContext } from "../../components/verification";
import { login, register } from "../../api/login";
import { getUserInfo } from "../../api/user";
import { getCart } from "../../api/cart";

import { setToken } from "../../utils/login";
import { changeShop, changeLogin, addUserInfo } from "../../store/actions";
const info: any = {
  name: "",
  verification: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [islogin, setislogin] = useState("login");
  const verification: any = useContext(verificationContext);
  const infochange = (value: any, index: string) => {
    info[index] = value;
  };
  const cartinfo = async () => {
    const { data } = await getCart();
    if (data) {
      dispatch(changeShop(data.length));
    }
  };
  const btnclick = useCallback(async () => {
    if (info["name"] === "" || info["password"] === "") {
      Toast.show({
        icon: <ExclamationOutline />,
        content: "请输入用户名密码",
      });
      return;
    }
    if (info["verification"].toUpperCase() != verification.imgCode) {
      Toast.show({
        icon: <ExclamationOutline />,
        content: "验证码错误",
      });
      return;
    }

    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!reg.test(info["name"])) {
      Toast.show({
        icon: <ExclamationOutline />,
        content: "请输入正确的手机号!",
      });
      return;
    }
    if (islogin === "login") {
      const data: any = await login({
        loginName: info["name"],
        passwordMd5: md5(info["password"]),
      });
      if (data.resultCode === 200) {
        setToken(data.data);
        cartinfo();
        Toast.show({
          icon: "success",
          content: "登录成功",
        });
        navigate("/");
      } else {
        Toast.show({
          icon: <ExclamationOutline />,
          content: "登录失败",
        });
      }
    } else {
      if (info["password"].length < 6) {
        Toast.show({
          icon: <ExclamationOutline />,
          content: "密码不能小于6位",
        });
        return;
      }
      const data: any = await register({
        loginName: info["name"],
        password: info["password"],
      });

      if (data.resultCode === 500) {
        Toast.show({
          icon: <ExclamationOutline />,
          content: "用户名已存在！",
        });
      } else {
        Toast.show({
          icon: "success",
          content: "注册成功",
        });
        setislogin("login");
        verification.imgCode = verification.draw();
      }
    }
  }, [islogin]);
  const loginclick = () => {
    verification.imgCode = verification.draw();
    if (islogin === "login") {
      setislogin("register");
    } else {
      setislogin("login");
    }
  };
  const renderlogin = () => {
    if (islogin === "login") {
      return (
        <div onClick={loginclick} className="register">
          立即注册
        </div>
      );
    } else {
      return (
        <div onClick={loginclick} className="getlogin">
          已有登录账号
        </div>
      );
    }
  };
  return (
    <LoginWrapper>
      <div className="navigation">
        <LeftOutline className="outline" />
        <span className="login">{islogin === "login" ? "登录" : "注册"}</span>
        <MoreOutline className="outline" />
      </div>
      <div className="img">
        <img src="https://s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png" />
      </div>
      <div className="from">
        <Form layout="horizontal">
          <Form.Item label="用户名" name="username">
            <Input
              onChange={(value) => {
                infochange(value, "name");
              }}
              placeholder="请输入用户名"
              clearable
            />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input
              onChange={(value) => {
                infochange(value, "password");
              }}
              placeholder="请输入密码"
              clearable
              type="password"
            />
          </Form.Item>
          <Form.Item label="验证码" name="verification">
            <div className="verification">
              <Input
                onChange={(value) => {
                  infochange(value, "verification");
                }}
                placeholder="请输验证码"
                clearable
              />
              <Verification />
            </div>
          </Form.Item>
        </Form>
        {renderlogin()}
      </div>
      <div className="button">
        <Button onClick={btnclick} block shape="rounded" color="primary">
          登录
        </Button>
      </div>
    </LoginWrapper>
  );
}

export default memo(Login);
