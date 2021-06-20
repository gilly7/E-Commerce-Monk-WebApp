import React from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function index({ data }) {
  //Functions to filter products of a particular Type

  const hoodieFilter = (product) => {
    return product.product == "Hoodies";
  };

  const shirtsFilter = (product) => {
    return product.product == "T-Shirt";
  };

  const shortsFilter = (product) => {
    return product.product == "shorts";
  };

  // Stored in a variable for mapping

  const hoodies = data.filter(hoodieFilter);
  const shirts = data.filter(shirtsFilter);
  const shorts = data.filter(shortsFilter);

  return (
    <div>
      {/* Start of the Main Section of the page */}

      <main className="h-screen">
        <div className="banner flex flex-col h-full w-full md:flex-row justify-center items-center md:items-start md:justify-start">
          {/* Banner Image Section */}

          <div className="aspect-w-3 aspect-h-4 flex items-center justify-center bg-secondary -mt-20 h-3/5 md:h-full w-full">
            <div className="w-2/3 h-2/3 relative flex justify-center items-center md:-ml-10 z-0 -mt-24 md:-mt-0">
              <Image
                src="/images/banner.png"
                objectFit="contain"
                layout="fill"
              />
            </div>
          </div>

          {/* End Of Banner Image Section */}

          {/* Message Section */}
          <div className="flex-col bg-primary h-2/5 md:h-4/5 w-11/12 -mt-24 md:w-1/2 md:-ml-24 md:mr-12 md:-mt-0 flex justify-evenly items-center md:justify-center md:items-start">
            <div className="md:ml-12 md:mr-12">
              <h1 className="text-xl font-serif tracking-wider md:text-5xl text-blue-secondary">
                STYLE.ELEGANT.MESSAGE
              </h1>
            </div>
            <div className="w-full md:w-2/3 md:ml-12 ml-4">
              <p className="mt-4 text-sm font-poppins text-white-primary md:text-sm">
                Monk is a clothing brand that does not only believe in being
                kind but also in leading a humble Life. Dress Monk choose Peace
              </p>
            </div>
            /
            <div className="md:ml-12 bg-blue-secondary py-4 px-10 font-bold font-poppins w-2/3 md:w-1/3">
              <Link href="/clothing/">GRAB A HOODIE</Link>
            </div>
            <div className="flex md:ml-12 mt-8">
              <div className="aspect-w-3 aspect-h-4 h-12 w-12 relative cursor-pointer">
                <div className="w-2/3 h-2/3 relative">
                  <Image
                    src="/images/iconmonstr-facebook-4.svg"
                    objectFit="contain"
                    layout="fill"
                  />
                </div>
              </div>
              <div className="aspect-w-3 aspect-h-4 h-12 w-12 relative cursor-pointer">
                <div className="w-2/3 h-2/3 relative">
                  <Image
                    src="/images/iconmonstr-twitter-4.svg"
                    objectFit="contain"
                    layout="fill"
                  />
                </div>
              </div>
              <div className="aspect-w-3 aspect-h-4 h-12 w-12 relative cursor-pointer">
                <div className="w-2/3 h-2/3 relative">
                  <Image
                    src="/images/iconmonstr-instagram-14.svg"
                    objectFit="contain"
                    layout="fill"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* End Of Image Section */}
        </div>
      </main>

      {/* End of the Main Section of the Page */}

      {/* Call To Action for Different Clothing Product */}
      {/* 
      <div className="flex flex-col items-center justify-center my-8 md:my-12 md:flex-row">
        <div className="py-2 md:mx-4">
          <input
            type="submit"
            value="Hoodies &rarr;"
            className="font-serif tracking-wider bg-transparent border border-gray-700 hover:shadow-lg w-52 sm:text-sm border-gray-300 rounded-md text-center p-2 font-bold cursor-pointer"
          />
        </div>
        <div className="py-2 md:mx-4">
          <input
            type="submit"
            value="T-Shirts &rarr;"
            className="font-serif tracking-wider bg-transparent border border-gray-700 hover:shadow-lg w-52 sm:text-sm border-gray-300 rounded-md text-center p-2 font-bold cursor-pointer"
          />
        </div>
        <div className="py-2 md:mx-4">
          <input
            type="submit"
            value="Shorts &rarr;"
            className="font-serif tracking-wider bg-transparent border border-gray-700 hover:shadow-lg w-52 sm:text-sm border-gray-300 rounded-md text-center p-2 font-bold cursor-pointer"
          />
        </div>
      </div> */}

      {/* End of Call To Action for Different Clothing Product */}

      {/* Beginning of the Products Snippets */}

      {/* <div className="flex flex-col my-2 mx-2 md:my-12 md:mx-24"> */}
      {/* Beginning for the Hood Product Module */}
      {/* <h1 className="font-serif text-sm px-2 py-2 md:px-16 md:py-8 md:text-2xl">
          Hoodies
        </h1>
        <div className="flex w-full justify-start md:justify-center relative">
          <div className="flex flex-row justify-start w-full md:w-3/4 overflow-hidden ">
            {hoodies.map((hood) => (
              <div
                key={hood.productID}
                className="flex flex-col justify-start mx-2 hover:shadow-lg hover:cursor-pointer"
              >
                <div className="aspect-w-16 aspect-h-9 relative h-36 w-40  md:h-48 md:w-60 bg-gray-200">
                  <Link href={`/clothing/${hood.productID}`}>
                    <Image
                      src={`data:image/jpeg;base64,${hood.ImageUrl[0]}`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </Link>
                </div>
                <div className="hover:border-gray-400 py-2 mx-2">
                  <p className="text-xs text-gray-300 font-poppins">
                    {hood.product}
                  </p>
                  <h2 className="font-serif text-gray-900 text-sm md:text-base">
                    {hood.color} hood
                  </h2>
                  <h3 className="pb-8 font-serif text-gray-500 text-sm md:text-base">
                    ksh.{hood.price}
                  </h3>
                </div>
              </div>
            ))}
            <div className="h-8 w-8 bg-white md:bg-gray-200 md:h-12 md:w-12 rounded-full shadow-xl absolute right-0 top-1/4 flex items-center justify-center transition duration-500 ease-in-out hover:scale-100 hover:cursor-pointer">
              <div>&rarr;</div>
            </div>
          </div>
        </div> */}

      {/* End of the Hood Product Module */}

      {/* Start of the T-Shirts Product Module */}

      {/* <h1 className="font-serif text-sm px-2 py-2 md:px-16 md:py-8 md:text-2xl">
          T-Shirts
        </h1>
        <div className="flex w-full justify-start md:justify-center relative">
          <div className="flex flex-row justify-start w-full md:w-3/4 overflow-hidden">
            {shirts.map((shirt) => (
              <div
                key={shirt.productID}
                className="flex flex-col justify-start mx-2  hover:shadow-lg hover:cursor-pointer"
              >
                <div className="aspect-w-16 aspect-h-9 relative h-36 w-40  md:h-48 md:w-60 bg-gray-200">
                  <Link href={`/clothing/${shirt.productID}`}>
                    <Image
                      src={`data:image/jpeg;base64,${shirt.ImageUrl[0]}`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </Link>
                </div>
                <div className="hover:border-gray-400 py-2 mx-2">
                  <p className="text-xs text-gray-300 font-poppins">
                    {shirt.product}
                  </p>
                  <h2 className="font-serif text-gray-900 text-sm md:text-base">
                    {shirt.color} shirt
                  </h2>
                  <h3 className="pb-8 font-serif text-gray-500 text-sm md:text-base">
                    ksh.{shirt.price}
                  </h3>
                </div>
              </div>
            ))}
            <div className="h-8 w-8 bg-white md:bg-gray-200 md:h-12 md:w-12 rounded-full shadow-xl absolute right-0 top-1/4 flex items-center justify-center transition duration-500 ease-in-out hover:scale-100 hover:cursor-pointer">
              <div>&rarr;</div>
            </div>
          </div>
        </div> */}

      {/* End of the T-Shirts Product Module */}

      {/* Start of the Biker-Shorts Product Module */}

      {/* <h1 className="font-serif text-sm px-2 py-2 md:px-16 md:py-8 md:text-2xl">
          Biker Shorts
        </h1>
        <div className="flex w-full justify-start md:justify-center relative">
          <div className="flex flex-row justify-start w-full md:w-3/4 overflow-hidden">
            {shorts.map((short) => (
              <div
                key={short.productID}
                className="flex flex-col justify-start mx-2 hover:shadow-lg hover:cursor-pointer"
              >
                <div className="aspect-w-16 aspect-h-9 relative h-36 w-40  md:h-48 md:w-60 bg-gray-200">
                  <Link href={`/clothing/${short.productID}`}>
                    <Image
                      src={`data:image/jpeg;base64,${short.ImageUrl[0]}`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </Link>
                </div>
                <div className="hover:border-gray-400 py-2 mx-2">
                  <p className="text-xs text-gray-300 font-poppins">
                    {short.product}
                  </p>
                  <h2 className="font-serif text-gray-900 text-sm md:text-base">
                    {short.color} short
                  </h2>
                  <h3 className="pb-8 font-serif text-gray-500 text-sm md:text-base">
                    ksh.{short.price}
                  </h3>
                </div>
              </div>
            ))}
            <div className="h-8 w-8 bg-white md:bg-gray-200 md:h-12 md:w-12 rounded-full shadow-xl absolute right-0 top-1/4 flex items-center justify-center transition duration-500 ease-in-out hover:scale-100 hover:cursor-pointer">
              <div>&rarr;</div>
            </div>
          </div>
        </div> */}

      {/* End of the Biker-Shorts Product Module */}
      {/* </div> */}

      {/* End of the Products Snippets */}
    </div>
  );
}

export const getStaticProps = async (context) => {
  const res = await axios({
    method: "GET",
    url: "http://localhost:9000/getProducts",
  });

  const data = res.data;
  return {
    props: {
      data,
    },
  };
};
