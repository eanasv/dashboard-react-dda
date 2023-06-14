import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "../Chart.css";

interface BarChartInterface {
  data;
  xAxis;
  title;
  name?;
  width?: any;
}

export const BarChart: React.FC<BarChartInterface> = ({
  data,
  xAxis,
  title,
  name,
  width,
}) => {
  const [dataSeries, setdataSeries] = useState<any>([
    {
      name: title, //will be displayed on the y-axis
      data: data,
    },
  ]);
  //const [dataSeries, setDataSeries] = useState(data);
  const [option, setOption] = useState<any>({
    legend: {
      show: false,
    },
    xaxis: {
      categories: xAxis,
    },
    title: {
      text: title,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "Bukra",
        color: "red",
      },
    },
    plotOptions: {
      bar: {
        columnWidth: 50,
        colors: {
          ranges: [
            {
              from: -100,
              to: 0,
              color: "#b70849",
            },
            {
              from: 0,
              to: 100,
              color: "#1034a6",
            },
          ],
        },
      },
    },
    // dataLabels: {
    //   enabled: true,
    //   formatter: function (val, opts) {
    //     const isPositive = val >= 0;
    //     return isPositive && type == "progress" ? `+${val}` : val.toString();
    //   },
    // },
    yaxis: {
      forceNiceScale: true,
      labels: {
        formatter: function (val) {
          return Math.round(val);
        },
      },
    },
  });

  useEffect(() => {
    if (data) {
      setdataSeries([
        {
          name: name,
          data: data,
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    //setdataSeries(data);
    //if (data) {
    //const categories = data.map((item) => item);
    setOption((prevState) => ({
      ...prevState,
      title: {
        text: title,
      },
      xaxis: {
        categories: xAxis,
      },
    }));

    //
    //}
  }, [xAxis]);
  return (
    <div className="bar-chart">
      <Chart
        options={option}
        series={dataSeries}
        type="bar"
        height={350}
        width={width ? 550 : "100%"}
      />
    </div>
  );
};
