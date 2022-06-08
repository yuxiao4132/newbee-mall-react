import React, {
  memo,
  useState,
  useEffect,
  useRef,
  useCallback,
  startTransition,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import TobBar from "../../components/topbar";
import { ProductWrapper } from "./style";
import {
  LeftOutline,
  MoreOutline,
  MessageOutline,
  TruckOutline,
  ExclamationOutline,
} from "antd-mobile-icons";
import { getDetail, addCart } from "../../api/product";
import { renderimg } from "../../utils/filter-img";
import { changeShop } from "../../store/actions";

function Product() {
  const dispatch = useDispatch();
  let { shoucount } = useSelector((state: any) => ({
    shoucount: state.shoucount,
  }));
  const navigate = useNavigate();
  const shopdetails: any = useRef();
  const location = useLocation();
  const [shopinfo, setshopinfo] = useState({
    goodsCoverImg: "",
    goodsName: "",
    sellingPrice: "",
    goodsDetailContent: "",
  });
  const detailinfo = async (key: string) => {
    const { data } = await getDetail(key);
    setshopinfo(data);
    console.log(data);
    shopdetails.current.innerHTML = data.goodsDetailContent;
  };
  const back = useCallback(() => {
    startTransition(() => {
      navigate(-1);
    });
  }, []);
  const shopping = async (key: string, flag: number) => {
    const data: any = await addCart({ goodsCount: 1, goodsId: key });
    console.log(data);
    if (data.resultCode === 200) {
      dispatch(changeShop(++shoucount));
      if (flag === 1) {
        startTransition(() => {
          navigate("/cart");
        });
      } else {
        Toast.show({
          icon: "success",
          content: "添加成功",
        });
      }
    } else {
      if (flag === 1) {
        startTransition(() => {
          navigate("/cart");
        });
        return;
      }
      Toast.show({
        icon: <ExclamationOutline />,
        content: data.message,
      });
    }
  };
  useEffect(() => {
    const id: string = location.pathname.substring(9);
    detailinfo(id);
  }, []);
  const renderbadge = () => {
    if (shoucount !== 0) {
      return <div className="badge">{shoucount}</div>;
    } else {
      return "";
    }
  };
  return (
    <ProductWrapper>
      <TobBar
        back={back}
        left={<LeftOutline />}
        title={"商品详情"}
        right={<MoreOutline />}
      />
      <div className="shopinfo">
        <img src={renderimg(shopinfo.goodsCoverImg)} />
        <p className="name">{shopinfo.goodsName}</p>
        <p className="express">免邮费 顺丰快递</p>
        <p className="price">￥{shopinfo.sellingPrice}</p>
      </div>
      <div className="configure">
        <div className="configure-item  border-right">概述</div>
        <div className="configure-item  border-right">参数</div>
        <div className="configure-item  border-right">安装服务</div>
        <div className="configure-item ">常见问题</div>
      </div>
      <div ref={shopdetails} className="introduce"></div>
      <div className="placeholder"></div>
      <div className="tabbar">
        <div className="tabbar-icon">
          <MessageOutline className="icon" />
          <p className="name">客服</p>
        </div>
        <div className="tabbar-icon margin">
          <TruckOutline className="icon" />
          <p
            className="name"
            onClick={() => {
              startTransition(() => {
                navigate("/cart");
              });
            }}
          >
            购物车
          </p>
          {renderbadge()}
        </div>
        <div className="purchase">
          <button
            onClick={() => {
              shopping(location.pathname.substring(9), 0);
            }}
            className="button left"
          >
            加入购物车
          </button>
          <button
            className="button right"
            onClick={() => {
              shopping(location.pathname.substring(9), 1);
            }}
          >
            立即购买
          </button>
        </div>
      </div>
    </ProductWrapper>
  );
}

export default memo(Product);
