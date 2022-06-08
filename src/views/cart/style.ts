import styled from "styled-components";
export const CartWrapper = styled.div`
  .shopping {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 250px;
    .title {
      font-size: 18px;
      margin: 20px 0;
    }
    .btn {
      width: 195px;
      height: 45px;
      color: rgb(255, 255, 255);
      background: rgb(27, 174, 174);
      border-color: rgb(27, 174, 174);
      border-radius: 30px;
      font-size: 16px;
    }
  }
  .shopping img {
    width: 180px;
    height: 150px;
  }
  .shoplist {
    padding: 0 15px;
    margin-top: 46px;
    .shop-item {
      display: flex;
      align-items: center;
      .shop-info {
        flex: 1;
        font-size: 14px;
        margin-left: 15px;
        .count {
          margin-left: 10px;
        }
        .price {
          margin-top: 15px;
          color: red;
          font-size: 18px;
          display: flex;
          justify-content: space-between;
          .operation {
            .color {
              color: #999;
            }
            .btn {
              text-align: center;
              line-height: 30px;
              width: 30px;
              height: 30px;
              font-size: 16px;
              background-color: #f2f3f5;
            }
            .margin {
              margin: 0 5px;
            }
          }
        }
      }
    }
    .shop-item img {
      margin-left: 10px;
      width: 105px;
      height: 105px;
    }
  }
  .settlement {
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 50px;
    background-color: #fff;
    justify-content: space-around;
    padding: 0 10px;
    font-size: 18px;
    display: flex;
    align-items: center;
    .name {
      margin-left: 10px;
    }
    .price {
      color: red;
      font-size: 20px;
    }
    .settotal button {
      width: 115px;
      height: 40px;
      background: #1baeae;
      border-radius: 20px;
      color: #fff;
      font-size: 18px;
    }
  }
`;
