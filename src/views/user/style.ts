import styled from "styled-components";
export const UserWrapper = styled.div`
  .userinfo {
    width: 100%;
    height: 120px;
    padding: 0 10px;
    margin-top: 56px;
    .user {
      width: 100%;
      border-radius: 10px;
      height: 100%;
      background: linear-gradient(90deg, #1baeae, #51c7c7);
      box-shadow: 0 0.05333rem 0.13333rem #269090;
      display: flex;
      align-items: center;
      .avatar {
        margin-left: 20px;
      }
      .avatar img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .info {
        color: #fff;
        font-size: 15px;
        margin-left: 15px;
        .margin {
          margin: 5px 0;
        }
      }
    }
  }
  .list {
    margin-top: 30px;
  }
`;
