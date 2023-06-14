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
  const [updatedEmployeeDetails, setupdatedEmployeeDetails] =
    useState<any>(allEmployeeDetails);
  const [updatedEntityList, setupdatedEntityList] = useState<any>(mainEntity);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const handleEntityClick = (name, value, image) => {
    setSelectedEntity({ name: name, scoreValue: value, logo: image });
    console.log(value);
  };

  const backButtonClicked = () => {
    setSelectedEntity(null);
  };
  if (selectedEntity) {
    return (
      <EntityDetails
        entity={selectedEntity}
        backButtonClicked={backButtonClicked}
      />
    );
  } else {
    return <EntityList onEntityClick={handleEntityClick} />;
  }
};
