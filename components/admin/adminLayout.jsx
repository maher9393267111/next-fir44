import React from 'react';
import AdminNav from './adminsidebar';
import {useEffect,useState} from 'react';
import { globaluse } from '../../context/global';
const AdminLayout = ({ children}) => {

const {userinfo} = globaluse();

// redirect user if role not admin
useEffect(()=>{

    if(userinfo.role !== "admin"){
        window.location.href="/";
    }
    

},[userinfo])



    return (
        <div className=' mt-12 ml-12 mr-12'>

            <div>

                <div className=' grid grid-cols-12'>

                    {/* ---sidebar--- */}
                    <div className=' sm:col-span-4 lg:col-span-3'>
                        <AdminNav />
                    </div>

                    <div className='sm:col-span-8  lg:col-span-9'>
                        {children}
                    </div>



                </div>



            </div>
        </div>
    );
}

export default AdminLayout;
