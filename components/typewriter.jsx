import React from "react";
import TypeWriterEffect from "react-typewriter-effect";
import { useEffect, useRef } from "react";
const Typewriter = ({text}) => {
  const myRef = useRef(null);

  return (
    <div>

<div className=" w-full mt-6 h-[255px]  text-center bg-slate-200  ">







      <TypeWriterEffect
        // className="mt-12 ml-12"
        textStyle={{
          fontFamily: "Red Hat Display",
          fontSize: "2rem",
          marginTop: "2rem",
        }}
        // startDelay={100}
        // cursorColor="black"
      
        startDelay={1500}
        cursorColor="#3F3D56"
        multiText={["Latest Products", "New Arrivals", "Best Sellers"]}
        multiTextDelay={1000}
        typeSpeed={260}
        multiTextLoop
        
      />
      </div>
    </div>
  );
};

export default Typewriter;
