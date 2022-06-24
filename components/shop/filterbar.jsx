import React from 'react';
import { Menu, Slider,Checkbox} from "antd";
const { SubMenu, ItemGroup } = Menu;
import { useEffect,useState } from 'react';
import { DollarOutlined,DownSquareOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { globaluse } from "../../context/global";
import { toast } from 'react-toastify';
import { setsearchtext,setsearchmode } from "../../context/store/reduxglobal";
const Filterbar = () => {


const [price, setPrice] = useState([0, 1000]);
const [categoryIds, setCategoryIds] = useState([]);
const dispatch = useDispatch();
const [ok, setOk] = useState(false);


const {ProductsByPrice, CategoryProducts} = globaluse();

const  {categories} = useSelector((state) => state.global);
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



// categories 




  // handle check for categories
  const handleCheck = (e) => {
  dispatch(setsearchtext(''));
    setPrice([0, 0]);
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }
    console.log(inTheState);

    setCategoryIds(inTheState);
    // console.log(inTheState);
  //  fetchProducts({ category: inTheState });
  };









const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c.id}
          name="category"
          checked={categoryIds.includes(c.id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));



    // categories end







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


{/* ------categories- */}

<SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories




                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>
          
        




          </Menu>



          <div>
    {categoryIds.map((item) => (<div>{item}</div>))}
</div>






        </div>



        </div>
    );
}

export default Filterbar;
