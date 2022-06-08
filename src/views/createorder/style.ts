import styled from "styled-components";
export const CreateOrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 46px;
  .address {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    height: 100px;
    border-bottom: 1px solid #f5f5f5;
    .info {
      font-size: 16px;
      height: 100%;
    }
    .info p {
      margin-top: 18px;
    }
    .icon {
      font-size: 20px;
    }
  }
  .shop-item {
    width: 100%;
    height: 130px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    .shop-info {
      margin-left: 20px;
      .title {
        font-size: 14px;
        .count {
          margin-left: 10px;
        }
      }
      .price {
        color: red;
        font-size: 20px;
        margin-top: 10px;
      }
    }
  }
  .shoplist {
    margin-bottom: 130px;
  }
  .shop-item img {
    width: 105px;
    height: 105px;
  }
  .tabbar {
    position: fixed;
    bottom: 0;
    height: 105px;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #f5f5f5;
    padding: 0 20px;
    .price {
      margin-top: 15px;
      font-size: 17px;
      display: flex;
      justify-content: space-between;
      .settlement {
        color: red;
      }
    }

    .btn {
      color: #fff;
      font-size: 18px;
      width: 100%;
      height: 45px;
      background: rgb(27, 174, 174);
      border-color: rgb(27, 174, 174);
      margin-top: 15px;
    }
  }
`;
