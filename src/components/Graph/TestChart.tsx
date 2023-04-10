import React, { useState } from "react";
import Chart from "react-apexcharts";

const TestChart = () => {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-donut",
    },
    labels: ["Apple", "Banana", "Cherry", "Mango", "Orange"],
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  });

  const [series, setSeries] = useState([44, 55, 41, 17, 15]);

  return (
    <div>
      <Chart options={options} series={series} type="donut" width={400} />
    </div>
  );
};

export default TestChart;
