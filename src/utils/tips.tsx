import { Toast } from "antd-mobile";
import { ExclamationOutline } from "antd-mobile-icons";
function Show() {
  Toast.show({
    content: "登录失败,请重新登录！",
    icon: <ExclamationOutline />,
  });
}
export default Show;
