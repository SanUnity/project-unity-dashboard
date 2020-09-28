const STYLE_MAP = {
  width: '100%',
  height: '600px',
  margin: '3rem 0 0 0'
};

const GET_COLOR = d => {
  return d > 1000
    ? '#240000'
    : d > 750
    ? '#520100'
    : d > 500
    ? '#780001'
    : d > 350
    ? '#9C0001'
    : d > 200
    ? '#C30000'
    : d > 100
    ? '#FF3435'
    : d > 50
    ? '#FF5B5A'
    : d > 20
    ? '#FF8081'
    : d > 10
    ? '#FFB9B9'
    : '#FFEDED';
};

const GET_COLOR_REGISTER = d => {
  return d > 1000
    ? '#800026'
    : d > 500
    ? '#BD0026'
    : d > 200
    ? '#E31A1C'
    : d > 100
    ? '#FC4E2A'
    : d > 50
    ? '#FD8D3C'
    : d > 20
    ? '#FEB24C'
    : d > 10
    ? '#FED976'
    : '#FFEDA0';
};
const GRADES_REGISTER = [0, 10, 20, 50, 100, 200, 500, 1000];
const GRADES = [0, 10, 20, 50, 100, 200, 350, 500, 750, 1000];

const COLOR_GRADES = [
  '#FFEDED',
  '#FFB9B9',
  '#FF8081',
  '#FF5B5A',
  '#FF3435',
  '#C30000',
  '#9C0001',
  '#780001',
  '#520100',
  '#240000'
];
const COLOR_REGISTERS_GRADES = [
  '#FFEDA0',
  '#FED976',
  '#FEB24C',
  '#FD8D3C',
  '#FC4E2A',
  '#E31A1C',
  '#BD0026',
  '#800026'
];

export default {
  STYLE_MAP,
  GET_COLOR,
  GET_COLOR_REGISTER,
  GRADES_REGISTER,
  GRADES,
  COLOR_GRADES,
  COLOR_REGISTERS_GRADES
};
