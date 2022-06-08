import React, {
  useCallback,
  startTransition,
  useEffect,
  useState,
  useContext,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateOrderWrapper } from "./style";
import TobBar from "../../components/topbar";
import { Dialog, Toast } from "antd-mobile";
import {
  LeftOutline,
  MoreOutline,
  RightOutline,
  ExclamationOutline,
} from "antd-mobile-icons";
import { getDefaultAddress, getAddressDetail } from "../../api/address";
import { createOrder, payOrder } from "../../api/order";
import { cartContext } from "../../views/cart";
import { renderimg } from "../../utils/filter-img";
import { changeShop } from "../../store/actions";
function CreateOrder() {
  const location = useLocation();
  const { shoucount } = useSelector((state: any) => ({
    shoucount: state.shoucount,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shop = useContext(cartContext);
  const [address, setaddress] = useState({
    userName: "",
    userPhone: "",
    provinceName: "",
    cityName: "",
    regionName: "",
    detailAddress: "",
    addressId: "",
  });

  const addressinfo = async (key: string) => {
    if (key === "/createorder/default") {
      const { data } = await getDefaultAddress();
      setaddress(data);
    } else {
      const id = key.substring(13);
      const { data } = await getAddressDetail(id);
      setaddress(data);
    }
  };
  useEffect(() => {
    addressinfo(location.pathname);
  }, []);
  useEffect(() => {
    if (!address) {
      Toast.show({
        icon: <ExclamationOutline />,
        content: "请添加默认收货地址",
      });
      startTransition(() => {
        navigate(`/address-edit/add`);
      });
    }
  }, [address]);
  const back = useCallback(() => {
    startTransition(() => {
      navigate(-1);
    });
  }, []);
  const renderprice = () => {
    let total = shop.shoplist.reduce(
      (prev: any, next: any) => prev + next.sellingPrice * next.goodsCount,
      0
    );
    return total;
  };
  const btnclick = async () => {
    const params = {
      addressId: address.addressId,
      cartItemIds: shop.shoplist.map((item: any) => item.cartItemId),
    };
    const { data } = await createOrder(params);
    Dialog.confirm({
      content: "是否支付",
      onAction: async (action: any) => {
        if (action.key === "confirm") {
          await payOrder({ orderNo: data, payType: 1 });
          Toast.show({
            icon: "success",
            content: "支付成功",
            position: "bottom",
          });
          const length = shoucount - shop.shoplist.length;
          dispatch(changeShop(length));
          startTransition(() => {
            navigate("/order");
          });
        } else {
          const length = shoucount - shop.shoplist.length;
          dispatch(changeShop(length));
          startTransition(() => {
            navigate("/order");
          });
        }
      },
    });
  };

  const goadress = () => {
    startTransition(() => {
      navigate("/address/cart");
    });
  };
  const renderaddress = () => {
    if (address) {
      return (
        <div className="info">
          <p>
            {address.userName}
            {address.userPhone}
          </p>
          <p>
            {address.provinceName}/{address.cityName}/{address.regionName}/
            {address.detailAddress}
          </p>
        </div>
      );
    }
  };
  return (
    <CreateOrderWrapper>
      <TobBar
        left={<LeftOutline />}
        title={"生成订单"}
        right={<MoreOutline />}
        back={back}
      />
      <div className="address" onClick={goadress}>
        {renderaddress()}
        <div className="icon">
          <RightOutline />
        </div>
      </div>
      <div className="shoplist">
        {shop.shoplist.map((item: any) => (
          <div className="shop-item" key={item.cartItemId}>
            <img src={renderimg(item.goodsCoverImg)} />
            <div className="shop-info">
              <p className="title">
                <span>{item.goodsName}</span>
                <span className="count">x{item.goodsCount}</span>
              </p>
              <p className="price">￥{item.sellingPrice * item.goodsCount}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="tabbar">
        <div className="price">
          <p>商品金额</p>
          <p className="settlement">￥{renderprice()}</p>
        </div>
        <button onClick={btnclick} className="btn">
          生成订单
        </button>
      </div>
    </CreateOrderWrapper>
  );
}

export default CreateOrder;
