import React from "react";
import "./EntityBox.css";
//import pic from ".assets/rta.png";

interface entityDetails {
  name?: String;
  logo?: String;
  totalEntityScore?: any;
}
const EntityBox: React.FC<entityDetails> = (entityDetails) => {
  return (
    <div className="each-entity-box">
      <div className="entity-logo">
        <img
          //src={require(`../../assets/${entityDetails.logo}`)}
          src={`data:image/png;base64,${entityDetails.logo}`}
          alt=""
          //   width="50%"
          //   height="50%"
        />
      </div>
      <div className="entity-name">{entityDetails.name}</div>
      <div
        className={[
          "entity-score",
          entityDetails.totalEntityScore >= 80
            ? "green-value"
            : 79 > entityDetails.totalEntityScore &&
              entityDetails.totalEntityScore > 60
            ? "orange-value"
            : "red-value",
        ].join(" ")}
      >
        {entityDetails.totalEntityScore ? entityDetails.totalEntityScore : 0} %
      </div>
    </div>
  );
};
export default EntityBox;
