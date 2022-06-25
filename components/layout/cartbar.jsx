import React from "react";

import { Button, Drawer } from "antd";
import { useState, useEffect } from "react";
import { globaluse } from "../../context/global";
import { cartuse } from "../../context/cartContext";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUserInfo, setVisible } from "../../context/store/reduxglobal";

import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { query, orderBy, collection, doc, getDoc } from "firebase/firestore";


import { db } from "../../firebase";

const Cartbar = () => {
  const { userinfo } = globaluse();

  const query = doc(db, "Users", `${userinfo?.email}`);

  const [userdata] = useDocumentData(query, { idField: "id" });

  const { visible } = useSelector((state) => state.global);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setVisible(false));
  };

  return (
    <div>
      <Drawer
        width={520}
        style={{ transition: " all2.5s  ease-in-out" }}
        className="  transition-all   duration-500"
        title="Cart Bar"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        {/* -----sidebar conten----- */}

        <div>
          {/* --show all products in cart-- */}

          <div>
            {userdata?.cart?.map((item) => {
              return (
                <div key={item.name} className="">
                  {/* -----image-- */}

                  <div className=" flex">
                    <img
                      className=" w-[100px] my-4 h-[100px] object-contain"
                      src={item.image}
                      alt=""
                    />

                    <div>
                      <h1 className=" font-bold text-xl text-red-500  mt-12 ml-12">
                        {item.name}
                      </h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Cartbar;
