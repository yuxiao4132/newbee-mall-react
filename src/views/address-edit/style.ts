import styled from "styled-components";
export const AdressEditWrapper = styled.div`
  .address-info {
    margin-top: 50px;
    .user-item {
      display: flex;
      align-items: center;
      height: 50px;
      border-bottom: 1px solid #f5f5f5;
      white-space: nowrap;
      font-size: 16px;
      color: #323233;
      padding: 0 20px;
      .adm-input-element {
        margin-top: 4px;
      }
    }
    .switch {
      display: flex;
      height: 80px;
      justify-content: space-between;
      .switch {
        margin-top: 6px;
      }
    }
    .user-item p {
      width: 110px;
    }
    .btn {
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      .save {
        background: #1baeae;
        border-color: #1baeae;
        color: #fff;
        font-size: 18px;
      }
      .delete {
        font-size: 18px;
        border: 1px solid #ccc;
      }
    }
    .btn > button {
      border-radius: 30px;
      height: 45px;
      margin-top: 20px;
    }
  }
`;
