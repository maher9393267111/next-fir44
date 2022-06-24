import React from "react";
import { Rate } from "antd";
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
  import { query, orderBy, collection, doc } from "firebase/firestore";
  import {db} from '../../firebase'
import { useState, useEffect } from "react";

import { globaluse } from "../../context/global";
import { startAfter } from "firebase/firestore";

const Rateread = ({ product }) => {
  const { userinfo } = globaluse();

  const [myrating, setMyrating] = useState(0);

  
 
const [staraverage, setStarsave] = useState();


console.log(product.id, "product");
//const [prodata] =  useDocumentData(doc(db, "Pro", product.id));



// ratingaverage calculation

    const ratingaverage = () => {
      //  console.log(rating, "ratin🔥🔥🔥🔥g");
        let sum = 0;
        let count = 0;

if (product.rating) {

        product?.rating.map((item) => {
            sum += item.stars;
           // console.log(sum, "🔥🔥sum🔥🔥");
            count++;
        }
        );
   //     console.log(sum, count, "sum and count");
        const result = sum/count
        // setStarsave(result);
        return sum / count;
    }

}


useEffect(() => {

ratingaverage();
  console.log(product.rating, "🔥🔥-----🔥🔥");

}, [product.rating]);






   // const rat = ratingaverage(product?.rating);





  return (
    <p>
      <div>
        <Rate allowHalf disabled defaultValue={ratingaverage ? ratingaverage : 1} />
      </div>

      {/* {staraverage} */}
   
      {ratingaverage() }

{product.rating?.length}


{Array.from(Array(product.rating?.length).keys()).map((item) => {return (

    <div>1</div>
)})}


{/* {Array.from(Array(Number(ratingaverage)).keys()).map((item) => {

return (
<div>
    sd
</div>
)})} */}



    </p>
  );
};

export default Rateread;
