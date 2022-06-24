import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux'
import ProductCard from '../cards/homecard'
const Allproducts = () => {

const {products,searchedproducts,searchtext} = useSelector((state) => state.global);


    return (
        <div>
 
{/* {searchtext === '' ?  'ohh empty ' : 'ohh not empty '}   */}


<div>
    <h1 className=' text-2xl font-semibold text-center'> {searchtext === '' ?  'All Products ' : 'Searched Products '}   </h1>
</div>



{/* --searched products--- */}



{ searchtext !== ''  &&
<div>

{searchedproducts.length} off
{searchedproducts?.length>0 ? searchedproducts.map((product) => {



return (

    <div>
        <div className=' my-4 '>
    <ProductCard product={product} />
</div>

    </div>
)})
:
('Products searched is Empty' )
}

</div>

}

{/* -----map products--- */}


<div>


{/* -grid--- */}


  {searchtext === ''   &&

<div className='grid gap-4 md:grid-cols-2  sm:grid-cols-1 lg:grid-cols-3'>

{products?.map((product) => {

return (

<div className=' my-4 '>
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
