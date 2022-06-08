import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  startTransition,
} from "react";
import { useNavigate } from "react-router-dom";
import { OrderWrapper } from "./style";
import { Tabs, InfiniteScroll } from "antd-mobile";
import { LeftOutline, MoreOutline } from "antd-mobile-icons";
import { getOrderList } from "../../api/order";
import TobBar from "../../components/topbar";
import { renderimg } from "../../utils/filter-img";
function Order() {
  const navigate = useNavigate();
  const [orderstate, setorderstate] = useState({
    status: "",
    page: 1,
  });

  const [ordervalue, setordervalue] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const loadMore: any = async () => {
    //加载更多函数
    console.log("loadMore");
    let list: any;
    let page = orderstate.page;
    const state = { ...orderstate, page: ++page };
    //page+1发送请求
    const data: any = await getOrderList({
      pageNumber: state.page,
      status: state.status,
    });
    console.log(orderstate, state);
    if (state.page > data.data.totalPage) {
      //暂停loding
      setHasMore(false);
      console.log("false");
      return;
    }
    list = [...ordervalue, ...data.data.list];
    //console.log(list, ordervalue);
    //重置数据状态
    setordervalue(list);
    setorderstate(state);
  };
  const orderlist = async () => {
    const data: any = await getOrderList({
      pageNumber: 1,
      status: orderstate.status,
    });
    setordervalue(data.data.list);
  };
  const tabchange = useCallback(
    //类型改变,初始化页数，重置loding状态和类型状态
    async (key: string) => {
      const data: any = await getOrderList({
        pageNumber: 1,
        status: key,
      });
      setorderstate({ ...orderstate, page: 1, status: key });
      setordervalue(data.data.list);
      setHasMore(true);
    },
    [orderstate]
  );
  const back = useCallback(() => {
    startTransition(() => {
      navigate(-1);
    });
  }, []);
  const goorderdetailed = (key: number) => {
    startTransition(() => {
      navigate(`/order-detailed/${key}`);
    });
  };
  useEffect(() => {
    orderlist();
  }, []);
  const renderorder = () => {
    if (ordervalue.length) {
      return (
        <div className="shoplist">
          {ordervalue.map((item: any) => (
            <div className="shop-item" key={item.orderNo}>
              <div className="ordertime">
                <p>
                  <span>订单时间:</span>
                  <span className="createTime">{item.createTime}</span>
                </p>
                <p>{item.orderStatusString}</p>
              </div>
              <div className="shop">
                {item.newBeeMallOrderItemVOS.map((value: any) => (
                  <div
                    className="shop-order"
                    key={value.goodsId}
                    onClick={() => {
                      goorderdetailed(item.orderNo);
                    }}
                  >
                    <img src={renderimg(value.goodsCoverImg)} />
                    <div className="shop-info">
                      <div className="info-v1">
                        <p>{value.goodsName}</p>
                        <p className="express">全场包邮</p>
                      </div>
                      <div className="info-v2">
                        <p className="price">
                          ￥{value.goodsCount * value.sellingPrice}
                        </p>
                        <p className="count">x{value.goodsCount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* InfiniteScroll存放的位置最好在渲染父元素长列表下面,这样子的话
          InfiniteScroll组件就刚好在长列表下面来操作他的判断长度是否需要加载会更加的准确
          无误一点，放存在其他位置例如这个父元素外面后面存放时
          他的加载就会有一点不准确判断没这么好，会经常不需要的触发 */}
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </div>
      );
    } else {
      return <div className="none">暂无更多数据</div>;
    }
  };

  return (
    <OrderWrapper>
      <TobBar
        left={<LeftOutline />}
        title={"我的订单"}
        right={<MoreOutline />}
        back={back}
      />
      <div className="tab">
        <Tabs onChange={tabchange}>
          <Tabs.Tab title="全部" key="">
            {renderorder()}
          </Tabs.Tab>
          <Tabs.Tab title="待付款" key="0">
            {renderorder()}
          </Tabs.Tab>
          <Tabs.Tab title="待确认" key="1">
            {renderorder()}
          </Tabs.Tab>
          <Tabs.Tab title="待发货" key="2">
            {renderorder()}
          </Tabs.Tab>
          <Tabs.Tab title=" 已发货" key="3">
            {renderorder()}
          </Tabs.Tab>
          <Tabs.Tab title=" 交易完成" key="4">
            {renderorder()}
          </Tabs.Tab>
        </Tabs>
      </div>
    </OrderWrapper>
  );
}

export default memo(Order);
