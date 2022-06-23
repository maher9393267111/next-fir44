import React from 'react';
import { globaluse } from '../../context/global';
import { useEffect,useState } from 'react';
const Bestsellers = () => {

const { BestSellersProducts } = globaluse()

const [bestproducts, setBestproducts] = useState(BestSellersProducts)


useEffect(() => {

BestSellersProducts().then(res => {
    setBestproducts(res)
    console.log(res)
}
)

}, [])


    return (
        <div className=' pb-24'>
<div>


    {/* ---headaer--- */}

<div>
    <h1 className=' text-center text-2xl font-semibold'>Best Sellers {bestproducts?.length}</h1>
</div>

</div>




        </div>
    );
}

export default Bestsellers;
