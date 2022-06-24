import React from "react";
import { Button, message } from "antd";
import Link from "next/link";
import { globaluse } from "../../context/global";
import { useState } from "react";

import dynamic from "next/dynamic";

const Ratreadnossr = dynamic(() => import("../../components/product/rateread"), {
  ssr: false,
});

const RateModalnossr = dynamic(() => import("../../components/product/rateModal"), {
  ssr: false,
});


//import {Rate} from 'antd'
const Sideinfo = ({ category, subcategory, product }) => {
  const addtocart = () => {
    message.info(`${product.name} added to cart`);
  };

  const addtoWishlist = () => {
    message.info(`${product.name} added to wishlist`);
  };



const {userinfo} = globaluse()


// modal
const [isModalVisible, setIsModalVisible] = useState(false);

const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};


//





  return (
    <div>
      <div className="ml-8 mr-4">
        {/* header- name */}

        <div>
          <h1 className=" border-2 p-4 text-2xl font-semibold ">
            {product.name}
          </h1>
        </div>

{/* rating by me only read and show */}

<div>

<div className=" mt-4 mb-4">
<Ratreadnossr />
</div>


</div>


        {/* ----info-- */}

        <div>
          <div className=" border-2 min-h-[350px]">
            <ul className=" mx-4 my-4 text-sm font-bold">
              <li className=" flex justify-between mx-2">
                {" "}
                <p>price:</p> <p>${product.price}</p>
              </li>

              <li className=" flex justify-between mx-2">
                {" "}
                <p>categoryName:</p> <p> <Link href = {`/category/${category.id}`}><a> {category.name}</a></Link></p>
              </li>

              <li className=" flex justify-between mx-2">
                {" "}
                <p>subcategory:</p> <p> <Link href = {`/sub/${subcategory.id}`}><a> {subcategory.name}</a></Link></p>
                
              </li>

              <li className=" flex justify-between mx-2">
                {" "}
                <p>color:</p> <p>{product.color}</p>
              </li>

              <li className=" flex justify-between mx-2">
                {" "}
                <p>Sold:</p> <p>{product.sold}</p>
              </li>

              <li className=" flex justify-between mx-2">
                {" "}
                <p>Quantity:</p> <p>{product.quantity}</p>
              </li>
            </ul>

            {/* ---icons-- */}

            <div className=" border-t-2">
              {/* flex icons--- */}
              <div className=" mt-[14px] flex  ml-6 mr-4   justify-around">
                <div>
                  <p>
                    <img
                      className="w-10 h1-10 rounded-full cursor-pointer"
                      src="https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/add_plus_cart_buy-256.png"
                      alt=""
                    />
                    <p className="font-semibold text-[13px]">Add to Cart</p>
                  </p>
                </div>

                <div>
                  <p>
                    <img
                      className="w-10 h1-10 cursor-pointer rounded-full"
                      src="https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/mark_wishlist_favorite-256.png"
                      alt=""
                    />
                    <p  className="font-semibold text-[13px]">Add to Wishlist</p>
                  </p>
                </div>

                <div>
                  <p
                  >
                    <img
                         
              onClick={showModal}
                      className="w-10 h-10 rounded-full  cursor-pointer"
                      src="https://cdn4.iconfinder.com/data/icons/food-delivery-72/64/rating-star-review-feedback-evaluation-premium-rank-256.png"
                      alt=""
                    />
              {userinfo.name &&      <p 
         
              className="font-semibold text-[13px]">Make Rating</p>}
              {!userinfo.name &&      <p className="font-semibold text-[13px]  text-red-600">Please Signin to Make Rating</p>}

<RateModalnossr   
showModal= {showModal}
handleOk= {handleOk}
handleCancel= {handleCancel}
isModalVisible= {isModalVisible}

/>

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sideinfo;
