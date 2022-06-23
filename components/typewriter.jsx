import React from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import { useEffect ,useRef} from 'react';
const Typewriter = () => {





        
      
         const myRef = useRef(null)
     
      
      



    return (
        <div>
            <TypeWriterEffect
className='mt-12 ml-12'
            textStyle={{ fontFamily: 'Red Hat Display' ,fontSize: '2rem',marginTop: '2rem'}}
            startDelay={100}
            
            
            cursorColor="black"
            text="This is a single text"
            typeSpeed={100}
            ref={myRef}
          />

        </div>
    );
}

export default Typewriter;
