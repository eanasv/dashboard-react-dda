import React, { useEffect, useState } from "react";

import DropDown from "../dropDown/DropDown";
import "./FilterSection.css";

interface filterSectionProps {
  onSelectedValueChange: any;
  allEntities;
}

const FilterSection: React.FC<filterSectionProps> = ({
  onSelectedValueChange,
  allEntities,
}) => {
  const [entityList, setentityList] = useState(allEntities);

  useEffect(() => {
    setentityList(allEntities);
  }, [allEntities]);

  const handleChangeValue = (data) => {
    if (data.length === 0) {
      //setentityList(mainEntity);
      onSelectedValueChange(entityList);
    } else {
      onSelectedValueChange(data);
    }
  };

  return (
    <div className="all-filter-container">
      <DropDown
        mainList={entityList}
        name="Entity"
        onChangeDropDownItem={handleChangeValue}
      />
    </div>
  );
};

export default FilterSection;
