import axios from "axios";
import React, { useState, useContext } from "react";

import Image from "next/image";

import { userContext } from "../utils/contexts/userContext";
import Payment from "../../components/Payment";

export default function id({ cloth }) {
  const [imageState, setImageState] = useState(cloth.ImageUrl[0]);
  const [quantity, setQuantity] = useState(1);

  const { cart } = useContext(userContext);

  const { cartContent, setCartContent } = cart;

  const handleAddCart = (data) => {
    if (cartContent.length == 0) {
      setCartContent((cartContent) => [...cartContent, data]);
    } else {
      const filteredData = cartContent.includes(data);
      if (filteredData) {
        return;
      }
      setCartContent((cartContent) => [...cartContent, data]);
    }
  };
  return (
    <div className="h-screen flex flex-col">
      {/* Beginning of the banner section */}

      <div className="banner flex justify-between bg-gray-200 h-1/6 w-full md:h-1/4">
        <div className="flex items-end">
          <div className="font-serif text-2xl md:text-6xl p-8">
            {cloth.color} {cloth.product}
          </div>
        </div>
        <div className="flex items-center aspect-w-16 aspect-h-9 relative h-full w-24 md:h-40 md:w-1/3">
          <Image src="/images/cart2.svg" layout="fill" objectFit="contain" />
        </div>
      </div>

      {/* End of the banner Section */}

      {/* Beginning of the Product CheckOut Section */}

      {/* Beginninf of the Images Section */}

      <div className="cloth h-3/4 m-8">
        <div className="h-full w-full flex flex-row">
          <div className="h-full w-3/4 border-2 bg-gray-200">
            <div className="aspect-w-16 aspect-h-9 flex justify-center items-center relative h-3/4 w-full bg-gray-200">
              <Image
                src={`data:image/jpeg;base64,${imageState}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="h-24 w-full flex flex-row justify-center items-center -200">
              {cloth.ImageUrl.map((image) => {
                return (
                  <div className="aspect-w-16 aspect-h-9 relative h-12 w-16 cursor-pointer">
                    <Image
                      src={`data:image/jpeg;base64,${image}`}
                      layout="fill"
                      objectFit="contain"
                      onClick={() => setImageState(image)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* End of The Images Section */}

          {/* Start of the Product Details */}

          <div className="product flex flex-col mx-16 py-4">
            <div>
              <h1 className="text-5xl font-serif pb-12">
                Product: {cloth.product}
              </h1>
              <h1 className="text-2xl font-serif pb-4">
                Price: Ksh.{cloth.price}
              </h1>
              <h1 className="text-2xl font-serif pb-4">Size: {cloth.size}</h1>
              <h1 className="text-2xl font-serif pb-12">
                Color: {cloth.color}
              </h1>
            </div>
            <div
              className="flex items-end justify-center p-2 border-2 cursor-pointer"
              onClick={() => handleAddCart(cloth)}
            >
              <h1>Add to Cart &rarr; </h1>
            </div>
            Checkout
            <div className = "border-2 my-4">
              
              <Payment data={cloth.price} />
            </div>
          </div>

          {/* End of the Product Details */}
        </div>
      </div>

      {/* End of the Product Checkout Section */}
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await axios({
    method: "GET",
    url: "http://localhost:9000/get-path",
  });

  const paths = res.data.map((clothing) => {
    return {
      params: {
        id: clothing,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const id = params.id;

  const res = await axios({
    method: "GET",
    url: "http://localhost:9000/get-product",
    params: {
      id,
    },
  });

  return {
    props: {
      cloth: res.data,
    },
  };
};
