import React, {
  memo,
  useState,
  useCallback,
  startTransition,
  useEffect,
} from "react";
import TopBar from "../../components/topbar";
import { Dialog, Toast } from "antd-mobile";
import { LeftOutline, MoreOutline } from "antd-mobile-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { OrderDetailedWrapper } from "./style";
import {
  getOrderDetail,
  cancelOrder,
  confirmOrder,
  payOrder,
} from "../../api/order";
import { renderimg } from "../../utils/filter-img";
function OrderDetailed() {
  const [order, setorder] = useState({
    orderStatusString: "",
    orderNo: "",
    createTime: "",
    totalPrice: "",
    newBeeMallOrderItemVOS: [],
  });
  const navigate = useNavigate();
  const location = useLocation();
  const orderinfo = async () => {
    const id = location.pathname.substring(16);
    const { data } = await getOrderDetail(id);
    setorder(data);
  };
  const cancelbtn = async () => {
    const id = location.pathname.substring(16);
    Dialog.confirm({
      content: "是否取消订单",
      onConfirm: async () => {
        const data: any = await cancelOrder(id);
        if (data.resultCode === 200) {
          Toast.show({
            icon: "success",
            content: "取消成功",
          });
          orderinfo();
        }
      },
    });
  };
  const confirmbtn = async () => {
    const id = location.pathname.substring(16);
    Dialog.confirm({
      content: "是否确认订单",
      onConfirm: async () => {
        const data: any = await confirmOrder(id);
        if (data.resultCode === 200) {
          Toast.show({
            icon: "success",
            content: "确认成功",
          });
          orderinfo();
        }
      },
    });
  };

  const paybtn = async () => {
    const id = location.pathname.substring(16);
    Dialog.confirm({
      content: "是否支付",
      onConfirm: async () => {
        const data: any = await payOrder({ orderNo: id, payType: 1 });
        if (data.resultCode === 200) {
          Toast.show({
            icon: "success",
            content: "支付成功",
          });
          orderinfo();
        }
      },
    });
  };
  const back = useCallback(() => {
    startTransition(() => {
      navigate(-1);
    });
  }, []);
  useEffect(() => {
    orderinfo();
  }, []);
  const renderbtn = () => {
    switch (order.orderStatusString) {
      case "待支付":
        return (
          <div className="btn">
            <button className="payment" onClick={paybtn}>
              去支付
            </button>
            <button className="cancel" onClick={cancelbtn}>
              取消订单
            </button>
          </div>
        );
        break;
      case "已支付":
        return (
          <div className="btn">
            <div className="btn">
              <button className="cancel" onClick={confirmbtn}>
                确认订单
              </button>
            </div>
          </div>
        );
        break;
      case "手动关闭":
        return "";
        break;
      case "交易成功":
        return "";
        break;
    }
  };
  return (
    <OrderDetailedWrapper>
      <TopBar
        left={<LeftOutline />}
        title={"订单详情"}
        right={<MoreOutline />}
        back={back}
      />
      <div className="shop-state">
        <p className="shop-item">
          <span className="title">订单状态:</span>
          <span className="info">{order.orderStatusString}</span>
        </p>
        <p className="shop-item">
          <span className="title">订单编号:</span>
          <span className="info">{order.orderNo}</span>
        </p>
        <p className="shop-item">
          <span className="title">订单时间:</span>
          <span className="info">{order.createTime}</span>
        </p>
        {renderbtn()}
      </div>
      <div className="shop-price">
        <p className="shop-item">
          <span className="title">商品金额:</span>
          <span className="info">￥{order.totalPrice}</span>
        </p>
        <p className="shop-item">
          <span className="title">配送方式:</span>
          <span className="info">普通快递</span>
        </p>
      </div>
      <div className="shop-list">
        {order.newBeeMallOrderItemVOS.map((item: any) => (
          <div className="shop-item" key={item.goodsId}>
            <div className="item-info">
              <img src={renderimg(item.goodsCoverImg)} />
              <div className="price">
                <div>
                  <p>{item.goodsName}</p>
                  <p className="parcel-post">全场包邮</p>
                </div>
                <p className="total">￥{item.sellingPrice * item.goodsCount}</p>
              </div>
            </div>
            <div className="count">
              <p>x{item.goodsCount}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderDetailedWrapper>
  );
}

export default memo(OrderDetailed);
