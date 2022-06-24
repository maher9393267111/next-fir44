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
            console.log(sum, "🔥🔥sum🔥🔥");
            count++;
        }
        );
   //     console.log(sum, count, "sum and count");
        const result = sum/count
        console.log(result, "-=--=result");
        // setStarsave(result);
        return sum / count;
    }

}


useEffect(() => {

ratingaverage();
  console.log(product.rating, "🔥🔥-----🔥🔥");

}, [product.rating]);






    const rat = Number(ratingaverage());





  return (
    <p>
      <div>
        <Rate allowHalf disabled defaultValue={ rat} />
      </div>

      {/* {staraverage} */}
   
   <div> 
   {ratingaverage() }

<div>
    {ratingaverage() >2 ? "Good" : "Bad"}

{ratingaverage() >1 && ratingaverage() <2 ? (

<div className=" flex">
    <img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />

<img className=" w-6 h-6 rounded-full" src="https://cdn2.iconfinder.com/data/icons/flat-design-basic-set-9/24/star-half-grayed-256.png" alt="" />


</div>


) : (  ratingaverage() > 2 && ratingaverage() < 3 ? (

<div className=" flex">
    <img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />
    <img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />

<img className=" w-6 h-6 rounded-full" src="https://cdn2.iconfinder.com/data/icons/flat-design-basic-set-9/24/star-half-grayed-256.png" alt="" />

</div>





) : ( ratingaverage() > 3 && ratingaverage() < 4 ? (<div>


<div className=" flex">
<img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />
    <img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />
    <img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />

<img className=" w-6 h-6 rounded-full" src="https://cdn2.iconfinder.com/data/icons/flat-design-basic-set-9/24/star-half-grayed-256.png" alt="" />

</div>







</div>) : (ratingaverage() > 4 && ratingaverage() <= 5 ? (

<div className=" flex">
<img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />
<img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />
    <img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />
    <img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />

<img className=" w-6 h-6 rounded-full" src="https://cdn2.iconfinder.com/data/icons/flat-design-basic-set-9/24/star-half-grayed-256.png" alt="" />

</div>






) : (

<div className=" flex">
<img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />
<img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />
<img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />
    <img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />
    <img className=" w-6 h-6 rounded-full" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-256.png" alt="" />

<img className=" w-6 h-6 rounded-full" src="https://cdn2.iconfinder.com/data/icons/flat-design-basic-set-9/24/star-half-grayed-256.png" alt="" />

</div>




)  )  ) )}


</div>




    </div>  


<div>
    <p className=" flex gap-4"> <p className="pt-[5px]">Ratings from</p>  <p className=" font-bold text-red-600 pt-[5px]">{product.rating?.length} </p> <div><img className=" w-8 h-8 rounded-full" src="https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/user_profile_man-256.png" alt="" /></div></p>
</div>



{Array.from(Array().keys()).map((item) => {return (

    <div>1</div>
)})}






    </p>
  );
};

export default Rateread;
