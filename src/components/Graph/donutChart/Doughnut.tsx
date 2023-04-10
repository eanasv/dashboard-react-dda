import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Chart from "react-apexcharts";

import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
//import "chartjs-plugin-datalabels";
import ChartDataLabels from "chartjs-plugin-datalabels";

import "../Chart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface donutChartInterface {
  details?: any;
  multiLayer?: boolean;
  heading: String;
}

const DoughnutChart: React.FC<donutChartInterface> = ({
  details,
  multiLayer,
  heading,
}) => {
  var data;
  if (details && multiLayer) {
    data = {
      datasets: [
        {
          data: [details[0]?.count, 100 - details[0]?.count],
          label: details[0]?.category,
          backgroundColor: ["#a2d6c4", "#ededed"],
          hoverBackgroundColor: ["green", "#909497"],
          legend: ["completed1", "not completed1"],
        },
        {
          data: [details[1]?.count, 100 - details[1]?.count],
          label: details[1]?.category,
          backgroundColor: ["rgba(54, 162, 235, 0.2)", "#ededed"],
          hoverBackgroundColor: ["rgba(54, 162, 235, 1)", "#909497"],
          legent: ["completed3", "not completed3"],
        },
        {
          data: [details[2]?.count, 100 - details[2]?.count],
          label: details[2]?.category,
          backgroundColor: ["rgba(255, 206, 86, 0.2)", "#ededed"],
          hoverBackgroundColor: ["#FF6384", "#909497"],
          legent: ["completed2", "not completed2"],
        },
      ],
      labels: ["completed", "not completed"],
    };
  } else {
    data = {
      labels: details?.map((item) => item.category),
      datasets: [
        {
          label: "# of Employees",
          data: details?.map((item) => item.count),
          backgroundColor: [
            "#a2d6c4",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: ["white", "white", "white"],
          borderWidth: 3,
        },
      ],
      // options: {
      //   plugins: {
      //     datalabels: {
      //       formatter: (value) => {
      //         console.log(value);
      //         return value + "%";
      //       },
      //     },
      //   },
      // },
    };
  }

  return (
    <div>
      <div
        hidden={details?.length <= 0}
        className={multiLayer ? "center-heading" : ""}
      >
        {heading}
      </div>
      <div className="chart-container">
        <Doughnut
          data={data}
          options={{
            plugins: {
              datalabels: {
                formatter: function (value, context) {
                  return context.chart.data.labels[context.dataIndex];
                },
                // align: "top",
                // anchor: "center",
                // offset: 25,
                // padding: -2,
                // clip: false,
              },
              legend: {
                position: "top",
                labels: {
                  usePointStyle: true,
                  pointStyle: "circle",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DoughnutChart;
