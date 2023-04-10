import React, { useState } from "react";
import { useSelector } from "react-redux";
import Compass from "../../../components/compass/Compass";
import FilterSection from "../../../components/filterSection/FilterSection";
import GraphDashboard from "../../../components/Graph/GraphDashboard";
import HalfDonutChart from "../../../components/Graph/halfDonutChart/HalfDonutChart";
import HalfDonutChart1 from "../../../components/Graph/halfDonutChart/HalfDonutChart1";
import { MainChartSection } from "../../../components/mainChartSection/MainChartSection";
import Table from "../../../components/table/Table";
//import ReactLogo from "../assets/compass.svg";

function Home() {
  const [displayDataSet, setdisplayDataSet] = useState([]);
  const isLoading = useSelector((state: any) => state.loader.isLoading);
  const changeDisplaySetData = (data) => {
    setdisplayDataSet(data);
  };

  return (
    <div>
      {/* <FilterSection onSelectedValueChange={changeDisplaySetData} /> */}
      {/* <Table data={displayDataSet} /> */}
      {/* <GraphDashboard /> */}
      {/* <HalfDonutChart1 /> */}

      <MainChartSection />
    </div>
  );
}
export default Home;
