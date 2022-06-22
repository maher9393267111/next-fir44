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
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import {  fetchCategories} from './store/reduxglobal';
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
          setUserInfo(userinfo.data());
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
useEffect (() => {


 const listCategories = async () => {
  
  async function readData(){
      let families = [];
      const querySnapshot = await getDocs(collection(db, "Categories2"));
      console.group("Dashboard useEffect read firestore data: ")
  
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          families.push( {id: doc.id, ...doc.data()});
        });
        setAllcategory(families);
        dispatch(fetchCategories(families));
       return families;
    
      }

   await  readData()




}
listCategories();

}, [db,refreshcategory])






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
    allcategory, setAllcategory,
    refreshcategory, setRefreshcategory
  };

  return (
    <globalContext.Provider {...{ value }}>{children}</globalContext.Provider>
  );
};

export default subContextComponent;
