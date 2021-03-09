import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
function CheckBox({ label, checked, value, action }) {
  return (
    <FormControlLabel
      control={
        <Checkbox checked={checked} onChange={(e) => action(e)} value={value} />
      }
      label={label}
    />
  );
}

export default CheckBox;
