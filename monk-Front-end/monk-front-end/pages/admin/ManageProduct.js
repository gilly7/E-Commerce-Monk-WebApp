import React, { useContext, useState } from "react";
import Image from "next/image";
// import axios from "axios";
import { userContext } from "../utils/contexts/userContext";
import { Pagination } from "../../components/Pagination";
import axios from "axios";
import { useRouter } from "next/router";

export const ManageProduct = ({ products }) => {
  const { edit, determinor, userDetails } = useContext(userContext);
  const { setEditInfo } = edit;
  const { setDetermine } = determinor;
  const { user } = userDetails;

  const router = useRouter();

  //Set The edit data to the context(global state manager) so as to initialize the form with the data
  const handleEdit = (data) => {
    setEditInfo(data);
    setDetermine("Edit");
  };

  //Function to handle Deletion of Certain Data
  const handleDelete = (data) => {
    
    //Check before hand of There is a user stored in memory

    if (user == null) {
      router.push("/check-in/login");
    } else {
      axios({
        method: "DELETE",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.access_token}`,
        },
        url: "http://localhost:9000/delete-product",
        data,
      })
        .then((res) => {
          console.log(res);
          if (res.data == 401) {
            router.push("/check-in/login");
          } else {
            router.reload();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  //Logic for the Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);

  //Pagination of the Products

  //Get the last product of the page
  const indexOfLastProduct = currentPage * productsPerPage;

  //Get the Index of the First Product in a page
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  //Get products of a single Page
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //Function to set the page link

  const paginate = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className="flex flex-row w-full p-4">
      <div className="w-1/4">
        <h1 className="font-serif text-2xl pb-4">Manage Products</h1>
        <p>Please Perform only necessary Actions</p>
      </div>

      {/* View of All the Products from the Admin Dash */}

      <div className="flex-grow frex flex-row">
        <h1>Products View</h1>

        {/* Loop Over the relevant Products */}

        {currentProducts.length > 0 ? (
          currentProducts.map((product) => {
            return (
              <div
                key={product.productID}
                className="flex items-center justify-between mb-8 border-b-2 p-1 space-x-16 mx-4"
              >
                {/* Begining of the Product Image Module */}
                <div className="aspect-w-16 aspect-h-9 relative h-28 w-28">
                  <Image
                    src={`data:image/jpeg;base64,${product.ImageUrl[0]}`}
                    layout="responsive"
                    layout="fill"
                    objectFit="cover"
                  ></Image>
                </div>
                {/* End of the Product Image Module */}

                {/* Start of the Product Name Module */}
                <div className="flex flex-row space-x-16">
                  <h1>
                    {product.color} {product.product}
                  </h1>
                  <h1>Ksh. {product.price}</h1>
                  <h1>{product.size}</h1>
                </div>
                {/* End of the Product Name Module */}

                {/* Start of the Product Actions Module */}

                <div className="m-4 flex flow-row space-x-8 items-center">
                  <div className="flex flex-row space-x-2 items-center cursor-pointer">
                    <Image src="/images/edit.svg" height={10} width={10} />
                    <h1 onClick={() => handleEdit(product)}>Edit</h1>
                  </div>
                  <div
                    className="flex flex-row items-center space-x-2 cursor-pointer"
                    onClick={() => handleDelete(product.productID)}
                  >
                    <Image src="/images/delete.svg" height={10} width={10} />
                    <h1>Delete</h1>
                  </div>
                </div>

                {/* End of the Product Actions Module */}
              </div>
            );
          })
        ) : (
          <h1>No Products Available</h1>
        )}

        {/* End Of Product Loop */}
        <Pagination
          productsPerPage={productsPerPage}
          products={products.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};
