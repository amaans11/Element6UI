/* eslint-disable no-use-before-define */
import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SelectwithSearch({ heading, data, defaultValue,handleChange ,type,currentValue}) {
	return (
		<div style={{ width: 400, marginRight: '20px'}}>
			<Autocomplete
				id={heading}
				options={data}
				getOptionLabel={(option) => option.label}
				renderInput={(params) => (
					<TextField {...params} variant="standard" label={heading}  style={{paddingTop:4}}
          // InputProps={{
          //   className: type === 'portfolio' ? classes.portColor :  classes.benchColor
          // }}
          />
				)}
        onChange={(e,newValue)=>{if(e){handleChange(newValue.label)}}}
        value={currentValue}
        disableClearable={true}
			/>
		</div>
	);
}
