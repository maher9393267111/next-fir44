import React from "react";
import { Button, Form, Input, InputNumber,Select } from 'antd';
import { toast } from "react-toastify";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {useSelector} from 'react-redux';
const { Option } = Select;
import AdminLayout from "../../components/admin/adminLayout";
import {createProduct } from "../../functions/category";
import { useState, useRef, useEffect } from "react";
import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadString,
  getStorage,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };





const Product = () => {

const {categories, subCategoies,products} = useSelector(state=>state.global);

  const [images, setImages] = useState([]);
const [name, setName] = useState("");
const [price, setPrice] = useState(0);
const [description, setDescription] = useState("");
const [categoryid, setCategoryid] = useState("");
const [categoryName, setCategoryName] = useState("");
const [subid, setSubid] = useState("");
const [subName, setSubName] = useState("");
const [isupdate, setIsupdate] = useState(false);
const [quantity, setQuantity] = useState(0);
const [productid, setProductid] = useState("");
const [shipping, setShipping] = useState(false);

  const handleimages = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    // generate a random string
    const filename = file.name;
   // console.log("🕊️ 🕊️ 🕊️ 🕊️", filename);

    const testRef = ref(storage, `ecom/${filename}`);

    await uploadBytes(testRef, file).then((snapshot) => {
      console.log("Uploaded image to storage success!");
    });

    // get image url from storage and set into state
    const down = await getDownloadURL(testRef);
    //setproductimage(down);

    setImages([...images, { image: down, name: filename }]);

    //   }
  };

  // delete image from state

  const deleteImage = async (index, photoname) => {
    const desertRef = ref(storage, `ecom/${photoname}`);
   // console.log("🕊️ 🕊️ 🕊️ 🕊️", photoname);

    await deleteObject(desertRef)
      .then(() => {'Deleted! '})
      .catch((error) => {
        console.log("Uh-oh, an error occurred!");
      })
      .then(() => {
        // filter out the deleted image
        setImages(images.filter((image, i) => i !== index));
      });
  };


  const onFinish = (values) => {
   // console.log('---🔴🔴 -----',values);






    const productdata ={

name:values.product.name,
price:values.product.price,
images:images,
quantity:values.product.quantity,
shipping:values.product.shipping,
categoryid:values.product.category,
subid:values.product.subcategory,
//description:values.product.description,

    }

if (!isupdate) {


    createProduct(productdata)
}

else if (isupdate) {

    console.log("update product");


}
  };


  return (
    <div>
      <AdminLayout>
        <h1>Product {products?.length}</h1>

        <>
          <div>
            <input onChange={handleimages} type="file" multiple />
          </div>

          {images.length}

          <div className=" grid  grid-cols-4">
            {images.map((image, index) => (
              <div key={index}>
                <img
                  className=" w-20 h-20 rounded-full"
                  src={image.image}
                  alt="product"
                />
                <button onClick={() => deleteImage(index, image.name)}>
                  <img
                    className="w-6 h-6 rounded-full"
                    src="https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/trash-256.png"
                    alt=""
                  />
                </button>
              </div>
            ))}
          </div>

{/* form--- */}

<>
<div className=" mr-16 mt-12">

<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['product', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item
        name={['product', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item> */}
      <Form.Item
        name={['product', 'price']}
        label="price"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 1000,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      
{/* // quantity */}

<Form.Item
        name={['product', 'quantity']}
        label="quantity"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 1000,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item name={['product', 'category']} label="category">
        {/* <Input.TextArea /> */}
        <Select
                    defaultValue={'select some category'}
                    style={{
                      width: 220,
                      marginBottom: "17px",
                    }}
                    //onChange={handleChange}
                  >
                    {categories.map((category) => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}

                   
                  </Select>



      </Form.Item>


      <Form.Item name={['product', 'subcategory']} label="subCategory">
        {/* <Input.TextArea /> */}
        <Select
                    defaultValue={'select subcategory'}
                    style={{
                      width: 220,
                      marginBottom: "17px",
                    }}
                    
                  >
                    {subCategoies.map((sub) => (
                      <Option key={sub.id} value={sub.id}>
                        {sub.name}
                      </Option>
                    ))}

                   
                  </Select>



      </Form.Item>




      <Form.Item name={['product', 'shipping']} label="Shipping">
        {/* <Input.TextArea /> */}
        <Select
                    defaultValue={'select Shipping'}
                    style={{
                      width: 220,
                      marginBottom: "17px",
                    }}
                    //onChange={handleChange}
                  >
                  
                      <Option  value='true'>
                      true
                      </Option>

                      <Option  value='false'>
                      true
                      </Option>
                    

                   
                  </Select>



      </Form.Item>




      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
</div>


</>


<>

<div className=" mt-12 pb-12">

{products?.map((product,index) => (

<div key ={index}>
<h1>{product.name}</h1>
</div>


))}



</div>




</>



        </>
      </AdminLayout>
    </div>
  );
};

export default Product;
