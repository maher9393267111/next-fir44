import React from "react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import getStripe from '../lip/getStripe';

import {
  query,
  orderBy,
  collection,
  doc,
  setDoc,
  updateDoc,
  addDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { globaluse } from "../context/global";
import { get } from "react-hook-form";
const Step2 = () => {
  const { userinfo } = globaluse();
  const [ordercheckout, setOrdercheckout] = useState(true);
  const [userdata] = useDocumentData(doc(db, "Users", `${userinfo?.email}`));
  const [orderinfo] = useDocumentData(doc(db, "orders2", `${userinfo?.email}`));
console.log(' 💎💎💎 💎💎💎 💎💎💎----',orderinfo)

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    adress: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleChangephone = (phonevalue) => {
    //  console.log("🚀🚀🚀", phonevalue);
    setValues({ ...values, phone: phonevalue });
  };

  // jandle inputs change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    console.log("🚀🚀🚀", values);
  };



  const handlesubmit = async (e) => {
    e.preventDefault();
    //  console.log("values", values);

    //console.log('userdata', userdata);

    const docRef =
      // await addDoc(collection(db, "orders",  `${userinfo?.email}`)
      await setDoc(doc(db, "orders2", `${userinfo?.email}`), {
        user: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        phone: values.phone,
        adress: values.adress,
        city: values.city,
        state: values.state,
        zip: values.zip,
        country: values.country,
        status: "pending",
        cartitems: userdata?.cart,
        total: userdata?.totalprice,
      });


      // reset cart and totalprice after order is placed
      

        // then resset form values
        // setValues({
        //     firstname: "",

        //     lastname: "",
        //     email: "",
        //     phone: "",
        //     city: "",
        //     adress: "",
        //     state: "",
        //     zip: "",
        //     country: "",
        // });
  };




// make payment here

const handleCheckout = async () => {
  const stripe = await getStripe();

  console.log(userdata?.cart);


  const response = await fetch('/api/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userdata?.cart),
  });
  if(response.statusCode === 500) return;
  
  const data = await response.json();

  await updateDoc(doc(db, "Users", `${userinfo?.email}`), {
      cart: [],
      totalprice: 0,
  }
  );
  console.log('response Data------------>', data)

//   toast.loading('Redirecting...');

  stripe.redirectToCheckout({ sessionId: data.id });
}



// delete order if  customer cancels payment

  const handleCancel = async () => {

    const orderpath = doc(db, "orders2", `${userinfo?.email}`);
    const orderRef =  await deleteDoc(orderpath);
 toast.error('Order Cancelled');


  }





  return (
    <div className=" pb-20 grid grid-cols-12">
      {/* // form--- */}

      <div className=" sm:col-span-12 lg:col-span-7 ml-14 mt-14 w-[350px]">
        {/* -header- */}

<h1>{orderinfo?.user ? 'order maked' : ' no order yet'}</h1>

        {orderinfo?.user}
        <div className=" relative">
          <div className=" absolute  top-[-29px] lg:left-[364px]">
            <h1>Shipping Details {userdata?.cart?.length}</h1>
          </div>

          <div className=" mt-12 mb-12">
            <div>
              <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      First Name
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="firstname"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                    />
                    <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Last Name
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="lastname"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="Doe"
                    />
                  </div>

                  {/* -email- */}

                  <div className="w-full md:w-1/2 px-3 mb-[2px] md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="email-id"
                    >
                      Email
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="email"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="email-id"
                      type="email"
                      placeholder="Jane"
                    />

                    <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Address
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="adress"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="text"
                      placeholder="adress"
                    />
                    <p className="text-gray-600 text-xs italic"></p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      City
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="city"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="Albuquerque"
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mt-6 mr-6 mb-6 md:mb-0">
                    {/* <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        Phone Number
      </label> */}
                    <div className="relative  lg:-mt-4">
                      <div className="">
                        <PhoneInput
                          country={"us"}
                          value={values.phone}
                          onChange={handleChangephone}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-zip"
                    >
                      Zip
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="zip"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="text"
                      placeholder="90210"
                    />
                  </div>
                </div>

                <div className=" mt-6 mb-6">
                  <button
                    onClick={handlesubmit}
                    type="submit"
                    className="text-white  block text-center mt-6 mr-6 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Make Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* // order data--- */}

      <div className=" mt-20  sm:col-span-12 ml-12 mr-12 lg:col-span-5">
        {orderinfo?.user ? (
          <div>
            {/* ---header--- */}

            <div>
              <h1 className="text-2xl mb-4 p-2 w-2/3 bg-green-400 font-bold text-gray-800">
                Order Details
              </h1>
            </div>

            {/* ---info--- */}

            <div>
              <div className=" flex gap-2 mx-2">
                <p className="  font-bold ">Products Number</p>{" "}
                <p>{userdata?.cart?.length}</p>
              </div>

              {/* ----customer data--- */}

              <div>
                <div className=" my-4">
                  <h1 className=" my-2 flex gap-2">
                    {" "}
                    <p className=" font-bold mr-2">Email:</p>{" "}
                    <p>{userdata?.email}</p>
                  </h1>

                  <h1 className=" flex gap-2 my-2">
                    {" "}
                    <p className=" font-bold mr-2">City:</p>
                    <p>{orderinfo?.city}</p>
                  </h1>

                  <h1 className=" flex gap-2 my-2">
                    {" "}
                    <p className=" font-bold mr-2">Adress:</p>
                    <p>{orderinfo?.adress}</p>
                  </h1>

                  <h1 className=" flex gap-2 my-2">
                    {" "}
                    <p className=" font-bold mr-2">Phone:</p>
                    <p>{orderinfo?.phone}</p>
                  </h1>

                  <h1 className=" flex gap-2 my-2">
                    {" "}
                    <p className=" font-bold mr-2">Zip:</p>
                    <p>{orderinfo?.zip}</p>
                  </h1>

                  <h1 className=" flex gap-2 my-2">
                    {" "}
                    <p className=" font-bold mr-2">Total Price:</p>
                    <p>{orderinfo?.total}</p>
                  </h1>

                  <div>
                    <div>
                      <button
                      onClick={handleCheckout}
                        type="button"
                        className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
                      >
                        <svg
                          className="w-4 h-4 mr-2 -ml-1"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="paypal"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                        >
                          <path
                            fill="currentColor"
                            d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
                          ></path>
                        </svg>
                        Check out with PayPal
                      </button>
                    </div>


{/* --cancell the order--- */}

<div>
<div className=" mt-6 mb-6">
                  <button
                    onClick={ handleCancel}
                    type="submit"
                    className="text-white  block text-center mt-6 mr-6 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                  Cancelle Order ?
                  </button>
                  </div>
</div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className=" font-bold text-2xl text-red-500 ">
              You have no order yet
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2;
