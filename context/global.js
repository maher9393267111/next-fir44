import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  sendSignInLinkToEmail,
  updateProfile,
  updatePassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  orderBy,
  limit,
  query,
  where,
  FieldPath,
  updateDoc,
  arrayUnion,
  startAt,
  endAt
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import {
  fetchCategories,
  fetchSubCategories,
  fetchProducts,
  fetchCategorySubs,
  fetchsingleProduct,
  fetchlatestproducts,
  fechBestsellers,
  fetchsingleCategory,
  relatedproductsfetch,
  fetchcatproducts,
  fetchsubcatproducts,
  fetchsearchedproducts

} from "./store/reduxglobal";
import { useDispatch } from "react-redux";


const globalContext = createContext();


export const globaluse = () => {
  return useContext(globalContext);
};

const subContextComponent = ({ children }) => {
  const [name, setName] = useState("maher");
  const [villas, setVillas] = useState([]);
  const [currentUser, setUser] = useState({});
  const [userinfo, setUserInfo] = useState({});
  const [disbledaysischange, setDisbledaysischange] = useState();
  const [openmodal, setOpenmodal] = useState(false);
  const [allcategory, setAllcategory] = useState([]);
  const [refreshcategory, setRefreshcategory] = useState(false);
  const[selectedcategory,setSelectedcategory]=useState('');
  const dispatch = useDispatch();

  //------- reguister and login

  const signUp = async (email, password, name) => {
    await createUserWithEmailAndPassword(auth, email, password);

    console.log("signUp--------->⚡⚡⚡⚡", email, password, name);

    await updateProfile(auth.currentUser, {
      displayName: name,

      photoURL:
        "https://cdn4.iconfinder.com/data/icons/office-thick-outline/36/office-14-256.png",
    });

    await setDoc(doc(db, "Users", auth.currentUser.email), {
      watchList: [],
      name: auth.currentUser.displayName,
      role: "user",
      image: auth.currentUser.photoURL,
      email: auth.currentUser.email,
      password: password,

      cart: [],
      rezerv: [],
      totalprice: 0,
    });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //------- reguister and login

  //--- Sign in with google ---

  // sign with google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

    // add the user to the users collection

    await setDoc(doc(db, "Users", auth.currentUser.email), {
      watchList: [],
      name: auth.currentUser.displayName,
      role: "user",
      image: auth.currentUser.photoURL,
      email: auth.currentUser.email,
      password: "",

      cart: [],
      rezerv: [],
      totalprice: 0,
    });
  };

  // signout

  const logout = () => {
    console.log("logout");
    setUser({});
    setUserInfo({});
    signOut(auth);
  };

  //------

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        const fetchuser = async () => {
          const userinfo = await getDoc(doc(db, "Users", user.email));
          setUserInfo({id:userinfo.id, ...userinfo.data()});
        };

        fetchuser();
      }
    });

    return unsubscribe;
  }, [auth]);

  // when user change fetch the user info from the database

  // send disbled days to the firebase

  // update Password
  const handleUpdatePassword = async (password) => {
    // console.log("new oassword is--->🔥🔥🔥🔥🔥🔥", password);
    const user = auth?.currentUser;
    //  console.log("user is--->🔥🔥🔥🔥🔥🔥", user);
    // const newPassword = getASecureRandomPassword();

    await updatePassword(user, password);

    // after that update user inormation in the firebase
    await updateDoc(doc(db, "Users", user.email), {
      password: password,
    })
      .then(() => {
        console.log("password is updated in firebase");
        toast.success("password is updated");
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("error ");
      });
  };

  //
  useEffect(() => {
    const listCategories = async () => {
      async function readData() {
        let families = [];
        const querySnapshot = await getDocs(collection(db, "Categories2"));
        console.group("Dashboard useEffect read firestore data: ");

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          families.push({ id: doc.id, ...doc.data() });
        });
        setAllcategory(families);
        dispatch(fetchCategories(families));
        return families;
      }

      await readData();
    };
    listCategories();
  }, [db, refreshcategory]);

  useEffect(() => {
    const listSubCategories = async () => {
      async function readsubData() {
        let subarr = [];
        const querySnapshot = await getDocs(collection(db, "subcat"));
        console.group("Dashboard useEffect read firestore data: ");

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          subarr.push({ id: doc.id, ...doc.data() });
        });
        //  setAllcategory(subarr);
        dispatch(fetchSubCategories(subarr));
        return subarr;
      }

      await readsubData();
    };
    listSubCategories();
  }, [db, refreshcategory]);




  useEffect(() => {
    const listproducts = async () => {
      async function readproData() {
        let proarr = [];
        const querySnapshot = await getDocs(collection(db, "Pro"));
        console.group("Refetch all products from database   🔴  🔴   🔴 ");

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          proarr.push({ id: doc.id, ...doc.data() });
        });
        //  setAllcategory(subarr);
        dispatch(fetchProducts(proarr));
        return proarr;
      }

      await readproData();
    };
    listproducts();
  }, [db,refreshcategory]);




// find product by his id

  useEffect(() => {
  
     




      },[]
  )



useEffect(() => {
  const q = query(collection(db, "subcat"), where("categoryid", "==", selectedcategory));

  const noteListener = onSnapshot(q, (querySnapshot) => {
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
  dispatch(fetchCategorySubs(list));
  });

  return noteListener;
}, [selectedcategory]);





// latest products

const latesProducts = async () => {

const startat =2

  // startAt(startAtParam), endAt(endAtParam)


  onSnapshot(
    query(collection(db, "Pro"), orderBy("createdat", "desc"),limit(8),
   // startAt(startat)
    ),
    (snapshot) => {
      const productsArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(fetchlatestproducts(productsArr));

    }
  );
}



// best sellers products


const BestSellersProducts = async () => {

 
    // startAt(startAtParam), endAt(endAtParam)
  
  
    onSnapshot(
      query(collection(db, "Pro"), orderBy("sold", "desc"),limit(12),
     // startAt(startat)
      ),
      (snapshot) => {
        const productsArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
         dispatch(fechBestsellers(productsArr));


        return productsArr;
  
      }
    );
  }
  
  




  
const RealatedProducts = async (prod,subid) => {

  //console.log("productid 🚀🚀🚀🚀🚀🚀",prod, '-------',);
  //console.log("sUbi 🔴🔴" ,'-------',subid);
  // startAt(startAtParam), endAt(endAtParam)


  onSnapshot(
    query(collection(db, "Pro"),
     where('subid', '==' , `${subid}`  ), 
    where('name', '!=' , prod   ), 
   // orderBy("id", "desc")
   // ,
   // limit(3),
   // startAt(startat)
    ),
    (snapshot) => {
      const productsArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

       dispatch( relatedproductsfetch(productsArr));


      return productsArr;

    }
  );
}




    
const CategoryProducts = async (catid) => {

  //console.log("productid 🚀🚀🚀🚀🚀🚀",prod, '-------',);
  console.log("category id is--- 🔴🔴" ,'-------',catid);
  // startAt(startAtParam), endAt(endAtParam)


  onSnapshot(
    query(collection(db, "Pro"),
     where('categoryid', '==' , `${catid}`  ), 
  //  where('name', '!=' , prod   ), 
   // orderBy("id", "desc")
   // ,
   // limit(3),
   // startAt(startat)
    ),
    (snapshot) => {
      const productsArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

       dispatch(fetchcatproducts(productsArr));


      return productsArr;

    }
  );
}






const SubProducts = async (subid) => {

  //console.log("productid 🚀🚀🚀🚀🚀🚀",prod, '-------',);
  console.log("sub id is--- 🔴🔴" ,'-------',subid);
  // startAt(startAtParam), endAt(endAtParam)


  onSnapshot(
    query(collection(db, "Pro"),
     where('subid', '==' , `${subid}`  ), 
  //  where('name', '!=' , prod   ), 
   // orderBy("id", "desc")
   // ,
   // limit(3),
   // startAt(startat)
    ),
    (snapshot) => {
      const productsArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

       dispatch(fetchsubcatproducts(productsArr));


      return productsArr;

    }
  );
}





// searched by text products


const SearchbyText = async (text) => {

  //console.log("productid 🚀🚀🚀🚀🚀🚀",prod, '-------',);
  console.log("sub id is--- 🔴🔴🚀🚀🚀🚀🚀🚀" ,'-------',text);
  // startAt(startAtParam), endAt(endAtParam)

// search with text  regexp 

 const regex = new RegExp(text, "i");


// `${regex}`



var q1 = query(collection(db, "Pro"), where("name", "==", `${text}`));

  onSnapshot(q1, (snapshot) => {
    const productsArr = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

      dispatch(fetchsearchedproducts(productsArr));

  
    return productsArr;
  }
  );






  // onSnapshot(
  //   query(collection(db, "Pro"),
  //    where('name', '==' ,  `m12`   ), 
  // //  where('name', '!=' , prod   ), 
  //  // orderBy("id", "desc")
  //  // ,
  //  // limit(3),
  //  // startAt(startat)
  //   ),
  //   (snapshot) => {
  //     const productsArr = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //      dispatch(fetchsearchedproducts(productsArr));


  //     return productsArr;

  //   }
  // );
}








  const value = {
    signUp,
    disbledaysischange,
    setDisbledaysischange,
    name,
    villas,

    signInWithGoogle,
    logout,
    currentUser,
    userinfo,
    openmodal,
    setOpenmodal,
    signIn,
    handleUpdatePassword,
    allcategory,
    setAllcategory,
    refreshcategory,
    setRefreshcategory,
    selectedcategory,
    setSelectedcategory,
    latesProducts,
    BestSellersProducts,
    RealatedProducts ,
    CategoryProducts,
    SubProducts,
    SearchbyText
   //fetchSingleCategoryProducts
  };

  return (
    <globalContext.Provider {...{ value }}>{children}</globalContext.Provider>
  );
};

export default subContextComponent;





export const getSpecificProduct = async (id) => {
	const userDoc = doc(db, 'Pro', id);
	const collec = await getDoc(userDoc)

	const data = {
        name: collec.data().name,
   
     
price: collec.data().price,
images: collec.data().images,
quantity: collec.data().quantity,
shipping: collec.data().shipping,
categoryid: collec.data().categoryid,
subid: collec.data().subid,
desc: collec.data().desc,


color: collec.data().color,
	};

	return data;
}