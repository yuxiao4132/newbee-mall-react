import React, { memo, useEffect, useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { HomeWrapper } from "./style";
import { SearchBar, Swiper } from "antd-mobile";
import { UnorderedListOutline, UserOutline } from "antd-mobile-icons";
import TabBar from "../../components/tabbar";
import { getHome } from "../../api/home";
import { renderimg } from "../../utils/filter-img";
import { categoryList } from "../../common/home";
function Home() {
  const navigate = useNavigate();
  const [carousels, setcarousels] = useState([]);
  const [hotgoodses, sethotgoodses] = useState([]);
  const [newgoodses, setnewgoodses] = useState([]);
  const [recommendgoodses, setrecommendgoodses] = useState([]);
  const gethomedata = async () => {
    const { data }: any = await getHome();
    setcarousels(data.carousels);
    sethotgoodses(data.hotGoodses);
    setnewgoodses(data.newGoodses);
    setrecommendgoodses(data.recommendGoodses);
  };
  useEffect(() => {
    gethomedata();
  }, []);
  const btnclick = (key: number) => {
    startTransition(() => {
      navigate(`/product/${key}`);
    });
  };
  const gosearch = () => {
    startTransition(() => {
      navigate(`/search/home`);
    });
  };
  const gocategory = () => {
    startTransition(() => {
      navigate(`/category`);
    });
  };
  const gouser = () => {
    startTransition(() => {
      navigate(`/user`);
    });
  };
  return (
    <HomeWrapper>
      <div className="navigation">
        <div className="outline" onClick={gocategory}>
          <UnorderedListOutline color="#fff" />
        </div>
        <div onClick={gosearch}>
          <SearchBar
            placeholder="请输入内容"
            style={{
              "--border-radius": "100px",
              "--background": "rgba(255, 255, 255, 0.7)",
              "--height": "32px",
              "--padding-left": "12px",
            }}
          />
        </div>
        <div className="outline2" onClick={gouser}>
          <UserOutline color="#fff" />
        </div>
      </div>
      <div className="swiper">
        <Swiper autoplay loop>
          {carousels.map((item: any, index) => (
            <Swiper.Item key={index} className="swiper-item">
              <img src={item.carouselUrl} />
            </Swiper.Item>
          ))}
        </Swiper>
      </div>
      <div className="category">
        {categoryList.map((item: any) => (
          <div className="category-item" key={item.categoryId}>
            <img src={item.imgUrl} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="shop">
        <div className="title">新品上线</div>
        <div className="shoplist">
          {newgoodses.map((item: any) => (
            <div
              onClick={() => {
                btnclick(item.goodsId);
              }}
              className="shop-item"
              key={item.goodsId}
            >
              <img src={renderimg(item.goodsCoverImg)} />
              <p className="shop-name">{item.goodsName}</p>
              <p className="price">￥{item.sellingPrice}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="shop">
        <div className="title">热门商品</div>
        <div className="shoplist">
          {hotgoodses.map((item: any) => (
            <div
              onClick={() => {
                btnclick(item.goodsId);
              }}
              className="shop-item"
              key={item.goodsId}
            >
              <img src={renderimg(item.goodsCoverImg)} />
              <p className="shop-name">{item.goodsName}</p>
              <p className="price">￥{item.sellingPrice}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="shop">
        <div className="title">最新推荐</div>
        <div className="shoplist">
          {recommendgoodses.map((item: any) => (
            <div
              onClick={() => {
                btnclick(item.goodsId);
              }}
              className="shop-item"
              key={item.goodsId}
            >
              <img src={renderimg(item.goodsCoverImg)} />
              <p className="shop-name">{item.goodsName}</p>
              <p className="price">￥{item.sellingPrice}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="placeholder"></div>
      <TabBar />
    </HomeWrapper>
  );
}

export default memo(Home);
