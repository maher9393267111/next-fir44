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
  import { auth, db } from "../firebas";
  
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
  
    //--- Sign in with google ---
  
    // sign with google
    const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
  
      // add the user to the users collection
  
      await setDoc(doc(db, "villasUsers", auth.currentUser.email), {
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
      return signOut(auth);
    };
  
    //------
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in.
  
          setUser(user);
          console.log("user status changed: ", user.email, user.uid);
  
          async function fetchuser() {
            if (user) {
              //  console.log(`currentUser: ${user.email}`);
  
              await getDoc(doc(db, "villasUsers", user.email)).then(
                (userdata) => {
                  //console.log('userdata',userdata)
                  setUserInfo(userdata.data());
                  //  console.log("userinf------->>>", userinfo);
                }
              );
            }
          }
  
          fetchuser().catch(console.error);
        }
      });
      return unsubscribe;
    }, [currentUser, auth]);
  
    //--- Sign in with google ---
  
    // fetch villas from firebase
  
    useEffect(() => {
      onSnapshot(
        query(collection(db, "villas"), orderBy("name", "desc")),
        (snapshot) => {
          const productsArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          setVillas(productsArr);
          //  console.log("All ---------> villas is fetched", productsArr, "");
        }
      );
    }, []);
  
    // send disbled days to the firebase
  
    const senddisabledDays = async (villaId, disabled) => {
      console.log("disabledDays in global----->", disabled);
  
      const userpath = doc(db, "villas", `${villaId}`);
      const d = await (await getDoc(userpath)).data()?.disabledDays;
  
      console.log("d in global----->", d);
  
      const joinded = d?.concat(disabled);
  
      console.log("joinded in global----->", joinded);
  
      await updateDoc(doc(db, "villas", villaId), {
        disabledDays: disabled,
      })
        .then(() => {
          console.log("disabledDays is updated");
          setDisbledaysischange(!disbledaysischange);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
  
    const value = {
      disbledaysischange,
      setDisbledaysischange,
      name,
      villas,
      senddisabledDays,
      signInWithGoogle,
      logout,
      currentUser,
      userinfo,
      openmodal, setOpenmodal
    };
  
    return (
      <globalContext.Provider {...{ value }}>{children}</globalContext.Provider>
    );
  };
  
  export default subContextComponent;