import React from "react";
import AdminLayout from "../../components/admin/adminLayout";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Form, Input } from "antd";
import { globaluse } from "../../context/global";
import {createSub } from "../../functions/category";

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
    console.log("value--->", value);

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
    console.log("Failed:", errorInfo);
  };

  const Createorupdate = async (values) => {
    console.log("values--->>>", values);
    const subdata = { name: values.sub, categoryid: catid,categoryname:catName };

    console.log("data--->>> 🔥🔥🔥🔥", subdata);
    if (!isupdate) {
        createSub(subdata);
        setRefreshcategory(!refreshcategory);
    }
    else if (isupdate) {
       // updateSub(subcatid, subdata);
        setRefreshcategory(!refreshcategory);
    }
  };

  return (
    <div>
      <AdminLayout>
        <div>
          <h1 className=" text-xl font-semibold  text-blue-400">
            sub-category  { subCategoies?.length}
          </h1>

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
        </div>
      </AdminLayout>
    </div>
  );
};

export default Sub;
