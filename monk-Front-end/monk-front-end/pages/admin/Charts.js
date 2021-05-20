import React, { useState } from "react";
import { VictoryPie } from "victory";
import { ProductChart } from "./ProductChart";

export const Charts = ({ data }) => {
  //state that will determine which charts to be displayed

  const [chart] = useState("Products");

  // A switch statement that will switch the chart state to display various charts

  const determineChart = () => {
    switch (chart) {
      case "Products":
        return <ProductChart data={data} />;
    }
  };

  return (
    <div className="flex flex-row w-full p-4">
      {/* Banner for the Charts Page */}

      <div className="w-1/4">
        <h1 className="font-serif text-2xl">Data Charts</h1>
        <p>This is data visualized depending on the data on the system</p>
      </div>

      {/* End of Banner for the Charts Page */}

      {/* Start of the Charts Components */}

      <div className="flex flex-grow flex-row justify-between">
        <div className="flex items-center flex-grow">{determineChart()}</div>
      </div>

      {/* End of the Charts Components */}
    </div>
  );
};
