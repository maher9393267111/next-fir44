import { Button, Modal } from "antd";
import { useState } from "react";
import { Rate } from "antd";
import { db } from "../../firebase";
import { globaluse } from "../../context/global";
import {
  updateDoc,
  doc,
  getDoc,
  query,
  arrayUnion,
  arrayRemove,
  collection,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { refreshsingleproduct } from "../../context/store/reduxglobal";

const ModalRate = ({
  showModal,
  handleOk,
  handleCancel,
  isModalVisible,
  product,
}) => {
  const { userinfo } = globaluse();
  const dispatch = useDispatch();

  const [myrating, setMyrating] = useState(0);

  const handlerating = async (value) => {
    dispatch(refreshsingleproduct());

    console.log(value, "value");

    const ratingdata = {
      stars: value,
      postedby: userinfo.id,
    };

    const ratingRef = doc(db, "Pro", product.id);
    const rating = await getDoc(ratingRef);
    const ratingarray = rating.data().rating;
    console.log(ratingarray, "ratingarray");

    ratingarray.map((item) => {
      if (item.postedby === userinfo.id) {
       // toast.error("You have already rated this product delete it");
        setMyrating(0);
        updateDoc(ratingRef, {
          rating: ratingarray.filter((item) => item.postedby !== userinfo.id),
        });
        return;
      } else {
        updateDoc(ratingRef, {
          rating: arrayUnion(ratingdata),
        });
     //   toast.success("Rating  Successful");
        setMyrating(value);
      }
    });
  };

  return (
    <p>
      <Modal
        title="Rating Product "
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Rate
            onChange={handlerating}
            allowHalf
            defaultValue={myrating !== 0 ? myrating : 3.5}
          />
          {/* {myrating !== 0 ? myrating : 3.5}
          -----{myrating} */}

<div>
    {myrating !== 0 ? 'Remove your rating' : 'Make your rating'}
</div>


        </div>
      </Modal>
    </p>
  );
};

export default ModalRate;
