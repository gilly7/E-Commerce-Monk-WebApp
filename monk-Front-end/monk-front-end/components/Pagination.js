import React from "react";
import { PaginationItem } from "reactstrap";

export const Pagination = ({ productsPerPage, products, paginate }) => {

  //Declare an Empty array that all page numbers will be pushed to according to the number of pages

  const pageNumber = [];

  //For loop that will determine the number of pages and push the iteration to the page Number array

  for (let i = 1; i <= Math.ceil(products / productsPerPage); i++) {
    pageNumber.push(i);
  }

  return (

    //Beginning of the pagination navigation

    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">

      {/* Loop over the page numbers and go to the particular page */}

      {pageNumber.map((number) => (
        <a
          onClick={() => paginate(number)}
          key = {number}
          className="cursor-pointer relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          {number}
        </a>
      ))}

      {/* End of the Loop */}
    </nav>
  );
};
