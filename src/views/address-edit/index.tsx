import React, {
  memo,
  useCallback,
  startTransition,
  useEffect,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Switch, Cascader, Toast, Dialog } from "antd-mobile";
import { LeftOutline, MoreOutline } from "antd-mobile-icons";
import { AdressEditWrapper } from "./style";
import TopBar from "../../components/topbar";
import {
  getAddressDetail,
  editAddress,
  addAddress,
  deleteAddress,
} from "../../api/address";
import { tdist } from "../../common/address";
function AddressEdit() {
  const [visible, setVisible] = useState(true);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [details, setdetails] = useState("");
  const [addressdefault, setaddressdefault] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const back = useCallback(() => {
    startTransition(() => {
      navigate(-1);
    });
  }, []);
  const addressinfo = async () => {
    const addressid = location.pathname.substring(14);
    const { data } = await getAddressDetail(addressid);
    setname(data.userName);
    setphone(data.userPhone);
    setdetails(data.detailAddress);
    setaddressdefault(!!data.defaultFlag);
    if (data.regionName === "") {
      setaddress(`${data.provinceName}/${data.cityName}`);
    } else {
      setaddress(`${data.provinceName}/${data.cityName}/${data.regionName}`);
    }
  };
  useEffect(() => {
    if (location.pathname.substring(14) !== "add") {
      addressinfo();
    }
  }, []);
  const inputchange = (fn: any, value: any) => {
    fn(value);
  };
  const switchchange = useCallback(
    (value: any) => {
      setaddressdefault(value);
    },
    [addressdefault]
  );
  const addressdelete = async () => {
    Dialog.confirm({
      content: "是否删除地址",
      onConfirm: async () => {
        const data: any = await deleteAddress(location.pathname.substring(14));
        if (data.resultCode === 200) {
          Toast.show({
            icon: "success",
            content: "删除成功",
          });
          navigate(-1);
        }
      },
    });
  };
  const btnsave = async () => {
    const addressinfo: any = address.split("/");
    const params: any = {
      userName: name,
      userPhone: phone,
      provinceName: addressinfo[0],
      cityName: addressinfo[1],
      regionName: addressinfo[2] || "",
      detailAddress: details,
      defaultFlag: addressdefault ? 1 : 0,
    };
    params["addressId"] = location.pathname.substring(14);
    const data: any =
      location.pathname.substring(14) !== "add"
        ? await editAddress(params)
        : await addAddress(params);
    if (data.resultCode === 200) {
      Toast.show({
        icon: "success",
        content: "保存成功",
      });
      navigate(-1);
    }
  };
  const province: any = tdist.getLev1();
  province.forEach((p: any) => {
    p.children = tdist.getLev2(p.value);
    p.children.forEach((t: any) => {
      t.children = tdist.getLev3(t.value);
    });
  });

  const renderCascader = async () => {
    const value: any = await Cascader.prompt({
      options: province,
      placeholder: "请选择",
    });
    const provinceName = value[0] ? tdist[value[0]][0] : "";
    const cityName = value[1] ? tdist[value[1]][0] : "";
    const regionName = value[2] ? tdist[value[2]][0] : "";
    if (regionName === "") {
      setaddress(`${provinceName}/${cityName}`);
    } else {
      setaddress(`${provinceName}/${cityName}/${regionName}`);
    }
  };
  const renderaddress = () => {
    if (location.pathname.substring(14) !== "add") {
      return (
        <div className="address-info">
          <div className="user-info">
            <div className="user-item">
              <p>姓名</p>
              <Input
                value={name}
                onChange={(value) => {
                  inputchange(setname, value);
                }}
              />
            </div>
            <div className="user-item">
              <p>电话</p>
              <Input
                value={phone}
                onChange={(value) => {
                  inputchange(setphone, value);
                }}
              />
            </div>
            <div className="user-item">
              <p>地区</p>
              <Input onClick={renderCascader} value={address} />
            </div>
            <div className="user-item">
              <p>详情地址</p>
              <Input
                value={details}
                onChange={(value) => {
                  inputchange(setdetails, value);
                }}
              />
            </div>
            <div className="user-item switch">
              <p>设为默认收获地址</p>
              <Switch onChange={switchchange} checked={addressdefault} />
            </div>
          </div>
          <div className="btn">
            <button onClick={btnsave} className="save">
              保存
            </button>
            <button onClick={addressdelete} className="delete">
              删除
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="address-info">
          <div className="user-info">
            <div className="user-item">
              <p>姓名</p>
              <Input
                placeholder="收货人姓名"
                value={name}
                onChange={(value) => {
                  inputchange(setname, value);
                }}
              />
            </div>
            <div className="user-item">
              <p>电话</p>
              <Input
                placeholder="收货人手机号"
                value={phone}
                onChange={(value) => {
                  inputchange(setphone, value);
                }}
              />
            </div>
            <div className="user-item">
              <p>地区</p>
              <Input
                placeholder="选择省/市/区"
                onClick={renderCascader}
                value={address}
              />
            </div>
            <div className="user-item">
              <p>详细地址</p>
              <Input
                placeholder="街道门牌、楼层房间号等信息"
                value={details}
                onChange={(value) => {
                  inputchange(setdetails, value);
                }}
              />
            </div>
            <div className="user-item switch">
              <p>设为默认收获地址</p>
              <Switch onChange={switchchange} checked={addressdefault} />
            </div>
          </div>
          <div className="btn">
            <button onClick={btnsave} className="save">
              保存
            </button>
          </div>
        </div>
      );
    }
  };
  return (
    <AdressEditWrapper>
      <TopBar
        left={<LeftOutline />}
        title={
          location.pathname.substring(14) !== "add" ? "编辑地址" : "新增地址"
        }
        right={<MoreOutline />}
        back={back}
      />
      {renderaddress()}
    </AdressEditWrapper>
  );
}

export default memo(AddressEdit);
