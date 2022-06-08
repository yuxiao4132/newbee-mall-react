import styled from "styled-components";
export const CategoryWrapper = styled.div`
  .category {
    margin-top: 46px;
    height: calc(100vh - 46px);
    position: relative;
    display: flex;
    overflow: auto;
    .sidebar {
      height: 100%;
      width: 28%;
      background-color: #f5f5f5;
      .sidebar-item {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
      }
      .active {
        background-color: #fff;
        color: #1baeae;
      }
    }
    .category-info {
      height: 100%;
      flex: 1;
      overflow: auto;
      .placeholder {
        height: 60px;
      }
      .category-item {
        margin-left: 10px;
        margin-top: 30px;
        .category-title {
          font-size: 18px;
        }
        .category-shop {
          font-size: 17px;
          display: flex;
          flex-wrap: wrap;
          .shop {
            font-size: 16px;
            margin-top: 30px;
            width: 90px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .shop img {
            width: 30px;
            height: 30px;
          }
          .shop p {
            margin-top: 15px;
          }
        }
      }
    }
  }
`;
