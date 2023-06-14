import React, { useEffect, useState } from "react";
import { DateRangeFilter } from "../../../components/dateRangeFilter/DateRangeFilter";
import DropDown from "../../../components/dropDown/DropDown";
import TestChart from "../../../components/Graph/TestChart";
import { getHttp } from "../../../service/APIRequest";
import "../Tabs.css";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import { Chart3 } from "./Chart3";
import { Chart4 } from "./Chart4";
import { SummaryTable } from "./SummaryTable";

const Tab3 = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartOneData, setchartOneData] = useState();
  const [entityListForDropDown, setentityListForDropDown] = useState();
  const [chart3Data, setchart3Data] = useState();
  const [selectedItemDropdown, setselectedItemDropdown] = useState([]);
  const [summaryData, setsummaryData] = useState([]);

  const [data, setData] = useState("");

  const handleDataChange = (newData) => {
    setData(newData);
  };

  useEffect(() => {
    getEntityList();
    // drawBarChart(startDate, endDate);
  }, []);

  useEffect(() => {}, [startDate, endDate]);

  const getEntityList = async () => {
    const response = await getHttp("entity/getNameDetails");
    await setentityListForDropDown(response);
    await setselectedItemDropdown(response?.map((item) => item.label));
  };

  const fetchChartData = (data) => {
    if (data) {
      setchartOneData(data);
    } else {
      setchartOneData(null);
    }
    //}, 11);
  };

  const handleChangeValue = (data) => {
    setchartOneData(null);
    setselectedItemDropdown(data?.map((item) => item.label));
    console.log(data.length);
    if (data.length == 1) {
    }
  };

  // const drawLineChart = async (startDateParam, endDateParam) => {
  //   fetchDates(startDateParam, endDateParam);
  //   if (startDateParam && endDateParam) {
  //     const response = await getHttp("skills/companyAverageScore", {
  //       startDate: startDateParam,
  //       endDate: endDateParam,
  //     });
  //     fetchChartData(response);

  //     return { startDate, endDate };
  //   }
  //   return null;
  // };

  // const drawBarChart = async (startDateParam, endDateParam) => {
  //   const response = await getHttp("skills/skill-ranks", {
  //     startDate: startDateParam,
  //     endDate: endDateParam,
  //   });
  //   // setTimeout(() => {
  //   setchart3Data(response);
  //   // }, 11);
  // };

  const fetchDates = (fromDate, toDate) => {
    setStartDate(fromDate);
    setEndDate(toDate);
  };

  const fetchChart4Data = (data) => {
    //setsummaryData(data);
    // console.log(data.map((item) => item.companyName));
  };

  return (
    <div>
      <div className="main-heading">Digital skills historical scoring</div>
      <div className="tab3-filter-container">
        <DropDown
          mainList={entityListForDropDown}
          name="Entity"
          onChangeDropDownItem={handleChangeValue}
          isMulti={true}
        />
        <DateRangeFilter
          fetchChartData={fetchChartData}
          fetchDates={fetchDates}
          selectedEntityList={selectedItemDropdown}
          entityList={entityListForDropDown}
        />
      </div>
      <div className="tab3-contentainer">
        <div className="tab3-first-row">
          <div className="flex-box-chart1">
            <Chart1 data={chartOneData} />
          </div>
          <div className="flex-box-chart2">
            <Chart2
              startDate={startDate}
              endDate={endDate}
              entityListForDropDown={entityListForDropDown}
            />
          </div>
        </div>
        <div className="tab3-sec-row">
          <div className="flex-box-chart1">
            <Chart3
              startDate={startDate}
              endDate={endDate}
              selectedEntityList={selectedItemDropdown}
              entityList={entityListForDropDown}
              //fetchChart3Data={fetchChart3Data}
            />
          </div>
          <div className="flex-box-chart2">
            <Chart4
              selectedEntityList={selectedItemDropdown}
              entityList={entityListForDropDown}
              fetchChart4Data={fetchChart4Data}
            />
          </div>
        </div>
        {/* {summaryData && ( */}
        <div className="summary-table">
          <div className="summary-text">Summary</div>
          <SummaryTable entityList={entityListForDropDown} />
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Tab3;
