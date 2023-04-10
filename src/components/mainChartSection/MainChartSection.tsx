import React, { useEffect, useState } from "react";
import { getHttp } from "../../service/APIRequest";
import { chartDetails } from "../../service/Constants";
import DonutChart from "../Graph/donutChart/DonutChart";
import DoughnutChart from "../Graph/donutChart/Doughnut";
import Doughnut from "../Graph/donutChart/Doughnut";
import RadialBarChart from "../Graph/donutChart/RadialBarChart";
import TestChart from "../Graph/TestChart";
import "./MainChartSection.css";

export const MainChartSection = () => {
  const [mainCategoryListByCount, setMainCategoryListByCount] = useState<any>();

  useEffect(() => {
    fetchCatagoryList();
  }, []);

  async function fetchCatagoryList(param?) {
    const response = await getHttp("count-by-category");
    await setMainCategoryListByCount(response);
  }

  return (
    <div className="main-container">
      <div className="main-heading">Dubai Digital Skills</div>
      <div className="seperate-employee-counter">
        {mainCategoryListByCount?.map((item, index) => (
          <div className="each-counter" key={index}>
            <div>{item.category}</div>
            <div className="counter-details">
              <div># of employees </div>
              <div className="count"> {item?.count}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="content">
        {/* <TestChart />{" "} */}
        <DonutChart
          //details={chartDetails.data_analytics}
          details={mainCategoryListByCount}
          heading="Dubai Skills %"
        />
        {/* <TestChart /> */}
      </div>
    </div>
  );
};
