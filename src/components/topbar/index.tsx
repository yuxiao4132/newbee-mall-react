import React, { memo } from "react";
import { TopBarWrapper } from "./style";
function TobBar(props: any) {
  return (
    <TopBarWrapper>
      <div onClick={props.back} className="icon">
        {props.left}
      </div>
      <div onClick={props.titleclick} className="title">
        {props.title}
      </div>
      <div className="icon">{props.right}</div>
    </TopBarWrapper>
  );
}

export default memo(TobBar);
