import styled from "styled-components";
export const HomeWrapper = styled.div`
  width: 100%;
  .green {
  }
  .navigation {
    height: 52px;
    background-color: #1baeae;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    .outline {
      font-size: 25px;
    }
    .outline2 {
      font-size: 28px;
    }
    .adm-search-bar {
      width: 250px;
    }
  }
  .swiper-item > img {
    width: 100%;
    height: 180px;
    background-size: cover;
  }
  .category {
    display: flex;
    flex-wrap: wrap;
    .category-item {
      flex: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 15px;
    }
    .category-item p {
      margin-top: 5px;
    }
  }

  .category img {
    width: 40px;
    height: 40px;
  }
  .price {
    color: #1baeae;
  }
  .shop {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    .title {
      width: 100%;
      height: 52px;
      line-height: 52px;
      text-align: center;
      color: #1baeae;
      background: #f9f9f9;
      font-size: 18px;
    }
    .shoplist {
      display: flex;
      flex-wrap: wrap;
      .shop-item {
        font-size: 14px;
        box-sizing: border-box;
        padding: 0 10px;
        border-bottom: 1px solid #e9e9e9;
        border-right: 1px solid #e9e9e9;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        height: 220px;
        text-align: center;
        justify-content: space-around;
      }
      .shop-item img {
        width: 125px;
        height: 125px;
      }
    }
  }
  .placeholder {
    height: 50px;
  }
`;
