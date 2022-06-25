import React from 'react';

import { Button, Drawer } from "antd";
import { useState, useEffect } from "react";
import { globaluse } from "../../context/global"
import { cartuse } from "../../context/cartContext"
import {useDispatch,useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import { setUserInfo, setVisible } from '../../context/store/reduxglobal';


const Cartbar = () => {

const {visible} = useSelector((state) => state.global);
const {cartdata } = cartuse();

const [current, setCurrent] = useState({cart:[],total : 0});


const dispatch = useDispatch();

const onClose = () => {

dispatch(setVisible(false));

}


useEffect(() => {

let obj = {}


cartdata().then((data) => {


console.log("cartdata🛍️🛍️🛍️", data);


obj.cart = data.cart;
obj.total = data.total;

toast.success(`objdata--> ${obj.total}` )

setCurrent(obj);


})





}, [visible]);


const handle = () => {
    setCurrent("about");


}




    return (
        <div>


<Drawer
        width={520}
        style={{ transition: " all2.5s  ease-in-out" }}
        className="  transition-all   duration-500"
        title="Cart Bar"
        placement="right"
        onClose={onClose}
        visible={visible}
      >


<div
onClick={handle}
>
    clicked  {current.total}
</div>


sidebar is:

        </Drawer>

            
        </div>
    );
}

export default Cartbar;
