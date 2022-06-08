import styled from "styled-components";
export const SearchtWrapper = styled.div`
  .content {
    position: absolute;
    bottom: 0;
    top: 100px;
  }
  .btn {
    color: #fff;
    background: #1baeae;
    padding: 4px 7px;
    border-radius: 5px;
    font-size: 16px;
  }
  .adm-search-bar {
    width: 250px;
  }
  .shoplist {
    padding: 0 10px;
    margin-top: 55px;
    .shop-title {
      display: flex;
      .bgc {
        color: #fff;
        background-color: rgb(27, 174, 174);
      }
    }
    .shop-title > div {
      color: rgb(27, 174, 174);
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 30px;
      border: 1px solid rgb(27, 174, 174);
    }
    .shop-item {
      display: flex;
      .gosearch {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
      }
      .gosearch img {
        width: 156px;
        height: 156px;
      }
      .gosearch p {
        color: #969799;
        font-size: 16px;
        margin-top: 30px;
      }
      .item {
        display: flex;
        .item-info {
          margin-left: 10px;
          .goodsname {
            font-size: 16px;
          }
          .goodsintro {
            color: #999;
            font-size: 14px;
            margin: 10px 0;
          }
          .price {
            color: #1baeae;
            font-size: 20px;
          }
        }
      }
      .item img {
        width: 145;
        height: 125px;
      }
      .nonemore {
        font-size: 16px;
        color: #969799;
        display: flex;
        margin-top: 20px;
        justify-content: center;
      }
    }
  }
`;
