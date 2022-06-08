import React, {
  useCallback,
  useEffect,
  useState,
  startTransition,
} from "react";
import { useDispatch } from "react-redux";
import { List, Input, Button, Toast } from "antd-mobile";
import { LeftOutline, MoreOutline } from "antd-mobile-icons";
import { SettingWrapper } from "./style";
import TopBar from "../../components/topbar";
import { getUserInfo, editUserInfo, logout } from "../../api/user";
import show from "../../utils/tips";
import { useNavigate } from "react-router-dom";
import md5 from "js-md5";
import { changeShop } from "../../store/actions";
function Setting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [introduceSign, setintroduceSign] = useState("");
  const [password, setpassword] = useState("");
  const userinfo = async () => {
    const { data, resultCode }: any = await getUserInfo();
    if (resultCode !== 200) {
      show();
      navigate("/login");
    }
    setname(data.nickName);
    setintroduceSign(data.introduceSign);
  };
  const back = useCallback(() => {
    startTransition(() => {
      navigate(-1);
    });
  }, []);
  const changeinfo = (fn: any, value: string) => {
    fn(value);
  };
  const preserve = useCallback(async () => {
    const params = {
      introduceSign,
      nickName: name,
      passwordMd5: md5(password),
    };
    const data: any = await editUserInfo(params);
    if (data.resultCode === 200) {
      Toast.show({
        icon: "success",
        content: "保存成功",
      });
    }
    // console.log(data);
  }, [name, introduceSign, password]);
  const loginout = useCallback(async () => {
    const data: any = await logout();
    if (data.resultCode === 200) {
      dispatch(changeShop(0));
      navigate("/home");
    }
  }, []);
  useEffect(() => {
    userinfo();
  }, []);
  return (
    <SettingWrapper>
      <TopBar
        left={<LeftOutline />}
        title={"账号管理"}
        right={<MoreOutline />}
        back={back}
      />
      <div className="userinfo">
        <List>
          <List.Item className="user-item">
            <span className="title">昵称</span>
            <span className="margin">
              <Input
                value={name}
                onChange={(value) => {
                  changeinfo(setname, value);
                }}
              />
            </span>
          </List.Item>
          <List.Item className="user-item">
            <span className="title">个性签名</span>
            <span className="margin">
              <Input
                value={introduceSign}
                onChange={(value) => {
                  changeinfo(setintroduceSign, value);
                }}
              />
            </span>
          </List.Item>
          <List.Item className="user-item">
            <span className="title">修改密码</span>
            <span className="margin">
              <Input
                placeholder="请输入新密码"
                type="password"
                onChange={(value) => {
                  changeinfo(setpassword, value);
                }}
              />
            </span>
          </List.Item>
        </List>
      </div>
      <div className="operation">
        <Button
          onClick={preserve}
          className="btn"
          block
          shape="rounded"
          color="primary"
        >
          保存
        </Button>
        <Button
          onClick={loginout}
          className="btn"
          block
          shape="rounded"
          color="primary"
        >
          退出登录
        </Button>
      </div>
    </SettingWrapper>
  );
}

export default Setting;
