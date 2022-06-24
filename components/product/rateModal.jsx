import { Button, Modal } from 'antd';
import { useState } from 'react';
import {Rate} from 'antd'
import {db} from '../../firebase'
import {globaluse} from '../../context/global'
import { updateDoc,doc,query,arrayUnion,arrayRemove,collection } from 'firebase/firestore';


const ModalRate = ({ showModal,handleOk,handleCancel,isModalVisible}) => {
 
 


  return (
    <>
     
      <Modal title="Rating Product " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
     
<div>

<Rate
onChange={(value) => console.log(value)}

allowHalf defaultValue={5} />

</div>



      </Modal>
    </>
  );
};

export default ModalRate;