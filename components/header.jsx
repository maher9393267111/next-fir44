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
import { setsearchtext } from "../context/store/reduxglobal";



const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let { userinfo ,logout, SearchbyText} = globaluse()

  let router= useRouter();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logouthandle = () => {
 logout();
  };



const hendleSearch = (e) => {

dispatch(setsearchtext(e.target.value));
  SearchbyText(e.target.value);
  router.push("/shop");


}



  return (
<div>

<div>
<Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">


{/* ---flex--- */}

<div className="   pt-4  w-full flex justify-between   mx-6">



<div className="pt-[8px] flex sm:-ml-6 lg:gap-8">

      <Item  className=" pb-[10px]" key="home" icon={<AppstoreOutlined />}>
        <Link href="/"><a>Home</a></Link>
      </Item>

      <Item  className=" pb-[10px]" key="home" icon={<AppstoreOutlined />}>
        <Link href="/shop"><a>Shop</a></Link>
      </Item>


</div>


<div className=" left flex gap-6">


{/* -----searrch bar----- */}

<div>
<div class="relative">
    <input
    onChange={hendleSearch}
    
    type="text" id="floating_filled" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="Search Bar" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Search Bar</label>
</div>
</div>



<div className=" pt-[8px]">
        {!userinfo?.name && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link href="/auth/register"><a>Register</a></Link>
        </Item>
      )}  

      {!userinfo?.name && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link href="/auth/login"><a>Login</a></Link>
        </Item>
      )} 

       {userinfo?.name && (
        <SubMenu
          icon={<SettingOutlined />}
          title={userinfo?.name }
          className="float-right"
        >
          {userinfo && userinfo.role === "user" && (
            <Item>
              <Link href="/user/history"><a>user Dashboard</a></Link>
            </Item>
          )}
 
          {userinfo?.name && userinfo?.role === "admin" && (
            <Item>
              <Link href="/admin/dashboard"><a>Admin Dashboard</a></Link>
            </Item>
          )}







          <Item icon={<LogoutOutlined />} onClick={logouthandle}>
            Logout
          </Item>
        </SubMenu>
      )}  


</div>
{/* ///------- */}



      </div>
      </div>
    </Menu>
</div>



</div>


  );
};

export default Header;