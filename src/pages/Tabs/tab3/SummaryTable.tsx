import React, { useEffect, useState } from "react";
import { getHttp } from "../../../service/APIRequest";

interface SummaryTableInterface {
  entityList;
}
export const SummaryTable: React.FC<SummaryTableInterface> = ({
  entityList,
}) => {
  const [summaryData, setsummaryData] = useState([]);
  // const [allEntityList, setallEntityList] = useState([]);
  const [allEntityList, setallEntityList] = useState(entityList);

  useEffect(() => {
    // setsummaryData(data);
    setallEntityList(entityList);
    getRankBasedonLatestSCore();
  }, [entityList]);

  useEffect(() => {}, []);

  const getRankBasedonLatestSCore = () => {
    if (entityList?.length > 0) {
      var entityLists = entityList?.map((item) => item.label);
      getHttp("skills/latestScore", {
        entityNames: entityLists.join(","),
      })
        .then((response) => {
          // Check if the original array has less than 10 elements
          if (response.length < 10) {
            // If it does, copy the whole array to the new array
            setsummaryData(response);
          } else {
            // If it has 10 or more elements, copy the first 5 and last 5 elements to the new array

            setsummaryData([...response.slice(0, 5), ...response.slice(-5)]);
          }
          // setsummaryData(response);
          //fetchChart4Data(response);
          // handle success
        })
        .catch((error) => {
          console.log(error);
          // handle error
        });
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="each-column-border">Rank </th>
            <th className="each-column-border">Entity Name</th>
          </tr>
        </thead>
        <tbody>
          {summaryData?.map((item, index) => (
            <tr key={index}>
              <td className="each-column-border">{index + 1}</td>
              <td className="each-column-border">{item.companyName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
