import React from 'react';

import { toast } from 'react-toastify';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Switch,
  Upload,
} from 'antd';
const { Option } = Select;
import AdminLayout from '../../components/admin/adminLayout';
import { useState, useRef,useEffect } from "react";
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
  deleteObject
} from "firebase/storage";
import { async } from '@firebase/util';
const Product = () => {

const [images, setImages] = useState([]);









const handleimages = async (e) => {

   
        const file = e.target.files[0];
        console.log(file);
        // generate a random string
      const filename = file.name;
      console.log('🕊️ 🕊️ 🕊️ 🕊️',filename);
     
       const testRef = ref(storage, `ecom/${filename}`);
    
        await uploadBytes(testRef, file).then((snapshot) => {
          console.log("Uploaded image to storage success!");
        });
    
        // get image url from storage and set into state
        const down = await getDownloadURL(testRef);
        //setproductimage(down);
    
         setImages([...images, { image: down,name:filename }]);
      
      
    //   }
      
    
}
    


// delete image from state

    const deleteImage =async (index,photoname) => {
       
        const desertRef = ref(storage, `ecom/${photoname}`);
        console.log('🕊️ 🕊️ 🕊️ 🕊️',photoname);

        await deleteObject(desertRef).then(() => {
      
        }).catch((error) => {
          console.log('Uh-oh, an error occurred!');
        }
        );
    }
    



  


    return (
        <div>
        
            <AdminLayout>


            <h1>Product</h1>

<>

<div>


<input
onChange={handleimages}

type="file" multiple />

</div>

 {images.length}

 <div>
    {images.map((image, index) => (

        <div key={index}>
            <img src={image.image} alt="product" />
            <button onClick={() => deleteImage(index,image.name)}>Delete</button>
        </div>
            ) )}
 </div>

</>



</AdminLayout>
        </div>
    );
}

export default Product;
