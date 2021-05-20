import React, { useState, useContext } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { userContext } from "../utils/contexts/userContext";
import { route } from "next/dist/next-server/server/router";
import Link from "next/link";

toast.configure();

const index = ({ data }) => {
  const [filter, setFilter] = useState([]);

  const { cart } = useContext(userContext);

  const { cartContent, setCartContent } = cart;

  const router = useRouter();

  const handleAddCart = (data) => {
    if (cartContent.length == 0) {
      setCartContent((cartContent) => [...cartContent, data]);
      toast.dark("Clothing Added to Cart", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
    } else {
      const filteredData = cartContent.includes(data);
      if (filteredData) {
        return;
      }

      setCartContent((cartContent) => [...cartContent, data]);
      toast.dark("Clothing Added to Cart", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
    }

    // setCartContent((cartContent) => [...cartContent, filteredData]);
  };

  return (
    <div className="conent">
      {/* Beginning of the banner section of the all products page */}
      <div className="banner h-36 md:h-56 bg-gray-200">
        {filter.length == 0 ? (
          <div>
            <h1>All Products</h1>
          </div>
        ) : (
          <h1>Will Be Added soon</h1>
        )}
      </div>

      {/* End of the banner section of the all products page */}

      <div className="flex md:flex-row-reverse w-screen flex-col-reverse">
        {/* Beginning of the main section of the all products page */}

        <main className="main flex-grow flex flex-row p-4 flex-wrap">
          {filter.length == 0 ? (
            data.map((clothing) => {
              return (
                <div
                  key={clothing.productID}
                  className="flex flex-col justify-center md:justify-start mx-4 my-4 md:mx-2 md:my-4 hover:shadow-lg hover:cursor-pointer group hover:border-gray-700"
                >
                  <div className="aspect-w-16 aspect-h-9 relative h-28 w-32  md:h-64 md:w-72 bg-gray-200">
                    <Link href={`/clothing/${clothing.productID}`}>
                      <Image
                        src={`data:image/jpeg;base64,${clothing.ImageUrl[0]}`}
                        layout="fill"
                        objectFit="contain"
                      />
                    </Link>
                  </div>

                  {/* Thumbnails for all the Images of the Clothing */}

                  <div className="h-8 group-hover:visible flex items-start invisible justify-start py-1">
                    {clothing.ImageUrl.map((image) => {
                      return (
                        <div className="aspect-w-16 aspect-h-9 relative h-4 w-8 md:h-full md:w-12">
                          <Image
                            src={`data:image/jpeg;base64,${image}`}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* End of thumbnails for the clothing Images */}

                  {/* Beginning of Other Relevant Information For the Product */}

                  <div className="hover:border-gray-400 py-1 mx-2 ">
                    <p className="text-xs text-gray-300 font-poppins">
                      {clothing.product}
                    </p>
                    <h2 className="font-serif text-gray-900 text-sm md:text-base">
                      {clothing.color} {clothing.product}
                    </h2>
                    <h3 className="pb-8 font-poppins text-gray-500 text-sm md:text-base">
                      ksh.{clothing.price}
                    </h3>
                  </div>

                  {/* Beginning of Other Relevant Information For the Product */}

                  <div className="flex justify-center items-center group-hover:justify-center pb-2">
                    <div
                      className="border-2 border-gray-200 rounded-xl"
                      onClick={() => handleAddCart(clothing)}
                    >
                      <h1 className="px-4 py-1 text-xs md:text-base">
                        Add To Cart{" "}
                        <span className="p-2">
                          <Image
                            src="/images/cart2.svg"
                            width={15}
                            height={15}
                          />
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>Filtered Products</h1>
          )}
        </main>

        {/* End of the main section of the all products page */}

        {/* Begining of the aside menu section which contains the filters */}

        <aside className="p-8 w-1/4">
          <h1>Side Menu</h1>
        </aside>

        {/* End of the aside menu section which contains the filters */}
      </div>
    </div>
  );
};

export default index;

export const getStaticProps = async (context) => {
  var data;

  await axios({
    method: "GET",
    url: "http://localhost:9000/getProducts",
  })
    .then((res) => (data = res.data))
    .catch((err) => console.log(err.message));

  return {
    props: {
      data,
    },
  };
};
