/* eslint-disable no-use-before-define */
import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DataUsageOutlined } from '@material-ui/icons';

export default function SelectwithSearch({ heading, data, defaultValue,handleChange ,type,currentValue}) {
	console.log("data>>",DataUsageOutlined)
	return (
		<div style={{ width: 250, marginRight: '20px'}}>
			<Autocomplete
				id={heading}
				openOnFocus
				options={data}
				getOptionLabel={(option) => option.label}
				renderInput={(params) => (
					<TextField {...params} variant="standard" label={heading} 
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
