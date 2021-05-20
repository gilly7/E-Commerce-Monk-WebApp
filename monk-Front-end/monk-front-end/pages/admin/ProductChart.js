import React from "react";
import { Doughnut, defaults } from "react-chartjs-2";

export const ProductChart = ({ data }) => {
  //Functions that will be use as arguments for the filter method

  //Functions for the type of Cloth data

  const hoodies = (product) => {
    return product.product == "Hoodies";
  };
  const tShirts = (product) => {
    return product.product == "T-Shirt";
  };
  const shorts = (product) => {
    return product.product == "shorts";
  };

  //Functions for the type of tech used on cloth

  const Badge = (product) => {
    return product.technology == "Patch";
  };
  const Vynl = (product) => {
    return product.technology == "Vynl";
  };
  const Print = (product) => {
    return product.technology == "Print";
  };

  // results stored in a variable to be used in the Chart as dataset

  //Results for the type of clothing

  var hoodQuantity = data.filter(hoodies);
  var shirtQuantity = data.filter(tShirts);
  var shortsQuantity = data.filter(shorts);

  //Results for the type of technology used on clothing

  var badgeQuantity = data.filter(Badge);
  var vynlQuantity = data.filter(Vynl);
  var printQuantity = data.filter(Print);

  //Storing the data in a dataset compatible with Chart js

  //Dataset Array for the type of Clothing

  const graphData = [
    hoodQuantity.length,

    shirtQuantity.length,

    shortsQuantity.length,
  ];

  //Dataset Array for the type of technology used for the Clothing

  const graphData2 = [
    badgeQuantity.length,

    vynlQuantity.length,

    printQuantity.length,
  ];

  //Extra customissation of the charts legends

  defaults.plugins.legend.position = "top";
  defaults.plugins.legend.align = "start";

  return (
    // Beginning of the chart display box
    <div className="flex flex-grow justify-center space-x-16 items-center h-full">
      {/* Start of the Type of Product Chart */}

      <div className="flex justify-center items-center h-full p-8 shadow-lg">
        {/* The first Chart(Type of Product) */}

        <Doughnut
          data={{
            labels: ["Hoodies", "Tshirts", "Shorts"],
            datasets: [
              {
                data: graphData,
                backgroundColor: [
                  "rgb(128,128,128)",
                  "rgb(40,40,40)",
                  "rgb(79,79,79)",
                ],
                hoverOffset: 10,
              },
            ],
          }}
          options={{ maintainAspectRatio: false, responsive: true }}
        />

        {/* End of The first Chart(Type of Product) */}
      </div>

      {/* End of the Type of Product Chart */}

      {/* Start of the Type of Technology Used Chart */}

      <div className="flex justify-center items-center h-full p-8 shadow-lg">
        {/* The Second Chart(Type of Technology) */}

        <Doughnut
          data={{
            labels: ["Badge", "Vynl", "Print"],
            datasets: [
              {
                data: graphData2,
                backgroundColor: [
                  "rgb(128,128,128)",
                  "rgb(40,40,40)",
                  "rgb(79,79,79)",
                ],
                hoverOffset: 10,
              },
            ],
          }}
          options={{ maintainAspectRatio: false, responsive: true }}
        />

        {/* End of The Second Chart(Type of Technology) */}
      </div>
      {/* End of the Type of Technology Used Chart */}
    </div>
  );
};
