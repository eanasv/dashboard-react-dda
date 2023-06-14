import React, { useEffect, useState } from "react";
import "./JobChart.css";

interface JobChartInterface {
  item?: any;
}

export const JobChart: React.FC<JobChartInterface> = ({ item }) => {
  const [headingArray, setHeadingArray] = useState(item);

  useEffect(() => {
    setHeadingArray(item);
  }, [item]);

  return (
    // <div className="flowchart">
    //   <div className="box">a</div>
    //   <div className="arrow"></div>
    //   <div className="box">b</div>
    //   <div className="arrow"></div>
    //   <div className="box">c</div>
    //   <div className="arrow"></div>
    //   <div className="box">d</div>
    //   <div className="arrow"></div>
    //   <div className="box">e</div>
    //   <div className="arrow"></div>
    //   <div className="box">f</div>
    //   <div className="arrow"></div>
    //   <div className="box">g</div>
    // </div>
    // <div className="flowchart">
    //   <div className="box">a</div>
    //   <div className="arrow"></div>
    //   <div className="box">b</div>
    //   <div className="arrow"></div>
    //   <div className="box">c</div>
    //   <div className="box-with-arrows">
    //     <div className="arrow-outside">
    //       <div className="arrow"></div>
    //       <div className="box">d</div>
    //       <div className="arrow"></div>
    //       <div className="box">e</div>
    //     </div>
    //     <div className="arrow-outside">
    //       <div className="arrow"></div>
    //       <div className="box">f</div>
    //       <div className="arrow"></div>
    //       <div className="box">g</div>
    //     </div>
    //   </div>
    // </div>

    // <div className="flowchart">
    //   <div className="box">a</div>
    //   <div className="arrow"></div>
    //   <div className="box">b</div>
    //   <div className="arrow"></div>
    //   <div className="box">c</div>
    //   <div className="arrow-outside">
    //     <div className="arrow"></div>
    //     <div className="box">d</div>
    //     <div className="arrow"></div>
    //     <div className="box">e</div>
    //   </div>
    //   <div className="arrow-outside">
    //     <div className="arrow"></div>
    //     <div className="box">f</div>
    //     <div className="arrow"></div>
    //     <div className="box">g</div>
    //   </div>
    //   <div className="arrow-inside">
    //     <div className="arrow"></div>
    //   </div>
    //   <div className="arrow-inside">
    //     <div className="arrow"></div>
    //   </div>
    // </div>
    <div id="flowBoxes" className="flowchart">
      {/* x */}

      {/* <div className="left right">Varianten</div>
      <div className="left right">Bedrukkingen</div>
      <div className="left">Bevestiging</div> */}

      <div className="bar">
        {headingArray.map((item, index) => (
          <div className={`bar-step ${item.active ? "active" : ""}`}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobChart;
