import React, { useEffect, useState } from "react";
import { getHttp } from "../../service/APIRequest";
import "./DropDown.css";
import Select from "react-select";

interface dropDownType {
  onChangeDropDownItem?: any;
  mainList?: any;
  name?: String;
}
const DropDown: React.FC<dropDownType> = ({
  onChangeDropDownItem,
  mainList,
  name,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(mainList);

  useEffect(() => {
    setSelectedOptions(mainList);
  }, [mainList]);

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
    onChangeDropDownItem(data);
    console.log(data);
  }

  return (
    <div>
      <div className="app">
        <div>Choose {name}</div>
        <div className="dropdown-container">
          <Select
            options={mainList}
            isMulti
            placeholder={`Select ${name}`}
            onChange={handleSelect}
            isSearchable={true}
          />
        </div>
      </div>
    </div>
  );
};
export default DropDown;
