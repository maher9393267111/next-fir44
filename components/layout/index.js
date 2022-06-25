import React from 'react';
import Header from '../header';
import Sidebar from './cartbar'
const Index = ({children}) => {
    return (
        <div>
            <div>

                <Header />
                <Sidebar />


                <div>
                    {children}
                </div>



                {/* -footer */}

<div>
    
</div>



            </div>

            
        </div>
    );
}

export default Index;
