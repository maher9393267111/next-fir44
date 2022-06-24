import React from "react";
import { Rate } from "antd";
import { useState, useEffect } from "react";
import { globaluse } from "../../context/global";
import { startAfter } from "firebase/firestore";
const Rateread = ({ product }) => {
  const { userinfo } = globaluse();

  const [myrating, setMyrating] = useState(0);

  
 
const [staraverage, setStarsave] = useState();




// ratingaverage calculation

    const ratingaverage = (rating) => {
        console.log(rating, "ratin🔥🔥🔥🔥g");
        let sum = 0;
        let count = 0;
        rating?.map((item) => {
            sum += item.stars;
            console.log(sum, "🔥🔥sum🔥🔥");
            count++;
        }
        );
        console.log(sum, count, "sum and count");
        const result = sum/count
        // setStarsave(result);
        return sum / count;
    }


    const rat = ratingaverage(product?.rating);





  return (
    <p>
      <div>
        <Rate allowHalf disabled defaultValue={Number(rat)} />
      </div>

      {/* {staraverage} */}
   
      {ratingaverage(product?.rating)}

    </p>
  );
};

export default Rateread;
