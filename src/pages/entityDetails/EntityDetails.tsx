import React, { useEffect, useState } from "react";

import DonutChart from "../../components/Graph/donutChart/DonutChart";
import Doughnut from "../../components/Graph/donutChart/Doughnut";
import RadialBarChart from "../../components/Graph/donutChart/RadialBarChart";
import MyChart from "../../components/Graph/MyChart";
import PopupModal from "../../components/popup/PopupModal";
import ProgressCircle from "../../components/progressCircle/ProgressCircle";
import { getHttp } from "../../service/APIRequest";
import { getSkillPercentage } from "../../service/Service";
import "./EntityDetails.css";

export const EntityDetails = (props) => {
  const [entityDetails, setentityDetails] = useState<any>();
  //const [ColumnHeadingNameSet, setColumnHeadingNameSet] = useState([]);
  const [roleCount, setroleCount] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [thisEmployeeDetails, setthisEmployeeDetails] = useState();
  const [entityCatSkillSet, setentityCatSkillSet] = useState();

  function handleClick() {
    setShowPopup(!showPopup);
  }

  useEffect(() => {
    fetchEntityDetails();
    fetchRoleCountsInEntity();
    fetchSkillByCatInEntity();
  }, []);

  async function fetchEntityDetails() {
    const response = await getHttp("employees/" + props.entityName);
    var finalResult = [];
    for (var i = 0; i < response.length; i++) {
      response[i].skillToTalPercentage = getSkillPercentage(response[i].skills);
      finalResult.push(response[i]);
    }

    await setentityDetails(finalResult);
    console.log(response, await finalResult);
    //await getColumnHeading(response);
  }

  async function fetchRoleCountsInEntity() {
    const response = await getHttp(
      "entity/count-by-category/" + props.entityName
    );
    await setroleCount(response);
  }

  async function fetchSkillByCatInEntity() {
    const response = await getHttp(
      "skillByCatInEntity?entity=" + props.entityName
    );
    await setentityCatSkillSet(response);
  }

  // const getColumnHeading = (tableData) => {
  //   const newColumnHeadingNameSet = [];

  //   for (const key in tableData[0]) {
  //     newColumnHeadingNameSet.push(key);
  //   }

  //   setColumnHeadingNameSet(newColumnHeadingNameSet);
  // };

  const showThisEmployeeDetails = (employeeDetails) => {
    setShowPopup(true);
    setthisEmployeeDetails(employeeDetails);
  };

  return (
    <div className="enti-container">
      <div className="heading-cont">
        <div className="back-button" onClick={props.backButtonClicked}>
          <img
            src={require("../../assets/back.png")}
            alt=""
            width="50px"
            height="50px"
          />
        </div>
        <div className="heading">{props.entityName}</div>
      </div>

      {entityDetails?.length > 0 && (
        <div className="top-section">
          <div className="employeeList">
            <div className="employee-details-heading">Employee Details</div>
            <table className="table">
              <thead>
                <tr>
                  {/* <th
                    className="each-column-border"
                    //hidden={header === "entity"}
                  >
                    Number
                  </th> */}
                  {/* {ColumnHeadingNameSet?.map((header, number) => (
                    <th
                      key={header}
                      className="each-column-border"
                      //hidden={header === "entity"}
                    >
                      {header}
                    </th>
                  ))} */}
                  <th className="each-column-border">Emloyee Number</th>
                  <th className="each-column-border">Role</th>
                  <th className="each-column-border">Skill </th>
                  <th className="each-column-border">Details</th>
                </tr>
              </thead>
              <tbody>
                {entityDetails?.map((row, index) => (
                  <tr key={index} onClick={() => showThisEmployeeDetails(row)}>
                    {/* <td className="each-column-border">{index + 1}</td> */}
                    {/* {ColumnHeadingNameSet.map((header) => (
                      <td
                        key={header}
                        className="each-column-border"
                        //hidden={row[header].equalsIgnoreCase(props.entityName)}
                      >
                        {row[header]} 
                        
                      </td>
                    ))} */}

                    <td className="each-column-border">{row.employeeNumber}</td>
                    <td className="each-column-border">{row.job}</td>
                    <td className="each-column-border">
                      <ProgressCircle
                        progress={row.skillToTalPercentage}
                        size={60}
                        strokeWidth={3}
                        circleOneStroke="white"
                        circleTwoStroke="#2b6cb0"
                        reverse="false"
                      />
                    </td>
                    <td className="each-column-border">
                      {" "}
                      <img
                        src={require(`../../assets/eye.png`)}
                        alt=""
                        width="25px"
                        //   height="50%"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="donutDiv">
            <DonutChart
              //details={chartDetails.data_analytics}
              heading={props.entityName + " skills"}
              details={roleCount}
            />
            {/* <MyChart /> */}

            {showPopup && (
              <PopupModal
                employeDetails={thisEmployeeDetails}
                closeModal={() => setShowPopup(false)}
              />
            )}
          </div>
        </div>
      )}
      {/* <Doughnut
        //details={chartDetails.data_analytics}
        multiLayer={true}
        details={entityCatSkillSet}
        heading={props.entityName + " meet/not meet skills"}
      /> */}
      <RadialBarChart
        details={entityCatSkillSet}
        heading={props.entityName + " meet/not meet skills"}
      />
    </div>
  );
};
