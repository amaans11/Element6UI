/* eslint-disable no-use-before-define */
import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  portColor:{
    color:'#597ef7',
    fontWeight:'bold'
  },
  benchColor:{
    color:'#bae637',
    fontWeight:'bold'
  }
}));

export default function SelectwithSearch({ heading, data, defaultValue,handleChange ,type}) {
  const classes=useStyles();
	return (
		<div style={{ width: 400, marginRight: '20px' }}>
			<Autocomplete
				id={heading}
				options={data}
				getOptionLabel={(option) => option.label}
				defaultValue={defaultValue}
				renderInput={(params) => (
					<TextField {...params} variant="standard" label={heading} 
          // InputProps={{
          //   className: type == 'portfolio' ? classes.portColor :  classes.benchColor
          // }}
          />
				)}
        onChange={(e,newValue)=>{if(e){console.log("e",newValue)}}}
        // onInputChange={(e,value)=>handleChange(value)}
			/>
		</div>
	);
}
