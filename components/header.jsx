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
import { setsearchtext,setsearchmode,setVisible  } from "../context/store/reduxglobal";

import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { query, orderBy, collection, doc,getDoc } from "firebase/firestore";
import {db} from '../firebase';



const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let { userinfo ,logout, SearchbyText} = globaluse()
  const {searchtext} = useSelector((state) => state.global);

  let router= useRouter();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logouthandle = () => {
 logout();
  };


  const openModal = () => {


    dispatch(setVisible(true));
  }




const hendleSearch = (e) => {

dispatch(setsearchtext(e.target.value));
dispatch(setsearchmode(true));
  SearchbyText(searchtext);
  router.push("/shop");


}



const [userdata] = useDocumentData(doc(db, "Users", `${userinfo?.email}`));




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

<div className=" flex gap-2">
<div className="relative">
    <input
    onChange={hendleSearch}
    
    type="text" id="floating_filled" clasName="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label  htmlFor="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Search Bar</label>
</div>



<div className=" relative">
  <div>
  <Link href="/cartpage"><a>
    
 
    <img
    onClick={openModal}
    className=" w-12 h1-12 cursor-pointer rounded-full" src="https://cdn4.iconfinder.com/data/icons/e-commerce-and-online-shopping-flat/512/sale_shop_buy_bag_purchase_shopping-256.png" alt="" />
   </a></Link>
  </div>

{/* ----products number */}

<div className=" ">
  <span className="  top-[-2px] right-[-18px] bg-blue-400  rounded-full text-center w-8 h-8 absolute"><p className=" -mt-[5px]">{userdata?.cart?.length}</p></span>
</div>



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