import styled from "styled-components";
export const OrderDetailedWrapper = styled.div`
  background: #f7f7f7;
  height: 100vh;
  .shop-state,
  .shop-price {
    display: flex;
    flex-direction: column;
  }
  .shop-state,
  .shop-price {
    background-color: #fff;
    padding: 15px 20px;
    font-size: 16px;
    .shop-item {
      margin: 7px 0;
    }
    .title {
      color: #999;
    }
    .info {
      margin-left: 10px;
    }
  }
  .shop-state {
    margin-top: 50px;
    .btn {
      display: flex;
      flex-direction: column;
      .payment {
        color: rgb(255, 255, 255);
        background: rgb(27, 174, 174);
        border-color: rgb(27, 174, 174);
      }
      .cancel {
        border: 1px solid #ececec;
      }
    }
    .btn button {
      font-size: 16px;
      margin-top: 10px;
      height: 45px;
    }
  }
  .shop-price {
    margin: 20px 0;
  }
  .shop-list {
    background-color: #fff;
    .shop-item {
      font-size: 15px;
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      .item-info {
        display: flex;
        .price {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .parcel-post {
            color: #646566;
          }
          .total {
            font-size: 18px;
          }
        }
      }
      .item-info img {
        width: 90px;
        height: 90px;
        margin-right: 5px;
      }
    }
    .count {
      display: flex;
      align-items: flex-end;
      color: #969799;
      font-size: 15px;
    }
  }
`;
