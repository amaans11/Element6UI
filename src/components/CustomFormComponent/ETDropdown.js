import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

class ETDropdown extends Component {
	state = {
		selected: this.props.selected,
		values: this.props.values,
		label: this.props.label
	};
	render() {
		const selectorsStyle = {};
		const handleChange = (event) => {
			this.setState({ selected: event.target.value });
			this.props.onChange(event.target.value);
		};
		return (
			<Box p={1}>
				<div container style={{ display: 'flex' }}>
					<Typography variant="body2">{this.state.label}</Typography>

					<div style={{ marginLeft: '10px' }}>
						<FormControl variant="outlined" style={{}}>
							<Select
								labelId="portfolio"
								id="portfolio"
								value={this.state.selected}
								onChange={handleChange}
								style={{
									height: '35px',
									width: '200px',
									backgroundColor: '',
									marginTop: '-4%'
								}}
							>
								{this.state.values.map((text) => <MenuItem value={text[0]}>{text[1]}</MenuItem>)}{' '}
							</Select>
						</FormControl>
					</div>
				</div>
			</Box>
		);
	}
}

export default ETDropdown;
