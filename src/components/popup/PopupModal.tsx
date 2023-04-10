import React, { useEffect, useState } from "react";
import "./PopupModal.css";
import ProgressCircle from "../progressCircle/ProgressCircle";
import { getSkillPercentage } from "../../service/Service";
import ProgressBar from "../progressCircle/ProgressBar";

const PopupModal = (props) => {
  const [skillProgressValue, setskillProgressValue] = useState<any>(0);

  useEffect(() => {
    getSkillValue();
  }, []);

  const getSkillValue = async () => {
    var result = await getSkillPercentage(props.employeDetails.skills);
    setskillProgressValue(result);
  };

  return (
    <div className="popup-overlay" onClick={props.closeModal}>
      <div className="modal">
        <button className="close" onClick={props.closeModal}>
          &times;
        </button>
        <div className="header"> {props.employeDetails.employeeNumber} </div>
        <div className="modal-content">
          {" "}
          <div className="popup-main-container">
            <div className="full-width">
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
            </div>
            <div className="skill-progress">
              <ProgressCircle
                progress={props.employeDetails.skillToTalPercentage}
                size={90}
                strokeWidth={3}
                circleOneStroke="white"
                circleTwoStroke="#2b6cb0"
                reverse="false"
              />
            </div>
          </div>
          <div className="popup-skill-container">
            <div className="skill-full-width">
              <div className="skill-items">
                <div className="first-item skill-heading">Skills</div>
                <div className="skill-item-container">
                  {props.employeDetails.skills.map((item, index) => (
                    <div className="items" key={index}>
                      <div className="skill-first-item">{item.name}</div>:
                      <div className="second-item">{item.score}</div>
                      <div className="second-item">
                        <ProgressBar score={item.score} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>

        <div className="actions">
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
            }}
          >
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
