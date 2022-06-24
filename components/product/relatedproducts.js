import React from 'react';
import {useSelector} from 'react-redux';
import HomeCard from '../cards/homecard';
 const Relatedproducts = () => {

const {relatedproducts} = useSelector(state => state.global);


    return (
        <div>

  
  
            {/* { relatedproducts && relatedproducts.length} */}



{/* ----grid related cards  */}
<div  className=' grid grid-cols-3 gap-6'>

{relatedproducts.map((product) => {

return (

    <div>
        <HomeCard product={product} />
    </div>

)})}

</div>

            
        </div>
    );
}

export default Relatedproducts;
