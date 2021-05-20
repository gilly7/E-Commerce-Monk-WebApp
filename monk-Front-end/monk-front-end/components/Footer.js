import React from "react";

export default function Footer() {
  return (
    <div>
      {/* Start of A quicker Navigation Module */}

      <div className="bg-red-100">
        <div className="flex justify-center py-12">
          <div className="md:px-8 px-2">
            <h1 className="font-serif text-base md:text-xl my-2 md:my-8">
              Products
            </h1>
            <ul className="font-poppins text-xs">
              <li>Hoodies</li>
              <li>T-Shirts</li>
              <li>Biker-Shorts</li>
              <li>Sweat-Pants</li>
              <li>Polo Shirts</li>
            </ul>
          </div>
          <div className="md:px-8 px-2">
            <h1 className="font-serif text-base md:text-xl my-2 md:my-8">
              Men
            </h1>
            <ul className="font-poppins text-xs">
              <li>Hoodies</li>
              <li>T-Shirts</li>
              <li>Sweat-Pants</li>
              <li>Polo Shirts</li>
            </ul>
          </div>
          <div className="md:px-8 px-2">
            <h1 className="font-serif text-base md:text-xl my-2 md:my-8">
              Women
            </h1>
            <ul className="font-poppins text-xs">
              <li>Hoodies</li>
              <li>T-Shirts</li>
              <li>Biker-Shorts</li>
              <li>Sweat-Pants</li>
            </ul>
          </div>
          <div className="md:px-8 px-2">
            <h1 className="font-serif text-base md:text-xl my-2 md:my-8">
              Children
            </h1>
            <ul className="font-poppins text-xs">
              <li>Hoodies</li>
              <li>T-Shirts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* End of A quicker Navigation Module */}
    </div>
  );
}
