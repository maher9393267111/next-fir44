import React from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { onSnapshot, doc } from "firebase/firestore";
const Productid = () => {
  const router = useRouter();
  const { productid } = router.query;
  console.log(productid);

  const [product, setProduct] = useState({});

  const fetchproduct = async() => {
    onSnapshot(doc(db, "Pro", productid), (snapshot) => {
      setProduct(snapshot.data());
      console.log("data ---->", snapshot.data());
    });
  };

  useEffect(() => {

if (productid) {

    fetchproduct();
    console.log("----🔴 🔴 ----", product);
}

  }, [db, productid]);


  return (
    <div>
      <h1>Producti---- {product?.name}</h1>
    </div>
  );
};

export default Productid;
