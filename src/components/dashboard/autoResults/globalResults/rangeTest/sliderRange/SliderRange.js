import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const valueText = value => {
  if(value === 100) {
    return `+${99} años`;
  }
  return `${value} años`;
}
const useStyles = makeStyles(theme => ({
  root: {
    width: '96%',
    margin: '0px 10px 0px 10px' //+ theme.spacing(3) * 2
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const AgeSlider = withStyles({
  root: {
    color: '#708090',
    height: 6
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#ffffff',
    border: '2px solid currentColor',
    marginTop: -4,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
      color: '#028fb6'
    }
  },
  active: {},
  valueLabel: {
    
    left: 'calc(-50% - 6px)',
    top: 22,
    '& *': {
      background: 'transparent',
      color: '#000',
      width: 70,
    },
    
  },
  track: {
    height: 10,
    borderRadius: 4,
    backgroundImage: "linear-gradient(.25turn, #00f,#f00)"
  },
  rail: {
    height: 10,
    borderRadius: 4
  }
})(Slider);

const SliderRange = ({ageValues, onChangeAgeValues}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <div className={classes.margin}>
        <AgeSlider
          value={ageValues}

          valueLabelFormat={valueText}
          onChange={onChangeAgeValues}
          valueLabelDisplay="on"
        />
      </div>
    </div>
  );
};

export default SliderRange;
