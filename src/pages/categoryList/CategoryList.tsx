import React, { useEffect, useState } from "react";
//import Table1 from "../../components/compass/Table1";
import Doughnut from "../../components/Graph/donutChart/Doughnut";
//import Doughnut from "../Graph/donutChart/Doughnut";

import { getHttp } from "../../service/APIRequest";
import { catOne, catThree, catTwo } from "../../service/Constants";

const CategoryList = ({ categoryClick }) => {
  const [mainCategoryListByCount, setMainCategoryListByCount] = useState<any>(
    []
  );
  const [subcategoryLevelList1, setsubcategoryLevelList1] = useState([]);
  const [subcategoryLevelList2, setsubcategoryLevelList2] = useState([]);
  const [subcategoryLevelList3, setsubcategoryLevelList3] = useState([]);
  const [overAllCountOfEmpl, setoverAllCountOfEmpl] = useState(null);

  useEffect(() => {
    fetchCatagoryList();
  }, []);
  var levelArray = new Array(9).fill(0);

  const fetchCatagoryList = async (param?) => {
    const response = await getHttp("count-by-category");
    setMainCategoryListByCount(response);
    fetchCatagoryLevelList(1);
  };

  const goToCategoryDetailsPage = (id, item?) => {
    categoryClick(id, item);
  };

  var count = 0;

  const fetchCatagoryLevelList = (param?) => {
    const response = getHttp("categories/" + param + "/subcategories")
      .then((response) => {
        //console.log(response);
        if (param == 1) {
          setsubcategoryLevelList1(response); // handle success console.log(overAllCountOfEmpl);
          // setoverAllCountOfEmpl(overAllCountOfEmpl + response[0].grantTotalEmp);
          //setoverAllCountOfEmpl(response[0].grantTotalEmp);
          count = count + response[0].grantTotalEmp;
          fetchCatagoryLevelList(2);
        } else if (param == 2) {
          setsubcategoryLevelList2(response);
          // console.log(overAllCountOfEmpl);
          // setoverAllCountOfEmpl(
          //   (prevCount) => prevCount + response[0].grantTotalEmp
          // );
          count = count + response[0].grantTotalEmp;
          fetchCatagoryLevelList(3);
        } else {
          setsubcategoryLevelList3(response);
          // console.log(overAllCountOfEmpl);
          // setoverAllCountOfEmpl(
          //   (prevCount) => prevCount + response[0].grantTotalEmp
          // );
          count = count + response[0].grantTotalEmp;
          setoverAllCountOfEmpl(count);
        }
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

  const totalCount =
    subcategoryLevelList1.reduce((sum, item) => sum + item.count, 0) +
    subcategoryLevelList2.reduce((sum, item) => sum + item.count, 0) +
    subcategoryLevelList3.reduce((sum, item) => sum + item.count, 0);

  //console.log(totalCount);

  return (
    <div className="main-container">
      <div className="main-heading">Dubai Digital Skills</div>
      <div className="seperate-employee-counter">
        {mainCategoryListByCount?.map((item, index) => (
          <div
            className="each-counter"
            key={index}
            onClick={() => goToCategoryDetailsPage(item.id, item)}
          >
            <div>{item.category}</div>
            <div className="counter-details">
              <div># of employees </div>
              <div className="count"> {item?.count}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="content">
        <Doughnut
          details={mainCategoryListByCount}
          heading="Dubai Skills %"
          showLegend={true}
        />
      </div>
      <div className="list-container">
        <table className="table">
          <thead>
            <tr>
              <th className="each-column-border">Category name</th>
              <th className="each-column-border">Subcategory name</th>

              {levelArray.map((item, index) => (
                <th key={index} className="each-column-border">
                  Level {index + 1}
                </th>
              ))}
              <th className="each-column-border">
                # of employees( {subcategoryLevelList1[0]?.grantTotalEmp})
              </th>
              <th className="each-column-border">Group</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            <td
              className="each-column-border"
              rowSpan={subcategoryLevelList1.length + 1}
            >
              Data Analytics
            </td>
            {subcategoryLevelList1?.map((item, index) => (
              // {catOne?.map((item, index) => (
              <tr
                key={index}
                // className={index % 2 === 0 ? "even-row" : "odd-row"}
                // className={selectedRow === index ? "highlight" : ""}
                // onClick={() => clickedOnSubcategory(item, index)}
              >
                <td className="each-column-border">{item.category}</td>
                {item.levelCounts.map((count, num) => (
                  <td key={num} className="each-column-border">
                    {count == 0 ? "" : count}
                  </td>
                ))}
                <td className="each-column-border">{item.count}</td>
                {index === 0 ? (
                  <td
                    rowSpan={subcategoryLevelList1.length}
                    className="each-column-border"
                  >
                    {subcategoryLevelList1.reduce(
                      (sum, item) => sum + item.count,
                      0
                    )}
                    {/* {catOne.reduce((sum, item) => sum + item.count, 0)} */}
                  </td>
                ) : null}
              </tr>
            ))}
            <td
              className="each-column-border"
              rowSpan={subcategoryLevelList3.length + 1}
            >
              Cyber security
            </td>
            {/* {catThree?.map((item, index) => ( */}
            {subcategoryLevelList3?.map((item, index) => (
              <tr
                key={index}
                // className={index % 2 === 0 ? "even-row" : "odd-row"}
                // className={selectedRow === index ? "highlight" : ""}
                // onClick={() => clickedOnSubcategory(item, index)}
              >
                <td className="each-column-border">{item.category}</td>
                {item.levelCounts.map((count, num) => (
                  <td key={num} className="each-column-border">
                    {count == 0 ? "" : count}
                  </td>
                ))}
                <td className="each-column-border">{item.count}</td>
                {index === 0 ? (
                  <td
                    rowSpan={subcategoryLevelList3.length}
                    className="each-column-border"
                  >
                    {/* {catThree.reduce((sum, item) => sum + item.count, 0)} */}
                    {subcategoryLevelList3.reduce(
                      (sum, item) => sum + item.count,
                      0
                    )}
                  </td>
                ) : null}
              </tr>
            ))}
            <td
              className="each-column-border"
              rowSpan={subcategoryLevelList2.length + 1}
            >
              ICT
            </td>
            {/* {catTwo?.map((item, index) => ( */}
            {subcategoryLevelList2?.map((item, index) => (
              <tr
                key={index}
                // className={index % 2 === 0 ? "even-row" : "odd-row"}
                // className={selectedRow === index ? "highlight" : ""}
                // onClick={() => clickedOnSubcategory(item, index)}
              >
                <td className="each-column-border">{item.category}</td>
                {item.levelCounts.map((count, num) => (
                  <td key={num} className="each-column-border">
                    {count == 0 ? "" : count}
                  </td>
                ))}
                <td className="each-column-border">{item.count}</td>
                {index === 0 ? (
                  <td
                    rowSpan={subcategoryLevelList2.length}
                    className="each-column-border"
                  >
                    {/* {catTwo.reduce((sum, item) => sum + item.count, 0)} */}
                    {subcategoryLevelList2.reduce(
                      (sum, item) => sum + item.count,
                      0
                    )}
                  </td>
                ) : null}

                {/* Render grand total cell only for the last row */}
                {/* Render cell only for the last row and last column */}
              </tr>
            ))}
            <tr>
              {/* <td className="each-column-border" colSpan={5}></td> */}
              <td className="each-column-border" colSpan={11}></td>
              <td className="each-column-border">{"grandTotal"}</td>
              <td className="each-column-border" colSpan={4}>
                {totalCount}
              </td>
            </tr>
          </tbody>
        </table>
        {}
      </div>
    </div>
  );
};

export default CategoryList;
