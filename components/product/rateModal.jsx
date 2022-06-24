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


const ratingRef = doc(db, "Pro", product.id);
const rating = await getDoc(ratingRef);
const ratingarray = rating.data().rating;
console.log(ratingarray,'ratingarray')

 ratingarray.map(item => {
    if (item.postedby === userinfo.id) {
        toast.error('You have already rated this product delete it');
        updateDoc(ratingRef, {
            rating: ratingarray.filter(item => item.postedby !== userinfo.id)
        });
        return;
    }
    else{
        updateDoc(ratingRef, {
            rating: arrayUnion(ratingdata)
        });
        toast.success('Rating  Successful');
    }
}
)






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