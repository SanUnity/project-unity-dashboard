/* returns date from a string dd-MM-yyyy */
const stringToDate = dateText => {
  return new Date(
    dateText.substring(0, 4),
    getNumber(dateText.substring(5, 7)) - 1,
    getNumber(dateText.substring(8, 10))
  );
};

/* returns string yyyy-MM-dd of a Date*/
const dateToString = date => {
  return (
    date.getFullYear() +
    '-' +
    getFormatMonth(date.getMonth()) +
    '-' +
    getFormatDay(date.getDate())
  );
};

/* returns string dd-MM-yyyy of a Date*/
const dateToCustomString = date => {
  return (
    getFormatDay(date.getDate()) +
    '/' +
    getFormatMonth(date.getMonth()) +
    '/' +
    date.getFullYear()
  );
};

/* returns name months*/
const getFullNameMonth = index => {
  let months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];
  return months[index];
};

/* returns Epoch date*/
const getEpochDate = dateText => {
  return Date.parse(dateText) / 1000.0;
};

/* returns endDate */
const setEndDay = dateText => {
  return Date.parse(dateText + 'T23:59:59Z') / 1000.0;
};

/* returns string month */
const getFormatMonth = month => {
  let _mont = month + 1;
  return _mont < 10 ? '0' + _mont : _mont;
};

/* returns string day */
const getFormatDay = day => {
  return day < 10 ? '0' + day : day;
};

/* returns date short  dd MM */
const getShortDate = epochDate => {
  let date = new Date(epochDate * 1000);
  return (
    date.getUTCDate() + ' ' + getFullNameMonth(date.getUTCMonth())
  );
};

const getNumber = num => {
  let numAux = parseInt(num);
  return isNaN(numAux) ? 0 : numAux;
};

const addDays = (date, days) => {
  date.setDate(date.getDate() + days);
  return date;
};

export default {
  stringToDate,
  dateToCustomString,
  dateToString,
  getFullNameMonth,
  getEpochDate,
  setEndDay,
  getFormatMonth,
  getFormatDay,
  getShortDate,
  getNumber,
  addDays
};
