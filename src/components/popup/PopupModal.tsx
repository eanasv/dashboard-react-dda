import React, { useEffect, useState } from "react";
import "./PopupModal.css";
import ProgressCircle from "../progressCircle/ProgressCircle";
import { getSkillPercentage } from "../../service/Service";
import ProgressBar from "../progressCircle/ProgressBar";
import JobChart from "../Graph/jobChart/JobChart";
import Score from "../score/Score";

const PopupModal = (props) => {
  const [skillProgressValue, setskillProgressValue] = useState<any>(0);
  const [expandedRows, setExpandedRows] = useState({ technical: [], soft: [] });

  useEffect(() => {
    getSkillValue();
  }, []);

  const getSkillValue = async () => {
    var result = await getSkillPercentage(props.employeDetails.skills);
    setskillProgressValue(result);
  };

  const getAchievedStatus = (name) => {
    const item = props.employeDetails?.skills.find((obj) => obj.name === name);
    return item ? item.achievedStatus : "";
  };

  const getEnrollmentStatus = (name) => {
    const item = props.employeDetails?.trainingNeeds.find(
      (obj) => obj.linkedCompetency === name
    );
    return item ? item.courses : "";
    //return item;
  };

  // const toggleAccordionRow = (index) => {
  //   // if (expandedRows.includes(index)) {
  //   //   setExpandedRows(expandedRows.filter((row) => row !== index));
  //   // } else {
  //   //   setExpandedRows([...expandedRows, index]);
  //   // }
  // }
  const toggleAccordionRow = (index, tableType) => {
    setExpandedRows((prevState) => {
      const updatedRows = { ...prevState };
      if (updatedRows[tableType].includes(index)) {
        updatedRows[tableType] = updatedRows[tableType].filter(
          (row) => row !== index
        );
      } else {
        updatedRows[tableType] = [...updatedRows[tableType], index];
      }
      return updatedRows;
    });
  };

  return (
    <div className="popup-overlay" onClick={props.closeModal}>
      <div className="modal">
        <button className="close" onClick={props.closeModal}>
          &times;
        </button>
        <div className="flex-box">
          <div className="header flex-header">
            {" "}
            {props.employeDetails.name}{" "}
          </div>
        </div>
        <div className="score-div">
          <Score score={props.employeDetails.employeeSkill} />
        </div>
        <JobChart item={props.employeDetails.subcategories} />
        <div className="modal-content">
          {" "}
          <div className="popup-main-container">
            {/* <div className="full-width">
              <div className="items">
                <div className="first-item">Category</div>:
                <div className="second-item uppercase">
                  {props.employeDetails.category}
                </div>
              </div>
              <div className="items">
                <div className="first-item">subCategory</div>:
                <div className="second-item">
                  {props.employeDetails.subCategory}
                </div>
              </div>
              <div className="items">
                <div className="first-item">Job Role</div>:
                <div className="second-item">{props.employeDetails.job}</div>
              </div>
            </div> */}
            <div className="skill-progress">
              {/* <ProgressCircle
                progress={props.employeDetails.employeeSkill}
                size={90}
                strokeWidth={3}
                circleOneStroke="white"
                circleTwoStroke="#2b6cb0"
                reverse="false"
              /> */}
            </div>
          </div>
          {/* <div className="popup-skill-container">
            <div className="skill-full-width">
              <div className="skill-items">
                <div className="flex">
                  <div className="first-item skill-heading">technical</div>
                  <div className="first-item skill-heading">Soft</div>
                </div>
                <div className="skill-item-container">
                  <div>
                    {props.employeDetails?.technicalSkills?.map(
                      (item, index) => (
                        <span
                          className="items"
                          key={index}
                          style={{
                            color:
                              getAchievedStatus(item) === "Achieved"
                                ? "green"
                                : "red",
                          }}
                        >
                          {item}{" "}
                          {getEnrollmentStatus(item) &&
                            `(${getEnrollmentStatus(item)})`}
                        </span>
                      )
                    )}
                  </div>

                  <div className="skill-item-container">
                    <div>
                      {props.employeDetails?.softSkills?.map((item, index) => (
                        <span
                          className="items"
                          key={index}
                          style={{
                            color:
                              getAchievedStatus(item) === "Achieved"
                                ? "green"
                                : "red",
                          }}
                        >
                          {item}{" "}
                          {getEnrollmentStatus(item) &&
                            `(${getEnrollmentStatus(item)})`}
                        </span>
                      ))}
                    </div>
                  </div>

                 
                </div>
              </div>
            </div>
          </div> */}
          <br />
          <div className="two-table-container">
            <div className="first-table">
              <table className="table">
                <thead>
                  <tr className="each-column-border">
                    <th className="each-column-border">Technical Skill</th>
                    <th className="each-column-border">Status</th>
                    <th className="each-column-border">Training</th>
                  </tr>
                </thead>
                <tbody>
                  {props.employeDetails?.technicalSkills?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr
                        key={index}
                        // className={index % 2 === 0 ? "even-row" : "odd-row"}
                      >
                        <td className="each-column-border">{item}</td>
                        <td
                          className="each-column-border"
                          style={{
                            backgroundColor:
                              getAchievedStatus(item) === "Achieved"
                                ? "green"
                                : "red",
                          }}
                        ></td>
                        <td
                          className="each-column-border"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAccordionRow(index, "technical");
                          }}
                        >
                          {/* {getEnrollmentStatus(item) && (
                            <span>{getEnrollmentStatus(item)}</span>
                          )} */}
                          {getEnrollmentStatus(item) ? "click here" : ""}
                        </td>
                      </tr>
                      {expandedRows.technical.includes(index) && (
                        <tr
                          className={`accordion-content ${
                            expandedRows.technical.includes(index) ? "open" : ""
                          }`}
                        >
                          <td colSpan={4}>
                            {getEnrollmentStatus(item) && (
                              <span>
                                {getEnrollmentStatus(item).map(
                                  (item, index) => (
                                    <div className="flex-box">
                                      <div className="bold-text">
                                        {index + 1 + "  . "}
                                      </div>
                                      <div className="course-list">
                                        {item.course}
                                      </div>
                                    </div>
                                  )
                                )}
                              </span>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="first-table">
              <table className="table">
                <thead>
                  <tr>
                    <th className="each-column-border">Soft Skill</th>
                    <th className="each-column-border">Status</th>
                    <th className="each-column-border">Training</th>
                  </tr>
                </thead>
                <tbody>
                  {props.employeDetails?.softSkills?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr
                        key={index}
                        // className={index % 2 === 0 ? "even-row" : "odd-row"}
                      >
                        <td className="each-column-border">{item}</td>
                        <td
                          style={{
                            backgroundColor:
                              getAchievedStatus(item) === "Achieved"
                                ? "green"
                                : "red",
                          }}
                        ></td>
                        <td
                          className="each-column-border"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAccordionRow(index, "soft");
                          }}
                        >
                          {/* {getEnrollmentStatus(item) && (
                          <span>{getEnrollmentStatus(item)}</span>
                        )} */}
                          {getEnrollmentStatus(item) ? "click here" : ""}
                        </td>
                      </tr>
                      {expandedRows.soft.includes(index) && (
                        <tr
                          className={`accordion-content ${
                            expandedRows.soft.includes(index) ? "open" : ""
                          }`}
                        >
                          <td colSpan={4}>
                            {getEnrollmentStatus(item) && (
                              <span>
                                {getEnrollmentStatus(item).map(
                                  (item, index) => (
                                    <div className="flex-box">
                                      <div className="bold-text">
                                        {index + 1 + "  . "}
                                      </div>
                                      <div className="course-list">
                                        {item.course}
                                      </div>
                                    </div>
                                  )
                                )}
                              </span>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>{" "}
        {/* <div className="second-item">
                        <ProgressBar score={item.score} />
                      </div> */}
        <div className="actions">
          <button className="button" onClick={() => {}}>
            close modal
          </button>
        </div>
      </div>
    </div>
  );
  //     <Popup trigger={<button className="button"> Open Modal </button>} modal>
  //       <span> Modal content </span>
  //     </Popup>
  //   );
};

export default PopupModal;
