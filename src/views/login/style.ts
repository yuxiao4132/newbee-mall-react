import styled from "styled-components";
export const LoginWrapper = styled.div`
  /* background-color: pink; */
  width: 100%;
  height: 100vh;
  .navigation {
    color: #252525;
    height: 46px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    .outline {
      font-size: 20px;
    }
    .login {
      font-size: 15px;
    }
  }
  .img {
    display: flex;
    justify-content: center;
    margin-top: 80px;
    margin-bottom: 20px;
  }
  .img img {
    width: 130px;
    height: 130px;
  }
  .from {
    padding: 0 20px;
    .adm-list-body {
      border-top: none;
    }
    .adm-list-item-content {
      align-items: center;
    }
    .register {
      height: 70px;
      padding: 0 15px;
      line-height: 70px;
      color: #12345678;
      font-size: 15px;
    }
    .getlogin {
      height: 70px;
      padding: 0 15px;
      line-height: 70px;
      color: #1989fa;
      font-size: 15px;
    }
    .verification {
      display: flex;
      .adm-input {
        width: 100px;
      }
    }
  }
  .button {
    display: flex;
    justify-content: center;
  }
  .button button {
    height: 45px;
    width: 320px;
    background: rgb(27, 174, 174);
    border-color: rgb(27, 174, 174);
  }
`;
