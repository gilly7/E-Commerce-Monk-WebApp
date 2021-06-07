import React, { useContext } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import axios from "axios";
import { useForm } from "react-hook-form";
import { userContext } from "../utils/contexts/userContext";
import { route } from "next/dist/next-server/server/router";

export default function login() {
  //User Context to store the user Details
  const { userDetails } = useContext(userContext);

  const { setUser } = userDetails;

  const router = useRouter();

  //Submit function to send the form data to the server
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios({
      method: "GET",
      url: "http://localhost:9000/login",
      params: {
        email: data.email,
        password: data.password,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          setUser(res.data);
          router.replace("/check-in/login");
          router.back();
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <main className="bg-gray-200 h-screen">
        {/* Beginning of the Log In Form */}

        <form
          action=""
          className="flex justify-center flex-col items-center h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Beginning of the Email Input */}

          <div className="object-none object-center mx-w-xs m-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="email"
                name="email"
                className="focus:ring-indigo-500 focus:border-indigo-500 block mx-w-xs pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                {...register("email")}
              />
            </div>
          </div>

          {/* End of the Email Input */}

          {/* Beginning of the Password Section */}

          <div className="object-none object-center mx-w-xs m-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="password"
                name="password"
                className="focus:ring-indigo-500 focus:border-indigo-500 block mx-w-xs pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                {...register("password")}
              />
            </div>
          </div>

          {/* End of the Password Section */}

          <input
            type="submit"
            value="Log In"
            className="bg-indigo-300 hover:bg-indigo-500 block w-72 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md text-center p-4 font-bold cursor-pointer mt-4"
          />
          <p className="mt-4 cursor-pointer">
            Don't have an account?{" "}
            <Link href="/check-in/register">
              <span className="text-indigo-500">Sign Up?</span>
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
