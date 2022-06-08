import React, {
  startTransition,
  memo,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserWrapper } from "./style";
import TopBar from "../../components/topbar";
import TabBar from "../../components/tabbar";
import { List } from "antd-mobile";
import { LeftOutline, MoreOutline } from "antd-mobile-icons";
import { getUserInfo } from "../../api/user";
function User() {
  const navigate = useNavigate();
  const [userinfo, setuserinfo] = useState({
    nickName: "",
    introduceSign: "",
    loginName: "",
  });
  const usertoken = async () => {
    const { data }: any = await getUserInfo();
    setuserinfo(data);
  };
  useEffect(() => {
    usertoken();
  }, []);
  const leave = (key: string) => {
    startTransition(() => {
      navigate(key);
    });
  };
  const back = useCallback(() => {
    startTransition(() => {
      navigate(-1);
    });
  }, []);
  return (
    <UserWrapper>
      <TopBar
        left={<LeftOutline />}
        right={<MoreOutline />}
        title={"我的"}
        back={back}
      />
      <div className="userinfo">
        <div className="user">
          <div className="avatar">
            <img src="https://s.yezgea02.com/1604040746310/aaaddd.png" />
          </div>
          <div className="info">
            <p>昵称:{userinfo.nickName}</p>
            <p className="margin">登录名:{userinfo.loginName}</p>
            <p>个性签名:{userinfo.introduceSign}</p>
          </div>
        </div>
      </div>
      <List className="list">
        <List.Item
          onClick={() => {
            leave("/order");
          }}
        >
          我的订单
        </List.Item>
        <List.Item
          onClick={() => {
            leave("/setting");
          }}
        >
          账号管理
        </List.Item>
        <List.Item
          onClick={() => {
            leave("/address/user");
          }}
        >
          地址管理
        </List.Item>
        <List.Item
          onClick={() => {
            leave("/my");
          }}
        >
          关于我们
        </List.Item>
      </List>
      <TabBar />
    </UserWrapper>
  );
}

export default memo(User);
