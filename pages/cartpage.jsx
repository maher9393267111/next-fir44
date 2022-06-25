import React from "react";
import { useState, useEffect } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { query, orderBy, collection, doc, getDoc } from "firebase/firestore";
import { cartuse } from "../context/cartContext";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { Button } from "antd";
import { toast } from "react-toastify";
import { globaluse } from "../context/global";
import dynamic from "next/dynamic";
const CartTable = dynamic(() => import("../components/cards/CartTable"),
{ ssr: false });
//import CartTable from "../components/cards/CartTable";

const Cartpage = () => {
  //  const [cart, setCart] = useState({ cart: [], total: 0 });
  const { userinfo } = globaluse();


  const query=  (doc(db, "Users", `${userinfo?.email}`))
 

  const [userdata] = useDocumentData(query, { idField: 'id' });




  //const [userdata] = useDocumentData(doc(db, "Users", `${userinfo?.email}`));

  return (
    <div>
      <div>
        {/* ---grid- */}

        <div className=" gap-6 mt-20 pb-22 grid grid-cols-12">
          {/* -show all products in cart-- */}

          <div className=" sm:col-span-12 lg:col-span-8 ">
            <div className="ml-12 mr-12 ">
            
        
    
<CartTable cart={userdata?.cart} />





            
            
            </div>
          </div>

          {/* summary--- */}

          <div className="sm:col-span-12 lg:mt-6 sm:mt-14     lg:col-span-4">
            <div className="w-full ml-12   sm:ml-22  mr-12">
              {/* ----content start--- */}
              <div>
                {/* ---header-- */}

                <div>
                  <h1 className=" mb-6 sm:text-xl  lg:text-3xl font-bold">
                    Cart Summary
                  </h1>
                </div>

                {/* info products-- */}

                <div>
                  {userdata?.cart?.map((item, index) => {
                    return (
                      <div key={item.id} className="flex  gap-2 font-bold ">
                        <p>{item.name} x</p>

                        <p>{item.quantity}</p>

                        <p> = {item.price * item.quantity}</p>
                      </div>
                    );
                  })}

                  {/* ----total-- */}

                  <div className=" mt-4 border-t-2">
                    <h1 className=" pt-2 text-2xl ">
                      {" "}
                      Total Price:{userdata?.totalprice}
                    </h1>
                  </div>

                  {/* ---checkout--- */}
                  <div className=" mt-4 sm:ml-4 lg:ml-0">
                    {userinfo?.name && (
                      <Button type="primary">Process Checkout</Button>
                    )}

                    {!userinfo?.name && (
                      <Button type="danger"> Plaese Login To Checkout</Button>
                    )}
                  </div>
                </div>
              </div>

              {/* // cart content end --- */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartpage;
