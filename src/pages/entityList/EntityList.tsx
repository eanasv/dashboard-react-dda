import React, { useEffect, useState } from "react";

import EntityBox from "../../components/entityBox/EntityBox";
import FilterSection from "../../components/filterSection/FilterSection";
import { getHttp } from "../../service/APIRequest";

export const EntityList = (props) => {
  const [updatedAllEntityList, setupdatedAllEntityList] = useState<any>();
  const [entityListForDropDown, setentityListForDropDown] = useState<any>();
  const [filterByName, setfilterByName] = useState("asc");

  useEffect(() => {
    getEntityList(filterByName);
  }, []);

  const getEntityList = async (filterByName?) => {
    const response = await getHttp("entity/getAll", { filter: filterByName });
    await setupdatedAllEntityList(response);
    //getDropdownEntityList();
    setentityListForDropDown(response);
  };
  //

  const getDropdownEntityList = async () => {
    const response = await getHttp("entity/getNameDetails");
    // await setupdatedAllEntityList(response);
    setentityListForDropDown(response);
  };

  const filterEntity = (filterBy, item) => {
    console.log(filterBy);
    if (item == "name")
      if (filterBy) {
        getEntityList("asc");
      } else {
        getEntityList("desc");
      }
    else {
      if (filterBy) {
        getEntityList("ascScore");
      } else {
        getEntityList("descScore");
      }
    }
  };

  const changeDisplaySetData = (data) => {
    setupdatedAllEntityList(data);
  };

  const goToEntityDetails = (entityName, score, logo) => {
    props.onEntityClick(entityName, score, logo);
  };
  return (
    <div>
      {!updatedAllEntityList ? (
        <div className="loader"></div>
      ) : (
        <div>
          <FilterSection
            onSelectedValueChange={changeDisplaySetData}
            allEntities={entityListForDropDown}
            changeFilter={filterEntity}
          />

          <div className="entity-container">
            {updatedAllEntityList?.map((item, index) => (
              <div
                key={index}
                className="each-entity-container"
                onClick={() =>
                  goToEntityDetails(
                    item.label,
                    Math.round(
                      updatedAllEntityList[index].totalSkillPercentage
                    ),
                    updatedAllEntityList[index].image
                  )
                }
              >
                <EntityBox
                  logo={updatedAllEntityList[index].image}
                  name={updatedAllEntityList[index].label}
                  totalEntityScore={Math.round(
                    updatedAllEntityList[index].totalSkillPercentage
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
