import { Button, Modal } from 'antd';
import { useState } from 'react';
import {Rate} from 'antd'
import {db} from '../../firebase'
import {globaluse} from '../../context/global'
import { updateDoc,doc,getDoc,query,arrayUnion,arrayRemove,collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

const ModalRate = ({ showModal,handleOk,handleCancel,isModalVisible,product}) => {
 
const {userinfo} = globaluse()



    const handlerating =async (value) => {

console.log(value,'value')

const ratingdata = {
    rating: value,
    postedby: userinfo.id,
}

const cathref = doc(db, "Pro", product.id);
//const category = await getDoc(cathref);

// await updateDoc(cathref, {
//     rating: arrayUnion(ratingdata)
// });
// await toast.success('Rating  Successful');


// check if user has already rated
const ratingRef = doc(db, "Pro", product.id);
const rating = await getDoc(ratingRef);
const ratingarray = rating.data().rating;
console.log(ratingarray,'ratingarray')






    }





  return (
    <p>
     
      <Modal title="Rating Product " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
     
<div>

<Rate
onChange={handlerating}

allowHalf defaultValue={5} />


{userinfo.id}

</div>



      </Modal>
    </p>
  );
};


export default ModalRate;