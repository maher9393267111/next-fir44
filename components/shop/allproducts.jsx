import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux'
import ProductCard from '../cards/homecard'
const Allproducts = () => {

const {products,searchedproducts} = useSelector((state) => state.global);


    return (
        <div>
            {/* all products
            {products?.length} */}

{/* ---header--- */}

<div>
    <h1 className=' text-2xl font-semibold text-center'> All Products</h1>
</div>



{/* --searched products--- */}

<div>

{searchedproducts.length} off
{searchedproducts?.length>0 ? searchedproducts.map((product) => {



return (

    <div>
        <img className=' w-4 h-4 rounded-full' src={product?.images[0]?.image} alt="" />
    </div>
)})
:
('Products searched is Empty' )
}

</div>


{/* -----map products--- */}


<div>


{/* -grid--- */}


<div className='grid gap-4 md:grid-cols-2  sm:grid-cols-1 lg:grid-cols-3'>

{products?.map((product) => {

return (

<div className=' my-4 '>
    <ProductCard product={product} />
</div>



)})}






</div>


</div>



        </div>
    );
}

export default Allproducts;
