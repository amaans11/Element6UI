import React, { useState } from "react";
import {Accordion,AccordionSummary,AccordionDetails} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterTags from "./tags";
import data from '../../util/filter-config'


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
