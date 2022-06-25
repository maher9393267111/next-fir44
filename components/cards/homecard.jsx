import React from "react";
import { Card } from "antd";
import {Rate} from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
//import laptop from "../../images/laptop.png";
//import  Link  from "next/link";
import  Link  from "next/link";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  // destructure
  const { images, name, desc, id } = product;


// calculate average rating
  const ratings = product.rating.map((rating) => rating.stars);
  const average = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;


  return (
    
<div>
    <div>
     <div className="max-w-sm rounded sm:h-[366px]  lg:h-[477px] overflow-hidden shadow-lg">



   <img  className="w-full lg:h-[200px] sm:h-[130px] object-contain" src={images[0].image} alt="Sunset in the mountains"/>
   <div className="px-6 py-4">
     <div className="font-bold text-xl ">
        
        <div className=" text-center mt-2 ">
            <p>{product?.name}</p>
        </div>
   



        {/* <p className= "  sm:text-sm lg:text-lg text-center">
        { desc &&  desc?.slice(0,40)}
    </p> */}
   </div>
  <div className="px-6  md:w-[252px]  pb-2">

<div className=" text-center">
    <p className=" font-bold">{product.price}$</p>
</div>

{/* ----rating stars show-- */}

<div className=" w-full">
  <h1 className=" ml-4 text-center">
  <Rate allowHalf disabled defaultValue={ average} />
  </h1>
</div>




{/* // flex icons- */}

<div className=" flex ml-4   justify-between gap-4">

<div>
    <img className=" w-10 h-10  object-contain rounded-b-full" src="https://cdn2.iconfinder.com/data/icons/commerce-shadow/100/.svg-3-256.png"/>

<p className="text-[10px]">Add to cart</p>
</div>

<Link href={`/product/${id}`}><a >

 <div> 
 
    <img
    className=" w-10 h-10  object-contain rounded-b-full"
    src="https://cdn1.iconfinder.com/data/icons/applicon-sty-3/512/seen-128.png" alt="" />

 <p className="text-[10px]">View Product</p> 

 </div>  
</a></Link>



</div>

{/* // end flex icons  */}


   </div>
 </div>
    </div>
</div>
</div>



  );
};

export default ProductCard;








{/* //  <Link href={`/product/${id}`}><a ><EyeOutlined className="text-warning" />View Product
//</a></Link>, */}