import React from 'react';
import Allproducts from '../components/shop/allproducts';
import Sidebar from '../components/shop/filterbar';


const Shop = () => {
    return (
        <div>
            
<div className=' mt-12 pb-12' >


{/* ---grid filter  and all products-- */}

<div className=' ml-4 mr-4 grid  grid-cols-12'>


{/* ---filter sider--- */}

<div className=' col-span-4'>

    <Sidebar />
</div>





{/* ---all products--- */}

<div className=' mr-4 col-span-8'>

    <Allproducts />
</div>




</div>









</div>







        </div>
    );
}

export default Shop;
