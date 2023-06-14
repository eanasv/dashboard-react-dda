import React, { useEffect, useState } from "react";
import { BarChart } from "../../components/Graph/barChart/BarChart";
import Doughnut from "../../components/Graph/donutChart/Doughnut";
import { getHttp } from "../../service/APIRequest";
import "./CategoryDetails.css";

const CategoryDetails = ({ details, backButtonClicked }) => {
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [chartData, setchartData] = useState<any>();
  const [xAxis, setxAxis] = useState([]);
  const [barchartTitile, setbarchartTitile] = useState("");

  var levelArray = new Array(9).fill(0);

  useEffect(() => {
    fetchCatagoryList(details.id);
  }, []);

  const fetchCatagoryList = (param?) => {
    const response = getHttp("categories/" + details.id + "/subcategories")
      .then((response) => {
        //console.log(response);

        setSubCategoryList(response); // handle success
        setSelectedRow(0);
        clickedOnSubcategory(response[0], 0);
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

  const clickedOnSubcategory = async (item, index) => {
    item.count > 0 ? setSelectedRow(index) : setSelectedRow(index);
    const response = await getHttp(
      "categories/" + details.id + "/subcategory/" + item.id
    )
      .then((response) => {
        //console.log(response);
        setbarchartTitile(item.category);
        drawChart(response);

        // handle success
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

  async function drawChart(responseData?) {
    var xAxisdata = responseData?.map((item) => item.entityName);
    //setbarchartTitile(barchartTitile);
    setxAxis(xAxisdata);
    setchartData(responseData?.map((item) => item.employeeNumber));
  }

  return (
    <div className="top-padding-sub">
      <div className="back-button" onClick={backButtonClicked}>
        <img
          src={require("../../assets/back.png")}
          alt=""
          width="50px"
          height="50px"
        />
      </div>

      {details?.name.category}
      {details?.name.count > 0 && (
        <div className="chart-flex">
          <Doughnut
            heading={" skills (Number of employees in each category)"}
            details={subCategoryList}
            showLegend={false}
          />
        </div>
      )}
      {details?.name.count > 0 && (
        <div className="list-container">
          <table className="table">
            <thead>
              <tr>
                <th className="each-column-border">Subcategory name</th>

                {levelArray.map((item, index) => (
                  <th key={index} className="each-column-border">
                    Level {index + 1}
                  </th>
                ))}
                <th className="each-column-border">
                  # of employees( {subCategoryList[0]?.grantTotalEmp})
                </th>
              </tr>
            </thead>
            <tbody>
              {subCategoryList?.map((item, index) => (
                <tr
                  key={index}
                  className={[
                    // index % 2 === 0 ? "even-row" : "odd-row",
                    selectedRow === index ? "highlight" : "",
                  ].join(" ")}
                  onClick={() => clickedOnSubcategory(item, index)}
                >
                  <td className="each-column-border">{item.category}</td>
                  {item.levelCounts.map((count, num) => (
                    <td key={num} className="each-column-border">
                      {count == 0 ? "" : count}
                    </td>
                  ))}
                  <td className="each-column-border">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* <div className="content1">
        <Doughnut details={subCategoryList} heading="Dubai Skills %" />
      </div> */}
      {chartData && xAxis && (
        <div className="barChart">
          {/* <DonutChart
              //details={chartDetails.data_analytics}
              heading={props.entityName + " skills"}
              details={roleCount}
            /> */}
          {/* <Doughnut
          heading={" skills (Number of employees in each category)"}
          details={subCategoryList}
        /> */}
          <BarChart
            data={chartData}
            xAxis={xAxis}
            title={"Employee and entity details of  - " + barchartTitile}
            name="Number of employees"
          />
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
