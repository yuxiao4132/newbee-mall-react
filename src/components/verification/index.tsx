import React, { useEffect, useRef, memo, createContext } from "react";
import { VerificationWrapper } from "./style";
const state: any = {
  pool: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // 字符串
  width: 120,
  height: 40,
  imgCode: "",
};
let verificationContext: any = createContext(state);
function Verification() {
  const verify: any = useRef();
  useEffect(() => {
    // console.log(verify);
    state.imgCode = draw();
  });
  const handleDraw = () => {
    state.imgCode = draw();
  };
  // 随机数
  const randomNum = (min: any, max: any) => {
    return parseInt(Math.random() * (max - min) + min);
  };
  // 随机颜色
  const randomColor = (min: any, max: any) => {
    const r = randomNum(min, max);
    const g = randomNum(min, max);
    const b = randomNum(min, max);
    return `rgb(${r},${g},${b})`;
  };
  const draw = () => {
    const ctx = verify.current.getContext("2d");
    ctx.fillStyle = randomColor(180, 230);
    ctx.fillRect(0, 0, state.width, state.height);
    let imgCode = "";
    for (let i = 0; i < 4; i++) {
      const text = state.pool[randomNum(0, state.pool.length)];
      imgCode += text;

      const fontSize = randomNum(18, 40);

      const deg = randomNum(-30, 30);

      ctx.font = fontSize + "px Simhei";
      ctx.textBaseline = "top";
      ctx.fillStyle = randomColor(80, 150);

      ctx.save();
      ctx.translate(30 * i + 15, 15);
      ctx.rotate((deg * Math.PI) / 180);

      ctx.fillText(text, -15 + 5, -15);
      ctx.restore();
    }

    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(randomNum(0, state.width), randomNum(0, state.height));
      ctx.lineTo(randomNum(0, state.width), randomNum(0, state.height));
      ctx.strokeStyle = randomColor(180, 230);
      ctx.closePath();
      ctx.stroke();
    }

    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(
        randomNum(0, state.width),
        randomNum(0, state.height),
        1,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.fillStyle = randomColor(150, 200);
      ctx.fill();
    }
    return imgCode;
  };
  state.draw = draw;
  return (
    <VerificationWrapper>
      <canvas
        ref={verify}
        width={state.width}
        height={state.height}
        onClick={handleDraw}
      ></canvas>
    </VerificationWrapper>
  );
}

export default memo(Verification);
export { verificationContext };
