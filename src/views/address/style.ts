import styled from "styled-components";
export const AddressWrapper = styled.div`
  .addresslist {
    margin-top: 50px;
    .address-item {
      height: 75px;
      display: flex;
      justify-content: space-between;
      padding: 0 30px;
      align-items: center;
      border-bottom: 1px solid #cecece;
      .info {
        flex: 1;
        height: 100%;
        .userinfo {
          margin: 10px 0;
          .name,
          .phone {
            font-size: 17px;
          }
          .phone {
            margin: 0 8px;
          }
          .default {
            font-size: 12px;
            background-color: red;
            color: #fff;
            padding: 3px 4px;
            border-radius: 50%;
          }
        }
        .addressinfo {
          color: #323233;
          font-size: 15px;
        }
        .addressinfo > span {
          margin-right: 5px;
        }
      }
      .icon {
        font-size: 24px;
      }
    }
  }
  .addadress {
    height: 55px;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #f5f5f5;
    padding: 0 30px;
    display: flex;
    align-items: center;
    .btn {
      height: 45px;
      width: 100%;
      border-top: 1px solid #1baeae;
      border-bottom: 1px solid #1baeae;
      background: #1baeae;
      border-radius: 30px;
      color: #fff;
      font-size: 16px;
    }
  }
`;
