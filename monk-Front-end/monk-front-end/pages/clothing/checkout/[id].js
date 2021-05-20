import React, { useContext, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function Clothing({ cloth }) {
  
  const [imageState, setImageState] = useState(cloth.ImageUrl[0]);
  const [quantity, setQuantity] = useState(1);

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
        <div className="border-2 h-full w-1/2 flex flex-col">
          <div className="aspect-w-16 aspect-h-9 relative h-3/4 w-full bg-gray-200">
            <Image
              src={`data:image/jpeg;base64,${imageState}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="h-16 w-full flex flex-row justify-center mt-2">
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

          {/* End of The Images Section */}

          {/* Start of the Product Details */}

          <div className="product flex flex-row justify-between mx-16">
            <div>
              <h1>
                {" "}
                {cloth.color} {cloth.product} <span>{cloth.size}</span>
              </h1>
              <h1>{cloth.price}</h1>
              <div>
                <span className="pr-2 text-sm md:text-base">Quantity</span>
                <select
                  className="select-quantity text-sm md:text-base"
                  id="select-quantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
            <div>
              <h1>
                Total Price <span>{cloth.price * quantity || cloth.price}</span>
              </h1>
              <div></div>
            </div>
          </div>

          {/* End of the Product Details */}
        </div>
      </div>

      {/* End of the Product Checkout Section */}
    </div>
  );
}

//Function to get All Possible paths for the dynamic Checkout -- Get all Product IDs

export const getStaticPaths = async () => {
  const res = await axios({
    method: "GET",
    url: "http://localhost:9000/get-path",
  });
  const paths = res.data.map((cloth) => {
    return {
      params: {
        id: cloth,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

//Get the Static Prop from the server depending on the product ID
export const getStaticProps = async ({ params }) => {
  const id = params.id;
  const res = await axios({
    method: "GET",
    url: "http://localhost:9000/get-product",
    params: {
      id,
    },
  });

  const cloth = res.data;
  return {
    props: {
      cloth,
    },
  };
};
