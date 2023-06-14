import React, { useState } from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Series 1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "Series 2",
        data: [23, 30, 35, 40, 42, 50, 60, 82],
      },
    ],
    options: {
      chart: {
        id: "basic-line",
      },
      xaxis: {
        categories: [
          { label: "Jan", value: "Jan" },
          { label: "Feb", value: "Feb" },
          { label: "Mar", value: "Mar" },
          { label: "Apr", value: "Apr" },
          { label: "May", value: "May" },
          { label: "Jun", value: "Jun" },
          { label: "Jul", value: "Jul" },
          { label: "Aug", value: "Aug" },
        ],
      },
    },
  });

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
        width={400}
      />
    </div>
  );
};

export default LineChart;
