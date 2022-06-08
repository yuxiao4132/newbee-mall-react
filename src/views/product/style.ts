import styled from "styled-components";
export const ProductWrapper = styled.div`
  width: 100%;
  height: 100vh;
  .shopinfo {
    margin-top: 46px;
    display: flex;
    padding: 0 10px;
    flex-direction: column;
    .name {
      font-size: 18px;
    }
    .express {
      color: #999;
      margin: 5px 0;
      font-size: 15px;
    }
    .price {
      color: #f63515;
      font-size: 22px;
    }
  }
  .border-right {
    border-right: 1px solid #999;
  }
  .configure {
    height: 30px;
    display: flex;
    margin: 15px 0;
    .configure-item {
      font-size: 16px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .introduce img {
    width: 100%;
  }
  .placeholder {
    height: 72px;
  }
  .tabbar {
    height: 52px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    padding: 0 10px;
    .tabbar-icon {
      position: relative;
      color: #646566;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .badge {
        width: 15px;
        height: 15px;
        background-color: #ff411c;
        position: absolute;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        line-height: 15px;
        right: 5px;
        top: 0;
      }
      .icon {
        font-size: 20px;
      }
      .name {
        font-size: 16px;
      }
    }
    .margin {
      margin: 0 15px 0 20px;
    }
    .purchase {
      flex: 1;
      display: flex;
      align-items: center;
      .button {
        color: #fff;
        font-size: 15px;
        height: 40px;
        flex: 1;
      }
      .left {
        border-radius: 20px 0 0 20px;
        background: linear-gradient(90deg, #6bd8d8, #1baeae);
      }
      .right {
        border-radius: 0 20px 20px 0;
        background: linear-gradient(90deg, #0dc3c3, #098888);
      }
    }
  }
`;
