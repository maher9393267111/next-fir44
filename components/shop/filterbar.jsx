import React from 'react';
import { Menu, Slider } from "antd";
const { SubMenu, ItemGroup } = Menu;
import { useEffect,useState } from 'react';
import { DollarOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setsearchtext } from "../../context/store/reduxglobal";
const Filterbar = () => {


const [price, setPrice] = useState([0, 1000]);

const dispatch = useDispatch();
const [ok, setOk] = useState(false);

const handleSlider = (value) => {
   
    dispatch(setsearchtext(''));

    setPrice(value);
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
                  max="4999"
                />
              </div>
            </SubMenu>
          </Menu>









        </div>



        </div>
    );
}

export default Filterbar;
