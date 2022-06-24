import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { globaluse } from "../../context/global";
import {
  onSnapshot,
  doc,
  collection,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
const Subid = () => {

    const router = useRouter();
    const { subid } = router.query;
    console.log(subid);



    return (
        <div>
            {subid}

        </div>
    );
}

export default Subid;
