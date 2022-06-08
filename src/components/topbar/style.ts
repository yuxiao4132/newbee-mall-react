import styled from "styled-components";
export const TopBarWrapper = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  background-color: #fff;
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #f5f5f5;
  .title {
    font-size: 16px;
    margin: 0 auto;
  }
  .icon {
    font-size: 18px;
  }
`;
