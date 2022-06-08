import React, {
  useState,
  useCallback,
  startTransition,
  memo,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchBar, InfiniteScroll, List } from "antd-mobile";
import { SearchtWrapper } from "./style";
import { LeftOutline } from "antd-mobile-icons";
import TopBar from "../../components/topbar";
import _ from "lodash";
import { getsearch } from "../../api/search";
import { renderimg } from "../../utils/filter-img";
let keyword = "";
function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  //获取路径pathname
  let searchid: any = location.pathname.substring(8);
  //是否加载
  const [hasMore, setHasMore] = useState(true);
  //搜索类型
  const [searchstate, setsearchstate] = useState("");
  //当且页数
  let [page, setpage] = useState(1);
  let [shoplist, setshoplist] = useState([]);
  //总页数
  const [totalPage, settotalPage] = useState(0);
  //条件搜索
  const [searchkey, setsearchkey] = useState(undefined);
  useEffect(() => {
    //searchid满足if条件判断下代表为带有条件的搜索
    //所以满足请求数据，保存搜索条件
    if (searchid !== "home" && searchid !== "category") {
      setsearchkey(searchid);
      idsearch();
    }
  }, []);
  //条件搜索默认第一次进入页面请求的数据
  const idsearch = async () => {
    const { data } = await getsearch({
      pageNumber: page,
      goodsCategoryId: searchid,
      keyword: keyword,
      orderBy: searchstate,
    });
    const list: any = [...shoplist, ...data.list];
    setshoplist(list);
    settotalPage(data.totalPage);
    console.log(data);
  };
  //触底加载更多数据函数
  const lodaing: any = async () => {
    console.log("loadMore");
    let lodaingpage = page;
    // setpage(++page);
    if (++lodaingpage > totalPage) {
      setHasMore(false);
      return;
    }
    const { data } = await getsearch({
      pageNumber: lodaingpage,
      goodsCategoryId: searchkey,
      keyword: keyword,
      orderBy: searchstate,
    });
    // console.log(data);
    const list: any = [...shoplist, ...data.list];
    setpage(lodaingpage);
    setshoplist(list);
  };
  const back: any = useCallback(() => {
    startTransition(() => {
      navigate(-1);
    });
  }, []);
  //输入框内容发生改变时的请求函数
  const change = useCallback(
    _.debounce(
      async (value: string) => {
        let changepage = undefined;
        if (keyword !== value) {
          changepage = 1;
          setpage(1);
        }
        keyword = value;
        if (value === "" && searchkey === undefined) {
          setshoplist([]);
          return;
        }
        const { data } = await getsearch({
          pageNumber: changepage || page,
          goodsCategoryId: searchkey,
          keyword: value,
          orderBy: searchstate,
        });
        // console.log(data);
        setshoplist(data.list);
        settotalPage(data.totalPage);
        setHasMore(true);
      },
      300,
      {
        leading: true,
      }
    ),
    [searchstate, page, searchkey]
  );
  //切换搜索类型请求的函数
  const searchclick = async (key: string) => {
    if (key !== searchstate) {
      const { data } = await getsearch({
        pageNumber: 1,
        goodsCategoryId: searchkey,
        keyword: keyword,
        orderBy: key,
      });
      console.log(data);
      if (data) {
        setshoplist(data.list);
        settotalPage(data.totalPage);
        setpage(1);
        setsearchstate(key);
        setHasMore(true);
      }
    }
  };
  const shopclick = useCallback((key: number) => {
    startTransition(() => {
      navigate(`/product/${key}`);
    });
  }, []);

  const rendersearch = () => {
    if (shoplist.length) {
      return (
        <List>
          {shoplist.map((item: any, key: any) => (
            <List.Item
              onClick={() => {
                shopclick(item.goodsId);
              }}
              key={key}
            >
              <div className="item">
                <img src={renderimg(item.goodsCoverImg)} />
                <div className="item-info">
                  <p className="goodsname">{item.goodsName}</p>
                  <p className="goodsintro">{item.goodsIntro}</p>
                  <p className="price">￥{item.sellingPrice}</p>
                </div>
              </div>
            </List.Item>
          ))}
          <InfiniteScroll loadMore={lodaing} hasMore={hasMore} />
        </List>
      );
    } else {
      return (
        <div className="gosearch">
          <img src="https://s.yezgea02.com/1604041313083/kesrtd.png" />
          <p>搜索想要的商品</p>
        </div>
      );
    }
  };
  return (
    <SearchtWrapper>
      <TopBar
        left={<LeftOutline />}
        title={<SearchBar onChange={change} />}
        back={back}
      />
      <div className="shoplist">
        <div className="shop-title">
          <div
            onClick={() => {
              searchclick("");
            }}
            className={searchstate === "" ? "bgc" : ""}
          >
            推荐
          </div>
          <div
            onClick={() => {
              searchclick("new");
            }}
            className={searchstate === "new" ? "bgc" : ""}
          >
            新品
          </div>
          <div
            onClick={() => {
              searchclick("price");
            }}
            className={searchstate === "price" ? "bgc" : ""}
          >
            价格
          </div>
        </div>
        <div className="shop-item">{rendersearch()}</div>
      </div>
    </SearchtWrapper>
  );
}

export default memo(Search);
