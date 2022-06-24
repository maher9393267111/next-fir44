import React from "react";
import { Menu, Slider, Checkbox, Rate } from "antd";
const { SubMenu, ItemGroup } = Menu;
import { useEffect, useState } from "react";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { globaluse } from "../../context/global";
import { toast } from "react-toastify";
import { setsearchtext, setsearchmode } from "../../context/store/reduxglobal";
const Filterbar = () => {
    const [price, setPrice] = useState([0, 1000]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [subIds, setsubIds] = useState([]);
    const dispatch = useDispatch();
    const [ok, setOk] = useState(false);

    const { ProductsByPrice, ProductsBySelectedCategories, ProductsBySelectedSubs } = globaluse();

    const { categories, subCategoies } = useSelector((state) => state.global);
    // handle price slider change values

    const handleSlider = (value) => {
        //setCategoryIds([]);
        dispatch(setsearchtext(""));
        dispatch(setsearchmode(true));
        setPrice(value);
        console.log("price --💬💬", price);
        // global filter price function
        ProductsByPrice(price);
        setTimeout(() => {
            setOk(!ok);
        }, 300);
    };

    // categories

    // handle check for categories
    const handleCheck = (e) => {


        dispatch(setsearchtext(""));

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

        if (inTheState.length !== 0) {
            //dispatch(setsearchtext(""));
            dispatch(setsearchmode(true));
            ProductsBySelectedCategories(inTheState);
        }

        else {

            dispatch(setsearchmode(false));

        }



    };

    const showCategories = () =>
        categories.map((c) => (
            <div key={c.id}>
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


    //show sub categories

    const showSubs = () =>
        subCategoies.map((c) => (
            <div key={c.id}>
                <Checkbox
                    onChange={handlSubsCheck}
                    className="pb-2 pl-4 pr-4"
                    value={c.id}
                    name="Subs"
                    checked={subIds.includes(c.id)}
                >
                    {c.name}
                </Checkbox>
                <br />
            </div>
        ));


    // show stars

    const handlerating = (value) => {

console.log("rating -✅✅✅", value);




    }
  




    const handlSubsCheck = (e) => {


        dispatch(setsearchtext(""));

        setPrice([0, 0]);
        // console.log(e.target.value);
        let inTheState = [...subIds];
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

        setsubIds(inTheState);

        if (inTheState.length !== 0 || inTheState.length > 0) {
            //dispatch(setsearchtext(""));
            dispatch(setsearchmode(true));
            ProductsBySelectedSubs(inTheState);
        }

        else {

            dispatch(setsearchmode(false));

        }



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

                    <SubMenu
                        key="4"
                        title={
                            <span className="h5">
                                <DownSquareOutlined /> SubCategories {subIds.length}
                            </span>
                        }
                    >
                        <div style={{ maringTop: "-10px" }}>{showSubs()}</div>
                    </SubMenu>



{/* // stars show--- */}

<SubMenu
                        key="5"
                        title={
                            <span className="h5">
                                <DownSquareOutlined /> Rating  
                            </span>
                        }
                    >
                        <div style={{ maringTop: "-10px" }}>


                        <div className=" flex flex-col gap-2 mt-4 mb-4">

<Rate onChange ={handlerating} allowHalf defaultValue={1} />
<Rate   onChange ={handlerating}  allowHalf defaultValue={2} />
<Rate  onChange ={handlerating} allowHalf defaultValue={3} />
<Rate  onChange ={handlerating} allowHalf defaultValue={4} />
<Rate  onChange ={handlerating} allowHalf defaultValue={5} />



</div>







                        </div>
                    </SubMenu>



                </Menu>


                {/* -----sub categoris- */}




            </div>
        </div>
    );
}

export default Filterbar;