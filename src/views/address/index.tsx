import React, {
  useEffect,
  useState,
  memo,
  startTransition,
  useCallback,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LeftOutline, MoreOutline, EditSOutline } from "antd-mobile-icons";
import { AddressWrapper } from "./style";
import TopBar from "../../components/topbar";
import { getAddressList } from "../../api/address";
function Address() {
  const navigate = useNavigate();
  const location = useLocation();
  const [addressinfo, setaddressinfo] = useState([]);
  const addresslist = async () => {
    const { data } = await getAddressList();

    console.log(data);
    setaddressinfo(data);
  };
  const goeditaddress = (key: number) => {
    startTransition(() => {
      navigate(`/address-edit/${key}`);
    });
  };
  const goaddaddress = () => {
    startTransition(() => {
      navigate(`/address-edit/add`);
    });
  };
  const back = useCallback(() => {
    startTransition(() => {
      navigate(-1);
    });
  }, []);
  const backorder = (key: number) => {
    if (location.pathname === "/address/cart") {
      startTransition(() => {
        navigate(`/createorder/${key}`);
      });
    }
  };
  useEffect(() => {
    addresslist();
  }, []);
  const renderdefault = (flag: number) => {
    if (flag === 1) {
      return <span className="default">默认</span>;
    } else {
      return undefined;
    }
  };
  return (
    <AddressWrapper>
      <TopBar
        left={<LeftOutline />}
        title={"地址管理"}
        right={<MoreOutline />}
        back={back}
      />
      <div className="addresslist">
        {addressinfo.map((item: any) => (
          <div className="address-item" key={item.addressId}>
            <div
              className="info"
              onClick={() => {
                backorder(item.addressId);
              }}
            >
              <div className="userinfo">
                <span className="name">{item.userName}</span>
                <span className="phone">{item.userPhone}</span>
                {renderdefault(item.defaultFlag)}
              </div>
              <div className="addressinfo">
                <span>{item.provinceName}</span>
                <span>{item.cityName}</span>
                <span>{item.regionName}</span>
                <span>{item.detailAddress}</span>
              </div>
            </div>
            <div
              className="icon"
              onClick={() => {
                goeditaddress(item.addressId);
              }}
            >
              <EditSOutline />
            </div>
          </div>
        ))}
      </div>
      <div className="addadress">
        <button className="btn" onClick={goaddaddress}>
          新增地址
        </button>
      </div>
    </AddressWrapper>
  );
}

export default memo(Address);
