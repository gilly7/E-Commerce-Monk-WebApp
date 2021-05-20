import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { userContext } from "../utils/contexts/userContext";
import axios from "axios";
import Payment from "../../components/Payment";
import PaymentForm from "../../components/PaymentForm";

const Cart = () => {
  const { cart } = useContext(userContext);

  const { cartContent } = cart;

  const [changed, setChanged] = useState([]);

  //Function to handle the onChange function for the Selection of Quantity

  const handleChange = (e, clothing) => {
    if (changed.includes(clothing)) {
      clothing.quantity = e.target.value;
      const newArr = changed.filter((cloth) => cloth != clothing);

      setChanged(() => [...newArr, clothing]);
    } else {
      clothing.quantity = e.target.value;
      setChanged((changed) => [...changed, clothing]);
    }
  };

  //Function to handle the total Count of all products in the Cart and their quantity
  const handleCount = () => {
    let total = 0;
    const count = changed.map((cloth) => {
      if (cloth.quantity) {
        total = parseInt(cloth.quantity) + total;
        return total;
      }
      return changed.length - 1;
    });

    return total;
  };

  //Function to calculate the total price of products in the cart
  const handleCartPrice = () => {
    let total = 0;

    const totalPrice = cartContent.map((clothing) => {
      total += clothing.price;
      return total;
    });
    return total;
  };

  //Function to calculate the total price with added quantities
  const handleChangedPrice = () => {
    let total = 0;
    const totalPrice = changed.map((clothing) => {
      const cost = parseInt(clothing.price) * parseInt(clothing.quantity);
      total += cost;
    });
    return total;
  };

  return (
    <div className="container h-screen">
      <div className="banner flex justify-between bg-gray-200 h-1/6 w-full md:h-1/4">
        <div className="flex items-end">
          <div className="font-serif text-2xl md:text-6xl p-8">My Cart</div>
        </div>
        <div className="flex items-center aspect-w-16 aspect-h-9 relative h-full w-24 md:h-40 md:w-1/3">
          <Image src="/images/cart2.svg" layout="fill" objectFit="contain" />
        </div>
      </div>

      {/* Beginning of the Main section */}
      <div className="flex flex-col md:flex-row">
        <main className="main flex flex-col ml-16 w-3/4 space-y-8 my-8">
          {cartContent.length > 0 ? (
            cartContent.map((clothing) => {
              return (
                <>
                  {/* Start of the Product Section At Cart */}
                  <div
                    key={clothing.productID}
                    className="flex flex-col md:flex-row border-2 w-3/4 items-center justify-center"
                  >
                    <div className="aspect-w-16 aspect-h-9 relative h-56 w-full md:w-1/3 bg-gray-200">
                      <Image
                        src={`data:image/jpeg;base64,${clothing.ImageUrl[0]}`}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <div className="py-8 px-4 flex flex-col md:flex-row justify-between flex-grow">
                      <div>
                        <h1 className="pb-2 md:pb-4 text-sm md:text-base">
                          {clothing.color} {clothing.technology}{" "}
                          {clothing.product}
                        </h1>
                        <h1 className="pb-2 md:pb-4 text-sm md:text-base">
                          Size: {clothing.size}
                        </h1>
                        <div>
                          <span className="pr-2 text-sm md:text-base">
                            Quantity
                          </span>
                          <select
                            className="select-quantity text-sm md:text-base"
                            id="select-quantity"
                            value={clothing.quantity}
                            onChange={(e) => {
                              handleChange(e, clothing);
                            }}
                          >
                            <option value="1"></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <p className="price text-sm md:text-base">
                          Ksh. {clothing.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CheckOut Button For Each Individual Product */}
                  <div className="w-3/4 md:w-1/2 cursor-pointer ">
                    <h1 className="">Check Out </h1>
                    <Payment
                      data={
                        changed.includes(clothing)
                          ? parseInt(clothing.price) *
                            parseInt(clothing.quantity)
                          : clothing.price
                      }
                    />
                  </div>

                  {/* CheckOut Button For Each Individual Product */}
                  {/* End of the Product Section At Cart */}
                </>
              );
            })
          ) : (
            <h1>No Clothing in Cart</h1>
          )}
        </main>
        {/* End of the main section */}

        {/* Start of the Side Section */}

        <aside className="side flex flex-col justify-center w-full items-center md:w-1/3 md:justify-start my-8">
          <div className="flex flex-col w-9/12 border-2 p-8">
            <h1 className="font-serif text-2xl pb-8">Order Summary</h1>
            <div className="flex flex-row w-full justify-between pb-8">
              <p>
                {changed.length == 0 ? cartContent.length : handleCount()}{" "}
                pieces
              </p>
              <p>
                Ksh.{" "}
                {changed.length == 0 ? handleCartPrice() : handleChangedPrice()}
              </p>
            </div>
            <div className="flex flex-row w-full justify-between space-x-24 pb-8">
              <p>Deliver</p>
              <p>Ksh. 0</p>
            </div>
            <div className="flex flex-row w-full justify-between mr-4 pb-8">
              <p>Total</p>
              <p>
                Ksh.{" "}
                {changed.length == 0 ? handleCartPrice() : handleChangedPrice()}
              </p>
            </div>
          </div>
          <div className="w-9/12 border-2 p-4 my-4 cursor-pointer">
            {/* <h1>CheckOut All &rarr;</h1> */}
            <Payment
              data={
                changed.length == 0 ? handleCartPrice() : handleChangedPrice()
              }
            />
          </div>
        </aside>

        {/* End of the Side Section */}
      </div>
    </div>
  );
};

export default Cart;
