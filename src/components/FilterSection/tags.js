import React from "react";
import Chip from "@material-ui/core/Chip";

export default function FilterTags({
  name,
  action,
  grpindex,
  tagindex,
  selected,
}) {
  if (selected) {
    return (
      <Chip
        size="small"
        label={name}
        color="primary"
        onClick={() => action(grpindex, tagindex, !selected)}
      />
    );
  } else {
    return (
      <Chip
        variant="outlined"
        size="small"
        label={name}
        onClick={() => action(grpindex, tagindex, !selected)}
      />
    );
  }
}
