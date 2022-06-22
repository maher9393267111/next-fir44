import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { globaluse } from "../context/global";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";


const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let { userinfo ,logout} = globaluse()

  let router= useRouter();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logouthandle = () => {
 logout();
  };

  return (
<div>

<div>
<Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link href="/"><a>Home</a></Link>
      </Item>

        {!userinfo.name && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link href="/auth/register"><a>Register</a></Link>
        </Item>
      )}  

      {!userinfo.name && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link href="/auth/login"><a>Login</a></Link>
        </Item>
      )} 

       {userinfo.name && (
        <SubMenu
          icon={<SettingOutlined />}
          title={userinfo.name }
          className="float-right"
        >
          {userinfo && userinfo.role === "user" && (
            <Item>
              <Link href="/user/history"><a>user Dashboard</a></Link>
            </Item>
          )}
 
          {userinfo.name && userinfo.role === "admin" && (
            <Item>
              <Link href="/admin/dashboard"><a>Admin Dashboard</a></Link>
            </Item>
          )}







          <Item icon={<LogoutOutlined />} onClick={logouthandle}>
            Logout
          </Item>
        </SubMenu>
      )}    
    </Menu>
</div>



</div>


  );
};

export default Header;