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
const Catid = () => {

    const router = useRouter();
    const { catid } = router.query;
    console.log(catid);



    return (
        <div>
            {catid}

        </div>
    );
}

export default Catid;
