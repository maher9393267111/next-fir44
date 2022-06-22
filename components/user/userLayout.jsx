import React from 'react';
import UserSidebar from './usersidebar';
import {useEffect,useState} from 'react';
import { globaluse } from '../../context/global';
const UserLayout = ({children}) => {


    const {userinfo} = globaluse();

    // redirect user if role not admin
    useEffect(()=>{
    
        if(userinfo.role !== "user"){
            window.location.href="/";
        }
        
    
    },[userinfo])
    


    return (
        <div className=' mt-12 ml-12 mr-12'>
<div>

<div className=' grid grid-cols-12'>

<div className= ' col-span-3'>
<UserSidebar />
</div>


<div className=' col-span-9'>
{children}
</div>


</div>




</div>


            
        </div>
    );
}

export default UserLayout;
