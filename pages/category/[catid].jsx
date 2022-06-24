import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { globaluse } from "../../context/global";
import {useSelector} from 'react-redux'
import HomeCard from "../../components/cards/homecard";
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

    const { CategoryProducts } = globaluse();
    const { categoryproducts } = useSelector((state) => state.global);

    const fetchcategory = async () => {

        const categorypath = doc(db, "Categories2", catid);

        const category = await getDoc(categorypath);
        setCategory({ id: category.id, ...category.data() });

        await CategoryProducts(catid);


    }




    useEffect(() => {

        if (catid) {

            fetchcategory();

        }


    }, [catid, db])



    return (
        <div>
            {/* {catid} */}
          

            {/* ----header-- */}

<div>
    <h1 className=' text-2xl text-blue-500 mt-6 ml-8'> {category?.name} Category </h1>
</div>

            <div className=' ml-12 mt-12 mr-4 grid  sm:grid-cols-2 lg:grid-cols-3'>

       
            { categoryproducts && categoryproducts.map((product) => {

return (

    <div key={product.id}>
        <HomeCard product={product} />
    </div>



) })}

</div>

        </div>
    );
}

export default Catid;
