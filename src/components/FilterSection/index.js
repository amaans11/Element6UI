import React, { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FilterTags from "./tags";

const data = [
  {
    grpname: "sector",
    tagsList: [
      { name: "SASB", value: "sasb", selected: false },
      { name: "GICS", value: "gics", selected: false },
    ],
  },
  {
    grpname: "inference",
    tagsList: [
      { name: "Average", value: "average", selected: false },
      { name: "Maximum", value: "maximum", selected: false },
    ],
  },
  {
    grpname: "emission",
    tagsList: [
      { name: "scope 1+2", value: "scope 1+2", selected: false },
      { name: "scope 1+2+3", value: "scope 1+2+3", selected: false },
    ],
  },
  {
    grpname: "Asset type",
    tagsList: [
      { name: "Equities", value: "equities", selected: false },
      { name: "CorpBonds", value: "corpbonds", selected: false },
      { name: "All", value: "all", selected: false },
    ],
  },
  {
    grpname: "Footprint Metric",
    tagsList: [
      { name: "weighted Avg", value: "weight avg", selected: false },
      { name: "Revenue", value: "revenue", selected: false },
      { name: "All", value: "all", selected: false },
    ],
  },
  {
    grpname: "Market value",
    tagsList: [
      { name: "Market cap", value: "marketcap", selected: false },
      { name: "CorpBonds", value: "corpbonds", selected: false },
      { name: "All", value: "all", selected: false },
    ],
  },
];

export default function FilterGroup() {
  const [filterData, setFilterData] = useState(data);

  const updateTags = (grpindex, tagindex, selected) => {
    const newData = [...data];
    newData[grpindex].tagsList[tagindex].selected = selected;
    setFilterData(newData);
  };
  return (
    <>
      {filterData.map((e, index) => {
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              <label className="tags-label">{e.grpname}</label>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {e.tagsList.map((t, i) => {
                  return (
                    <FilterTags
                      name={t.name}
                      selected={t.selected}
                      grpindex={index}
                      tagindex={i}
                      action={updateTags}
                    />
                  );
                })}
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}
