import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { globaluse } from "../../context/global";
import {
  onSnapshot,
  doc,
  collection,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
const Catid = () => {

    const router = useRouter();
    const { catid } = router.query;
    console.log(catid);


const [category, setCategory] = useState({});
const [subcategory, setSubcategory] = useState({});

const {  CategoryProducts } = globaluse();

const fetchcategory = async () => {

const categorypath = doc(db, "Categories2", catid);

    const category = await getDoc(categorypath);
    setCategory({ id: category.id, ...category.data() });

    await   CategoryProducts(catid);


}




useEffect(() => {

if (catid) {

    fetchcategory();

}


}, [catid,db])



    return (
        <div>
   {catid}
            {category?.name}


        </div>
    );
}

export default Catid;
