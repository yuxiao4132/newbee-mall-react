import React, {
  memo,
  useEffect,
  useState,
  startTransition,
  useCallback,
  createContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { CartWrapper } from "./style";
import TapTar from "../../components/topbar";
import TabBar from "../../components/tabbar";
import { Checkbox, Toast } from "antd-mobile";
import { MoreOutline, ExclamationOutline } from "antd-mobile-icons";
import { getCart, modifyCart } from "../../api/cart";
import { renderimg } from "../../utils/filter-img";
const shopid: any = [];
const productinfo: any = {};
const cartContext = createContext(productinfo);
function Category() {
  //记录所有checkbox的状态(不包括全选)
  const [checklist, setchecklist] = useState([]);
  //合计值
  const [total, settotal] = useState(0);
  //商品数据
  const [shoplist, setshoplist] = useState([]);
  //记录是否全选的值标记
  let [shoplength, setshoplength] = useState(0);
  const navigate = useNavigate();
  const cartinfo = async () => {
    const data: any = await getCart();
    if (data.resultCode !== 200) {
      startTransition(() => {
        navigate("/login");
      });
    }

    let checklist: any = [];
    //初始化checkbox状态为true
    data.data.forEach(() => {
      checklist.push(true);
    });
    //计算合计
    let total = data.data.reduce(
      (previousValue: any, currentValue: any) =>
        previousValue + currentValue.goodsCount * currentValue.sellingPrice,
      0
    );

    setchecklist(checklist);
    settotal(total);
    setshoplist(data.data);
    setshoplength(data.data.length);
  };

  useEffect(() => {
    cartinfo();
  }, []);
  useEffect(() => {
    const list: any = [];
    checklist.forEach((item: any, index: any) => {
      if (item === true) {
        list.push(shoplist[index]);
      }
    });
    productinfo.shoplist = list;
  }, [checklist, shoplist]);

  const changeshop = async (
    flag: boolean,
    value: number,
    key: number,
    index: number
  ) => {
    if (flag) {
      if (value >= 5) {
        Toast.show({
          icon: <ExclamationOutline />,
          content: "超出单个商品的最大购买数量",
        });
      }
      const params = {
        cartItemId: key,
        goodsCount: ++value,
      };
      //修改商品数量,获取修改后最新的数据渲染
      await modifyCart(params);
      const data: any = await getCart();
      let total = 0;
      console.log(data.data);
      data.data.forEach((item: any, index: any) => {
        if (checklist[index] === true) {
          total += item.goodsCount * item.sellingPrice;
        }
      });
      settotal(total);
      setshoplist(data.data);
    } else {
      const params = {
        cartItemId: key,
        goodsCount: --value,
      };
      console.log(checklist);
      await modifyCart(params);
      const data: any = await getCart();
      let total = 0;
      console.log(data.data);
      data.data.forEach((item: any, index: any) => {
        if (checklist[index] === true) {
          total += item.goodsCount * item.sellingPrice;
        }
      });
      settotal(total);
      setshoplist(data.data);
    }
  };
  const gocreateorder = () => {
    if (shoplength === 0) {
      Toast.show({
        icon: <ExclamationOutline />,
        content: "请选择商品",
      });
      return;
    }
    startTransition(() => {
      navigate("/createorder/default");
    });
  };
  const checkchange = (bool: any, value: any, index: any) => {
    //此函数完成checkbox改变时,修改其对应的状态。重新set渲染跟新
    //并且重新跟新选中状态的合计值和修改全选标记的状态
    if (bool) {
      const list: any = [...checklist];
      list[index] = true;
      const shop: any = shoplist.find(
        (item: any) => item.cartItemId === value.cartItemId
      );
      const price = total + shop.goodsCount * shop.sellingPrice;
      settotal(price);
      setshoplength(++shoplength);
      setchecklist(list);
    } else {
      const list: any = [...checklist];
      list[index] = false;
      const shop: any = shoplist.find(
        (item: any) => item.cartItemId === value.cartItemId
      );
      const price = total - shop.goodsCount * shop.sellingPrice;
      settotal(price);
      setshoplength(--shoplength);
      setchecklist(list);
    }
  };
  const changeall = useCallback(
    //全选函数,完成判断全选状态，根据全选状态重新计算合计值设置所有checkbox的
    //状态，也修改全选checkbox标记值的状态
    (bool: any) => {
      if (bool) {
        const shop: any = [...shoplist];
        let total = 0;
        for (let i = 0; i < shop.length; i++) {
          total += shop[i].goodsCount * shop[i].sellingPrice;
          shop[i] = true;
        }
        setchecklist(shop);
        setshoplength(shop.length);
        settotal(total);
      } else {
        const shop: any = [...shoplist];
        for (let i = 0; i < shop.length; i++) {
          shop[i] = false;
        }
        setchecklist(shop);
        setshoplength(0);
        settotal(0);
      }
    },
    [shoplength, shoplist]
  );
  const gohome = () => {
    startTransition(() => {
      navigate("/home");
    });
  };
  const rendershop = () => {
    if (shoplist.length) {
      return (
        <div>
          <div className="shoplist">
            {shoplist.map((item: any, index: any) => (
              <div className="shop-item" key={item.cartItemId}>
                <Checkbox
                  onChange={(bool) => {
                    checkchange(bool, item, index);
                  }}
                  checked={checklist[index]}
                />
                <img src={renderimg(item.goodsCoverImg)} />
                <div className="shop-info">
                  <div className="shop-name">
                    <p>
                      {item.goodsName}
                      <span className="count">x{item.goodsCount}</span>
                    </p>
                  </div>
                  <div className="price">
                    <p>￥{item.sellingPrice}</p>
                    <div className="operation">
                      <button
                        disabled={item.goodsCount === 1 ? true : false}
                        className="btn color"
                        onClick={() => {
                          changeshop(
                            false,
                            item.goodsCount,
                            item.cartItemId,
                            index
                          );
                        }}
                      >
                        —
                      </button>
                      <button className="btn margin">{item.goodsCount}</button>
                      <button
                        onClick={() => {
                          changeshop(
                            true,
                            item.goodsCount,
                            item.cartItemId,
                            index
                          );
                        }}
                        className="btn color"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="settlement">
            <div className="select-all">
              <Checkbox
                onChange={changeall}
                //全选是否选中取决于标记值是否等于商品值的长度
                checked={shoplength === shoplist.length ? true : false}
              />
              <span className="name">全选</span>
            </div>
            <div className="total">
              <span>合计:</span>
              <span className="price">￥{total}</span>
            </div>
            <div className="settotal">
              <button onClick={gocreateorder}>结算</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="shopping">
          <img
            src="https://s.yezgea02.com/1604028375097/empty-car.png"
            alt="空购物车"
          />
          <p className="title">购物车空空如也</p>
          <button onClick={gohome} className="btn">
            前往选购
          </button>
        </div>
      );
    }
  };
  return (
    <CartWrapper>
      <TapTar title={"购物车"} right={<MoreOutline />} />
      {rendershop()}
      <TabBar />
    </CartWrapper>
  );
}

export default memo(Category);
export { cartContext };
