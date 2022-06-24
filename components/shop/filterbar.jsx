import React from 'react';
import { Menu, Slider } from "antd";
const { SubMenu, ItemGroup } = Menu;
import { useEffect,useState } from 'react';
import { DollarOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { globaluse } from "../../context/global";
import { setsearchtext,setsearchmode } from "../../context/store/reduxglobal";
const Filterbar = () => {


const [price, setPrice] = useState([0, 1000]);

const dispatch = useDispatch();
const [ok, setOk] = useState(false);


const {ProductsByPrice} = globaluse();


// handle price slider change values

const handleSlider = (value) => {
   
    dispatch(setsearchtext(''));
dispatch(setsearchmode(true));
    setPrice(value);
    console.log('price --💬💬', price);
    // global filter price function
    ProductsByPrice(price);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };



    return (
        <div>
        <div>

{/* ---proce filter-- */}


<Menu defaultOpenKeys={["1", "2"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="1000"
                />
              </div>
            </SubMenu>
          </Menu>









        </div>



        </div>
    );
}

export default Filterbar;
