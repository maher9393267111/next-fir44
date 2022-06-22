import React from 'react';
import UserSidebar from './usersidebar';
const UserLayout = ({children}) => {
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
