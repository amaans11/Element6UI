import React, {  useState } from "react";
import Select from "react-select";

const colourStyles = {
  control: (styles) => ({ ...styles }),
  container: (styles) => ({ ...styles, width: "300px", marginRight: "10px" }),
  singleValue: (styles) => ({ ...styles }),
};

export const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

function ReactDropDown({data,}) {
  const [isClearable, setIsClearable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);

  return (
    <Select
      styles={colourStyles}
      className="basic-single"
      classNamePrefix="select"
      defaultValue={data[0]}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isSearchable={isSearchable}
      name="color"
      options={colourOptions}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
        },
        backgroundColor: {
          ...theme.backgroundColor,
        },
      })}
    />
  );
}

export default ReactDropDown;
