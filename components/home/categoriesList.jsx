import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
const CategoriesList = () => {

    const { categories } = useSelector((state) => state.global);


    return (
        <div>


           

<div>

{/* --header  */}

<div>
    <h1 className='  text-blue-600 ml-4 text-2xl font-semibold '> Categories List</h1>
</div>


{/* ---list all categories--- */}
<div >



{/* grid-- */}
<div className=' ml-6 grid mt-4 grid-cols-5 gap-4'>
    
{categories.map((category) => {

    return (

<div key={category.id} className='  border-2 text-black font-bold border-black text-center p-2'>
    <Link href={`/category/${category.id}`}><a className="  text-gray-800">{category.name}</a>
    </Link>
</div>

)})}


</div>


</div>





</div>

        </div>
    );
}

export default CategoriesList;
