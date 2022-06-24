import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux'
import ProductCard from '../cards/homecard'
const Allproducts = () => {

const {products,searchedproducts,searchtext,searchmode} = useSelector((state) => state.global);


    return (
        <div>
 
{/* {searchtext === '' ?  'ohh empty ' : 'ohh not empty '}   */}


<div>
    <h1 className=' text-2xl font-semibold text-center'> {!searchmode ?  'All Products ' : `Searched Products ${searchedproducts?.length} `}   </h1>
</div>



{/* --searched products--- */}



{ searchmode  &&


<div className=' grid gap-4 md:grid-cols-2  sm:grid-cols-1 lg:grid-cols-3'>


{searchedproducts?.length>0 && searchedproducts.map((product) => {



return (

    <div key ={product.id}>
        <div className=' my-4 '>
    <ProductCard product={product} />
</div>

    </div>
)})


}

</div>

}

{/* -----map products--- */}


<div>


{/* -grid--- */}


   {!searchmode    &&

<div className='grid gap-4 md:grid-cols-2  sm:grid-cols-1 lg:grid-cols-3'>

{products?.map((product) => {

return (

<div key={product.id} className=' my-4 '>
    <ProductCard product={product} />
</div>



)})}



</div>
} 


</div>



        </div>
    );
}

export default Allproducts;
