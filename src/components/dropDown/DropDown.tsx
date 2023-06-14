import React, { useEffect, useState } from "react";
import { getHttp } from "../../service/APIRequest";
import "./DropDown.css";
import Select from "react-select";

interface dropDownType {
  onChangeDropDownItem?: any;
  mainList?: any;
  name?: String;
  isMulti: boolean;
  value?: any;
}
const DropDown: React.FC<dropDownType> = ({
  onChangeDropDownItem,
  mainList,
  name,
  isMulti,
  value,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(mainList);

  useEffect(() => {
    setSelectedOptions(mainList);
  }, [mainList]);

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
    onChangeDropDownItem(data);
  }

  return (
    <div>
      <div className="app">
        <div>Choose {name}</div>
        <div className="dropdown-container">
          <Select
            options={mainList}
            isMulti={isMulti}
            placeholder={`Select ${name}`}
            onChange={handleSelect}
            isSearchable={true}
            className="dropdownOption"
            //value={value}
          />
        </div>
      </div>
    </div>
  );
};
export default DropDown;
