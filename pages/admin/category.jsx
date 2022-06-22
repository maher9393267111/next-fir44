import React from 'react';
import AdminLayout from '../../components/admin/adminLayout';
import { useState ,useEffect} from 'react';
import { Button, Checkbox, Form, Input } from "antd";
import { createCategory,updateCategory } from '../../functions/category';
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
  import { query,collection,orderBy } from 'firebase/firestore';
  import {db} from '../../firebase';

const Category = () => {


    const q = query(
        collection(db, "Categories2"),
        orderBy("name", "asc"),
      );
      const [categories, loading] = useCollectionData(q);
    //  const [chat] = useDocumentData(doc(db, "chats", id));




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


<h1 className=' text-2xl mb-12'>category {categories?.length}</h1>


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
