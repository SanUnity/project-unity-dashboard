import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';

const styles = {
  label: {
    marginLeft: '4px',
    color: grey[500],
    "&.Mui-focused":{
      color: grey[500],
    }
  },
  select: {
    minWidth: '200px',
    background: 'white',
    color: grey[700],
    borderColor: grey[300],
    borderStyle:'solid',
    borderWidth: '2px',
    borderRadius: '4px',
    paddingLeft: '24px',
    paddingTop: '8px',
    paddingBottom: '8px',
    "&:hover":{
      borderColor: grey[400],
    },
    "&:focus":{
      borderRadius: '4px',
      background: 'white',
      borderColor: '#028fb6'
    },
  },
  icon:{
    color: '#028fb6',
    right: 12,
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none'
  },
  list: {
    paddingTop:0,
    paddingBottom:0,
    background:'white',
    "& li.Mui-selected":{
      fontWeight:700
    }
  }
}

const SelectUi = ({handleChange, val, label, listItems, initSelect, classes, multiple}) => {
  
  const iconComponent = props => {
    return <ExpandMoreIcon className={props.className + " " + classes.icon} />;
  };
  const menuProps = {
    classes: {
      list: classes.list
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    },
    getContentAnchorEl: null
  };
  
  return (
    <FormControl>
      <InputLabel  className={classes.label} id="inputLabel">
        {label}
      </InputLabel>
      <Select
        disableUnderline
        classes={{ root: classes.select }}
        labelId="inputLabel"
        IconComponent={iconComponent}
        MenuProps={menuProps}
        value={val ? val : initSelect}
        onChange={(e) => handleChange(e, label)}
        multiple={multiple}
      >
     
        { initSelect && <MenuItem value={initSelect}>{initSelect}</MenuItem> }
        {listItems && listItems.length > 1 && listItems.map((item,index) => 
          <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default withStyles(styles)(SelectUi)
