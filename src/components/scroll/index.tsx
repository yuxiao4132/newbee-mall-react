import React, { memo, useRef, useEffect, useState, createContext } from "react";
import BScroll from "better-scroll";
const scrollinfo: any = {};
const scroll = createContext(scrollinfo);
const ScrollY: any = function (props: any) {
  let [scrollvalue, setscroll] = useState(null);
  const wrapper: any = useRef();
  useEffect(() => {
    const scrolly: any = new BScroll(wrapper.current, {
      probeType: 3,
      click: true,
      pullUpLoad: true,
      pullDownRefresh: true,
    });
    const refresh = () => {
      scrolly.refresh();
    };
    const finishPullUp = () => {
      scrolly.finishPullUp();
    };
    const finishPullDown = () => {
      scrolly.finishPullDown();
    };
    scrolly.on("pullingUp", () => {
      console.log("pullingUp");
      props.finishPullUp();
    });
    scrolly.on("pullingDown", () => {
      console.log(props);
    });
    scrollinfo.refresh = refresh;
    scrollinfo.finishPullUp = finishPullUp;
    scrollinfo.finishPullDown = finishPullDown;
    console.log(scrollinfo);
    setscroll(scrolly);
  }, []);
  return (
    <div className="wrapper" ref={wrapper}>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default memo(ScrollY);
export { scroll };
