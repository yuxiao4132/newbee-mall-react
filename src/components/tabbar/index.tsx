import React, { memo, useState, startTransition, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { TabBar } from "antd-mobile";
import {
  AppOutline,
  UnorderedListOutline,
  TruckOutline,
  UserOutline,
} from "antd-mobile-icons";
import { TabBarWrapper } from "./style";

function Order() {
  let { shoucount } = useSelector((state: any) => ({
    shoucount: state.shoucount,
  }));
  const tabs = [
    {
      key: "/home",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "/category",
      title: "分类",
      icon: <UnorderedListOutline />,
    },
    {
      key: "/cart",
      title: "购物车",
      badge: !shoucount ? "" : shoucount,
      icon: <TruckOutline />,
    },
    {
      key: "/user",
      title: "我的",
      icon: <UserOutline />,
    },
  ];
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("/home");
  const path = useLocation();
  useEffect(() => {
    setActiveKey(path.pathname);
  }, []);
  const activechange = (key: any) => {
    startTransition(() => {
      navigate(key);
    });
  };
  return (
    <TabBarWrapper>
      <TabBar activeKey={activeKey} onChange={activechange}>
        {tabs.map((item) => (
          <TabBar.Item
            badge={item.badge}
            key={item.key}
            icon={item.icon}
            title={item.title}
          />
        ))}
      </TabBar>
    </TabBarWrapper>
  );
}

export default memo(Order);
