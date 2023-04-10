import React, { useEffect, useState } from "react";

import EntityBox from "../../components/entityBox/EntityBox";
import FilterSection from "../../components/filterSection/FilterSection";
import { getHttp } from "../../service/APIRequest";

export const EntityList = (props) => {
  const [updatedAllEntityList, setupdatedAllEntityList] = useState<any>();
  const [entityListForDropDown, setentityListForDropDown] = useState<any>();

  useEffect(() => {
    getEntityList();
  }, []);

  useEffect(() => {}, []);

  const getEntityList = async () => {
    const response = await getHttp("entity/getAll");
    await setupdatedAllEntityList(response);
    setentityListForDropDown(response);
  };

  const changeDisplaySetData = (data) => {
    setupdatedAllEntityList(data);
  };

  const goToEntityDetails = (entityName) => {
    props.onEntityClick(entityName);
  };
  return (
    <div>
      <FilterSection
        onSelectedValueChange={changeDisplaySetData}
        allEntities={entityListForDropDown}
      />

      <div className="entity-container">
        {updatedAllEntityList?.map((item, index) => (
          <div
            key={index}
            className="each-entity-container"
            onClick={() => goToEntityDetails(item.label)}
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
  );
};
