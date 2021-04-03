/* eslint-disable no-use-before-define */
import React from "react";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function SelectwithSearch({ heading, data }) {
  const defaultProps = {
    options: data,
    getOptionLabel: (option) => option.label,
  };

  const flatProps = {
    options: data.map((option) => option.label),
  };


  return (
    <div style={{ width: 400, marginRight: "20px" }}>
      <Autocomplete
        {...defaultProps}
        id={heading}
        debug
        renderInput={(params) => (
          <TextField {...params} label={heading} margin="normal" />
        )}
        onChange={e=>{console.log("e",e)}}
      />
    </div>
  );
}
