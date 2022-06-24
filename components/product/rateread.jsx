import React from 'react';
import {Rate} from 'antd'
import { useState } from 'react';
import { globaluse } from '../../context/global';
const Rateread = ({product}) => {

const {userinfo} = globaluse()

const [myrating,setMyrating] = useState(0)

// handle my starts

const handlerating =async () => {


  product && product?.rating?.map(item => {
    if (item.postedby === userinfo.id) {

        setMyrating(item.rating.stars)
        console.log(item.rating,'item.rating')
    
    }
})

}



// find where im rating stars



    return (
        <p>
            
<div>
<Rate allowHalf disabled defaultValue={setMyrating} />
</div>

{product?.rating?.length}  {myrating}

        </p>
    );
}


export default Rateread;
