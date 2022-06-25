import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import {globaluse} from './global'
import {useDispatch} from 'react-redux'
import { setCart } from "./store/reduxglobal";

  
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
    endAt,
    equalTo,
  } from "firebase/firestore";

  import { toast } from "react-toastify";
  import { auth, db } from "../firebase";



const cartContext = createContext();

export const cartuse = () => {
  return useContext(cartContext);
};

const allContext = ({ children }) => {

const {userinfo} = globaluse();

const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
const [totalprice, setTotalprice] = useState(0);
  

  // add product to current user cart

  const addtocart = async (product) => {
    // console.log("product", product.id);

    const userpath = doc(db, "Users", `${userinfo?.email}`);
    const cart = await (await getDoc(userpath)).data()?.cart;
    // console.log("cart", cart); // cart is an array itis working

    const exist = cart?.filter(
      (item) =>
        // indexof is used to check if the item is already in the cart
        item.id === product.id
    );
    //console.log("exist", exist);

    if (exist?.length === 0 || exist === []) {
      //  console.log("product is notexist in cart add it", exist);

     // console.log(checexist);

     // product.quantity = 1;

const productdata = {
    id: product.id,
    name: product.name,
    quantity: 1,
    price: product.price,
    image: product.images[0].image,
    

}


      await updateDoc(userpath, {
        cart: arrayUnion(productdata),
        //[...cart, product],
        totalprice: cart?.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      }).then(async () => {
        const cart = await (await getDoc(userpath)).data()?.cart;
        dispatch(setCart(cart));
        // update totla price
        await updateDoc(userpath, {
          totalprice: cart?.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
        });
      });

     // setChecexist(true);

      // total price of the cart
      const totalpriced = cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      setTotalprice(totalpriced);
      console.log("totalprice when addddddd to cart -------->", totalprice);
    }

    // if exist.length is not 0 and product is exist in the cart  //
    else {
      // console.log("product is exist in cart remove it  ", exist);

      await updateDoc(userpath, {
        cart: cart?.filter((item) => item.id !== product.id), // delete product from cart if exist
        totalprice: cart?.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),

        // onother option  increase the quantity of the product if exist

        // make loop to all cart products and increase the quantity  where product id is equal to the product id in the cart

        // cart: cart.map((item) => {
        //   if (item.id === product.id) {
        //     item.quantity += 1;
        //   }
        //   return item;
        // }),
      });

      // total price of the cart

 dispatch(setCart(cart));


      const totalpriced = cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      setTotalprice(totalpriced);
      console.log("totalprice when addddddd to cart -------->", totalprice);
    }
  };







  const value = {
    addtocart
  };
  return <cartContext.Provider {...{ value }}>{children}</cartContext.Provider>;
};

export default allContext;