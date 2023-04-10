import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "../Chart.css";

interface radialChartInterface {
  details?: any;
  heading: String;
}

const RadialBarChart: React.FC<radialChartInterface> = ({
  details,
  heading,
}) => {
  const [display, setDisplay] = useState(false);
  const data = {
    options: {
      labels: details?.map((item) => item.category),
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        //position: "top",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "60%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: true,
            },
            value: {
              show: true,
            },
          },
        },
      },
      //   legend: {
      //     show: true,
      //     showForSingleSeries: false,
      //     showForNullSeries: true,
      //     showForZeroSeries: true,
      //     position: "bottom",
      //     horizontalAlign: "center",
      //     floating: false,
      //     fontSize: "14px",
      //     fontFamily: "Helvetica, Arial",
      //     fontWeight: 400,
      //     formatter: undefined,
      //     inverseOrder: false,
      //     width: undefined,
      //     height: undefined,
      //     tooltipHoverFormatter: undefined,
      //     customLegendItems: [],
      //     offsetX: 0,
      //     offsetY: 0,
      //     labels: {
      //       colors: undefined,
      //       useSeriesColors: false,
      //     },
      //     markers: {
      //       width: 12,
      //       height: 12,
      //       strokeWidth: 0,
      //       strokeColor: "#fff",
      //       fillColors: undefined,
      //       radius: 12,
      //       customHTML: undefined,
      //       onClick: undefined,
      //       offsetX: 0,
      //       offsetY: 0,
      //     },
      //     itemMargin: {
      //       horizontal: 5,
      //       vertical: 0,
      //     },
      //     onItemClick: {
      //       toggleDataSeries: true,
      //     },
      //     onItemHover: {
      //       highlightDataSeries: true,
      //     },
      //   },
    },
    series: details?.map((item) => item.count),
  };

  useEffect(() => {
    setTimeout(() => setDisplay(true), 100);
  }, []);

  if (!display) {
    return <></>;
  }
  return (
    <div className="mixed-chart">
      <div className="radialHeading" hidden={details?.length <= 0}>
        {heading}
      </div>
      <Chart
        options={data.options}
        series={data.series}
        type="radialBar"
        width="500"
      />
    </div>
  );
};

export default RadialBarChart;
