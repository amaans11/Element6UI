import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import {Accordion,AccordionSummary,AccordionDetails} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterTags from "./tags";
import data from '../../util/filter-config'
import {setFilterItem} from '../../redux/actions/authActions'


export default function FilterGroup() {
  const [filterData, setFilterData] = useState(data);
  const dispatch=useDispatch();

  const updateTags = (grpindex, tagindex, selected) => {
    if(selected){
      const newData = [...data];

      newData[grpindex].tagsList.map(tags=>{
        tags.selected=false
      })
        newData[grpindex].tagsList[tagindex].selected = selected;
        setFilterData(newData);
    
        const grpName=newData[grpindex].grpKey
    
        dispatch(setFilterItem({
          key:grpName,
          value:newData[grpindex].tagsList[tagindex].value
        }))
    }
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
