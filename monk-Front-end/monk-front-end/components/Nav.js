import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { userContext } from "../pages/utils/contexts/userContext";

const nav = () => {
  const { userDetails } = useContext(userContext);
  const { cart } = useContext(userContext);

  const { user, setUser } = userDetails;
  const { cartContent } = cart;

  return (
    // Beginning of the Main NavBar

    <nav className="h-16 flex items-center justify-between md:mx-8">
      {/* Start of the Product Logo */}

      <div className="">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/images/monk2.png"
            alt="me"
            width="65"
            height="40"
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* End of the Product Logo */}

      {/* Start of the Navigation Images */}

      <div className="flex flex-row items-center">
        <div>
          <p className="mx-8">
            <span className="rounded-full h-5 w-5 border-red-600"></span>
            {user == undefined || null ? <h1>Anonymous</h1> : <h1>{user.first}</h1>}
          </p>
        </div>
        <Link href="/clothing/Cart">
          <div className="relative cursor-pointer">
            <Image src="/images/cart2.svg" alt="me" width="50" height="20" />
            <div className="flex justify-center items-center text-white text-xs absolute top-0 left-0 bg-black h-4 w-4 rounded-full">
              {cartContent.length}
            </div>
          </div>
        </Link>
        <div>
          {user == undefined || null ? (
            <Link href="/check-in/login" className = "cursor-pointer">Login</Link>
          ) : (
            <Image
              src="/images/user-icon.svg"
              alt="me"
              width="50"
              height="20"
            />
          )}
        </div>
      </div>

      {/* Start of the Navigation Images */}
    </nav>

    // Beginning of the Main NavBar
  );
};

export default nav;
