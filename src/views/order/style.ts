import styled from "styled-components";
export const OrderWrapper = styled.div`
  .placeholder {
    height: 40px;
  }
  .content {
    position: absolute;
    top: 40px;
    bottom: 0;
    /* height: 964px;
    top: 40px;
    bottom: 0px;
    left: 15px;
    right: 15px; */
    /* position: absolute;
    top: 100px;
    bottom: 0px;
    left: 0;
    right: 0; */
    /* height: 100vh; */
  }
  .none {
    display: flex;
    justify-content: center;
    color: #999;
    font-size: 18px;
    margin-top: 30px;
  }
  .tab {
    margin-top: 46px;
    .shoplist {
      .shop-item {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        .ordertime {
          font-size: 13px;
          display: flex;
          justify-content: space-between;
          padding: 0 15px;
          .createTime {
            margin-left: 8px;
          }
        }
      }
      .shop-order {
        display: flex;
        margin-top: 10px;
        .shop-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 10px;
          .info-v1 {
            font-size: 14px;
            .express {
              color: #646566;
            }
          }
          .info-v2 {
            display: flex;
            justify-content: space-between;
            .count {
              font-size: 14px;
              color: #969799;
            }
            .price {
              font-size: 18px;
            }
          }
        }
      }
      .shop-order img {
        width: 90px;
        height: 90px;
      }
    }
  }
`;
