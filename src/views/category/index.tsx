import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
  memo,
} from "react";
import { useNavigate } from "react-router-dom";
import { CategoryWrapper } from "./style";
import { SearchBar } from "antd-mobile";
import { LeftOutline } from "antd-mobile-icons";
import TopBar from "../../components/topbar";
import TabBar from "../../components/tabbar";
import { getCategory } from "../../api/product";
function Category() {
  const navigate = useNavigate();
  const [shoptitle, setshoptitle] = useState([]);
  const [shoplist, setshoplist] = useState([]);
  const [active, setactive] = useState(0);
  const back: any = useCallback(() => {
    startTransition(() => {
      navigate(-1);
    });
  }, []);
  const titleclick: any = useCallback(() => {
    startTransition(() => {
      navigate("/search/category");
    });
  }, []);
  const ctegoryvalue = async () => {
    const { data } = await getCategory();
    const ctegorytitle: any = [];
    const ctegorylist: any = [];
    data.forEach((item: any) => {
      ctegorytitle.push(item.categoryName);
      ctegorylist.push(item.secondLevelCategoryVOS);
    });
    setshoptitle(ctegorytitle);
    setshoplist(ctegorylist);
  };
  const categoryclick: any = (key: number) => {
    setactive(key);
  };
  const gosearch: any = (key: any) => {
    startTransition(() => {
      navigate(`/search/${key}`);
    });
  };
  useEffect(() => {
    ctegoryvalue();
  }, []);
  const rendercategory = () => {
    const list: any = shoplist[active];

    if (list && list.length) {
      // console.log(list);
      return list.map((item: any) => (
        <div key={item.categoryId} className="category-item">
          <p className="category-title">{item.categoryName}</p>
          <div className="category-shop">
            {item.thirdLevelCategoryVOS.map((value: any) => (
              <div
                onClick={() => {
                  gosearch(value.categoryId);
                }}
                className="shop"
                key={value.categoryId}
              >
                <img src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" />
                <p>{value.categoryName}</p>
              </div>
            ))}
          </div>
        </div>
      ));
    }
  };
  return (
    <CategoryWrapper>
      <TopBar
        left={<LeftOutline />}
        title={<SearchBar />}
        titleclick={titleclick}
        back={back}
      />
      <TabBar />
      <div className="category">
        <div className="sidebar">
          {shoptitle.map((item: any, key: any) => (
            <div
              onClick={() => {
                categoryclick(key);
              }}
              className={
                key === active ? "sidebar-item active" : "sidebar-item"
              }
              key={key}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="category-info">
          {rendercategory()}
          <div className="placeholder"></div>
        </div>
      </div>
    </CategoryWrapper>
  );
}

export default memo(Category);
