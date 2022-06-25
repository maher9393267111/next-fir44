import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { globaluse } from './global'
import { useDispatch } from 'react-redux'
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

    const { userinfo } = globaluse();

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const [totalprice, setTotalprice] = useState(0);
    const [cartexecute, setCartexecute] = useState(false);



    // add product to current user cart

    const addtocart = async (product) => {

        setCartexecute(!cartexecute);
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

                await updateDoc(userpath, {
                    totalprice: cart?.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                    ),
                });

                const totalprice = await (await getDoc(userpath)).data()?.totalprice;

setCartexecute(!cartexecute);

              dispatch(setCart({ cart: cart, total: totalprice }));
                // update totla price

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


                // onother option  increase the quantity of the product if exist

                // make loop to all cart products and increase the quantity  where product id is equal to the product id in the cart

                // cart: cart.map((item) => {
                //   if (item.id === product.id) {
                //     item.quantity += 1;
                //   }
                //   return item;
                // }),
            });

            const cartdecrease = await (await getDoc(userpath)).data()?.cart;


            await updateDoc(userpath, {
                totalprice: cartdecrease?.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                ),


            })



            // total price of the cart

            const cartafterdelete = await (await getDoc(userpath)).data()?.cart;
            const totalpricedafterfelete = await (await getDoc(userpath)).data()?.totalprice;


            toast.success(`total priced is ${totalpricedafterfelete}`);



           dispatch(setCart({ cart: cartafterdelete, total: totalpricedafterfelete }));

setCartexecute(!cartexecute);


        }





    };





useEffect(() => {
cartdata()



}, [])



const cartdata = async () => {

const userpath = doc(db, "Users", `${userinfo?.email}`);
const cart = await (await getDoc(userpath)).data()?.cart;

 const totalprice = await (await getDoc(userpath)).data()?.totalprice;

const  obj = {cart: cart, total: totalprice};

return obj;


}



// update product quantity in cart when user click on + or - button


const increasequantity = async (product, quantity) => {

 const userpath = doc(db, "Users", `${userinfo?.email}`);
const cart = await (await getDoc(userpath)).data()?.cart;

    const totalprice = await (await getDoc(userpath)).data()?.totalprice;

    // find this product in the cart and increse  the quantity

    const increseproduct = cart?.find((item) => item.id === product.id);

     console.log("increseproduct", increseproduct);


}







    const value = {
        addtocart,
        cartdata,
        increasequantity
    };
    return <cartContext.Provider {...{ value }}>{children}</cartContext.Provider>;
};

export default allContext;