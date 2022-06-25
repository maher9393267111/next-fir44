import React from "react";
import { cartuse } from "../../context/cartContext";
const CartTable = ({ cart }) => {
  const { increasequantity, Decreasequantity, deleteProduct } = cartuse();

  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>

            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>

            <th scope="col" class="px-6 py-3">
              Edit
            </th>
          </tr>
        </thead>

        <tbody>
          {cart?.map((item, index) => {
            return (
              <tr
                key={item?.name}
                class="bg-white  border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  <div className=" mt-4 font-bold">{item.name}</div>
                </th>

                <td class="px-6 py-4  ">
                  <div className=" text-center mt-4 flex gap-4  font-bold">
                    <p onClick={() => increasequantity(item)}>
                      <img
                        className=" w-6 h-6 rounded-full"
                        src="https://cdn3.iconfinder.com/data/icons/basicolor-arrows-checks/24/163_plus_add_new-128.png"
                        alt=""
                      />
                    </p>

                    <p>{item.quantity}</p>

                    <div>
                      <p onClick={() => Decreasequantity(item)}>
                        <img
                          className=" w-6 h-6 rounded-full"
                          src="https://cdn3.iconfinder.com/data/icons/user-interface-buttons/64/_Delete-256.png"
                          alt=""
                        />
                      </p>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4">
                  <img
                    className="w-12   object-contain h-12 rounded-full"
                    src={item.image}
                    alt=""
                  />
                </td>

                <td class="px-6 py-4">
                  <div className=" text-center flex gap-4">
                    <p className=" text-green-500 font-bold">
                      {" "}
                      <img
                        className="w-6 mt-2 h-6 rounded-full"
                        src="https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/pencil-256.png"
                        alt=""
                      />
                    </p>

                    <p
                      onClick={() => deleteProduct(item)}
                      className=" font-bold  text-red-500"
                    >
                      {" "}
                      <img
                        className="w-6 h-6  mt-2 rounded-full"
                        src="https://cdn4.iconfinder.com/data/icons/buno-email/32/__trash_delete_can-256.png"
                        alt=""
                      />
                    </p>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
