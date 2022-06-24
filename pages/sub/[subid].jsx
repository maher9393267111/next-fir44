import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { globaluse } from "../../context/global";
import HomeCard from "../../components/cards/homecard";
import {
  onSnapshot,
  doc,
  collection,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { useSelector } from "react-redux";
const Subid = () => {

    const router = useRouter();
    const { subid } = router.query;
    console.log(subid);




    const [category, setCategory] = useState({});
    const [subcategory, setSubcategory] = useState({});

    const { SubProducts } = globaluse();
    const {  subcategoryproducts } = useSelector((state) => state.global);

    const fetchsub = async () => {

        const categorypath = doc(db, "subcat", subid);

        const sub = await getDoc(categorypath);
        setSubcategory({ id: sub.id, ...sub.data() });

        await SubProducts(subid) 

    }




    useEffect(() => {

        if (subid) {

            fetchsub();

        }


    }, [subid, db])








    return (
        <div>
          
<div>
<div>
      

            {/* ----header-- */}

<div>
    <h1 className=' text-2xl text-blue-500 mt-6 ml-8'> {subcategory?.name} subCategory </h1>
</div>

            <div className=' ml-12 mt-12 mr-4 grid  sm:grid-cols-2 lg:grid-cols-3'>

       
            { subcategoryproducts && subcategoryproducts.map((product) => {

return (

    <div>
        <HomeCard product={product} />
    </div>



) })}

</div>

        </div>
</div>



        </div>
    );
}

export default Subid;
