import React from "react";
import AdminLayout from "../../components/admin/adminLayout";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Form, Input } from "antd";
import { globaluse } from "../../context/global";
import {createSub, updateSubCategory,deleteSubCategory } from "../../functions/category";

import { Select } from "antd";
const { Option } = Select;
const Sub = () => {
  const { categories } = useSelector((state) => state.global);

  const [isupdate, setIsupdate] = useState(false);
  const [catid, setCatid] = useState("");
  const [catName, setCatName] = useState("");
  const [subcatid, setSubcatid] = useState("");

  const { refreshcategory,setRefreshcategory } = globaluse();
  const { subCategoies} = useSelector((state) => state.global);

  const handleChange = (value) => {
   // console.log("value--->", value);

    setCatid(value);

    categories.map((category) => {
      if (category.id === value) {
        setCatName(category.name);
      }
    });

   // console.log(`catname 🕊️🕊️ ${value} ------- ${catName}`);

    // setCatid(value);
  };
  const onFinishFailed = (errorInfo) => {
   /// console.log("Failed:", errorInfo);
  };

  const Createorupdate = async (values) => {
  //  console.log("values--->>>", values);
    const subdata = { name: values.sub, categoryid: catid,categoryname:catName };

   // console.log("data--->>> 🔥🔥🔥🔥", subdata);
    if (!isupdate) {
        createSub(subdata);
        setRefreshcategory(!refreshcategory);
    }
    else if (isupdate) {

        console.log("subcatid--->>> 🔥🔥 <<<<<<<", subcatid);

        
        updateSubCategory(subcatid, subdata);
     
        setRefreshcategory(!refreshcategory);
    }
  };

  return (
    <div>
      <AdminLayout>
        <div>
          <h1 className=" text-2xl font-semibold ">
            sub-category  { subCategoies?.length}
          </h1>

<div> <h1>{isupdate ? 'Update sub' : 'Create sub'}</h1></div>

<div>{subcatid}</div>


          <div className=" sm:w-[300px]  lg:w-[450px]">
            <Form
              onFinish={Createorupdate}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="SubCategory Name " name="sub">
                <Input placeholder="Category name" />
              </Form.Item>

              <>
                <div className=" flex  gap-4">
                  <p className="mt-2">Category : </p>
                  <Select
                    defaultValue={'select som category'}
                    style={{
                      width: 220,
                      marginBottom: "17px",
                    }}
                    onChange={handleChange}
                  >
                    {categories.map((category) => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}

                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </div>
              </>

              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Create
                </Button>
              </Form.Item>
            </Form>
          </div>

        <>
        <div className="mt-12 ml-4 mb-12 pb-12">
          <div className=" ">
            {subCategoies?.map((sub, index) => {
              return (
                <div
                  key={index}
                  className=" my-2 font-bold  text-xl text-[#096dd9] "
                >
                  <div className=" w-[144px] flex gap-2">
                    <p
                      onClick={() => {
                        setSubcatid(sub?.id);
                        console.log("sub--->>>sasas", subcatid);
                        setIsupdate(true);
                      }}
                      className=" w-[85px]"
                    >
                      {sub?.name}
                    </p>
                    <p
                      onClick={() => {
                        deleteSubCategory(sub?.id);
                   
                        setRefreshcategory(!refreshcategory);
                      }}
                      className=" ml-[13px] mt-[7px]"
                    >
                      <img
                        className=" w-4 h-4 rounded-full"
                        src="https://cdn1.iconfinder.com/data/icons/smallicons-controls/32/614397-x-256.png"
                        alt=""
                      />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        
        </>


        </div>
      </AdminLayout>
    </div>
  );
};

export default Sub;
