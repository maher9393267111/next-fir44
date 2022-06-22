import React from 'react';
import AdminLayout from '../../components/admin/adminLayout';
import { useState } from 'react';
import { Button, Checkbox, Form, Input } from "antd";
import { createCategory } from '../../functions/category';

const Category = () => {




    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };
    

      const Create = async (values) => {
        // e.preventDefault();
    
    
    
        const { category} = values;
    console.log('Category--->>>', category);

    createCategory(category);
        
      };




    return (
        <div>
          

          <AdminLayout>


<h1 className=' text-2xl mb-12'>category</h1>


<div className=' sm:w-[300px]  lg:w-[450px]'>

<Form
     onFinish={Create}
     onFinishFailed={onFinishFailed}
     autoComplete="off"

> 

<Form.Item label="Category Name "    name="category">
        <Input placeholder="Category name" />
      </Form.Item>
      <Form.Item >
        <Button htmlType="submit" type="primary">Create</Button>
      </Form.Item>
    </Form>
</div>




</AdminLayout>


        </div>
    );
}

export default Category;
