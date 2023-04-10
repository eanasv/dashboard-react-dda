import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import MultiSelectDropdown from "../../../components/dropDown/MultiSelectDropDown";
import EntityBox from "../../../components/entityBox/EntityBox";
import FilterSection from "../../../components/filterSection/FilterSection";
import { allEmployeeDetails, mainEntity } from "../../../service/Constants";
import { EntityDetails } from "../../entityDetails/EntityDetails";
import { EntityList } from "../../entityList/EntityList";
import "../Tabs.css";

export const Tab2 = () => {
  let match = useRouteMatch();
  let history = useHistory();
  const { path, url } = useRouteMatch();

  const [updatedEmployeeDetails, setupdatedEmployeeDetails] =
    useState<any>(allEmployeeDetails);
  const [updatedEntityList, setupdatedEntityList] = useState<any>(mainEntity);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const handleEntityClick = (name) => {
    setSelectedEntity(name);
  };

  const backButtonClicked = () => {
    setSelectedEntity(null);
  };
  if (selectedEntity) {
    return (
      <EntityDetails
        entityName={selectedEntity}
        backButtonClicked={backButtonClicked}
      />
    );
  } else {
    return <EntityList onEntityClick={handleEntityClick} />;
  }
};
