import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { globaluse } from '../../context/global';
const Latestproducts = () => {

const  {latesProducts} = globaluse()


useEffect(() => {

    latesProducts()


}, []);



    return (
        <div>
            <h1>Latest products</h1>
        </div>
    );
}

export default Latestproducts;
