import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


class ETDropDownFinal extends Component {
  state = {
    selected: this.props.selected,
    values: this.props.values,
    label: this.props.label,
    label_style: { width: '200px', display: 'flex', color: this.props.color },
    color: this.props.color
  }

  handleChange = (event) => {

    this.props.onChange(event.target.value);

  }
  async componentWillMount() {
    if (typeof this.props.style !== 'undefined') {
      this.setState({ label_style: this.props.style })
    }
  }
  render() {
    return (
      <Box p={1} style={{
        margin: 0,
        fullWidth: true,
        display: 'flex',
        maxHeight: '60px',
        position: 'sticky'
      }}>


        <FormControl variant="outlined" >
          <Box p={1}>
            <InputLabel id={this.props.label} style={this.state.label_style}
            >{this.props.label}</InputLabel>
          </Box>

          <Select
            style={{
              maxHeight: '55px',
              minHeight: '40px',
              width:'100%',
              color: this.state.color
            }}
            labelId={this.props.label}
            id={this.props.label + 'select'}
            value={this.props.selected}
            onChange={this.handleChange}

          >
            {this.props.values.map(text => (
              <MenuItem key={text[0]} value={text[0]}>{text[1]}</MenuItem>
            ))}{" "}
          </Select>
          <br />
        </FormControl>
      </Box>
    );
  }
}

export default ETDropDownFinal;
