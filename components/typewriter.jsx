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
        multiText={["Hey there, This is a type writer animation package", "it consist of two types...", "Single text display and multi text display", "Fonts can be customized.", "The type speed can be customized as well"]}
        multiTextDelay={1000}
        typeSpeed={30}
        multiTextLoop
        
      />
      </div>
    </div>
  );
};

export default Typewriter;
