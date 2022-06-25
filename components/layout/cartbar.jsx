import React from 'react';

import { Button, Drawer } from "antd";
import { useState, useEffect } from "react";
import { globaluse } from "../../context/global"
import {useDispatch,useSelector} from 'react-redux'
import { setVisible } from '../../context/store/reduxglobal';


const Cartbar = () => {

const {visible} = useSelector((state) => state.global);
const dispatch = useDispatch();

const onClose = () => {

dispatch(setVisible(false));

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


sidebar

        </Drawer>

            
        </div>
    );
}

export default Cartbar;
