import http from './base-http-service';
import constants from '../utils/constants'
const getStates = async () => {
  const config = { headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` } };
  try {
    const response = await http.get('/admins/states',config)
      return response.data
  } catch (error) {
    return error;
  }
};
const getProvinces = async state => {
  const config = { headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` } };
  try {
    const response = await http.get(`/admins/states/${state}/municipalities`,config)
      return response.data
  } catch (error) {
    return error;
  }
};
const getDistricts = async (data) => {
  const config = { headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` } };
  try {
    const response = await http.get(`/admins/states/${data.state}/municipalities/${data.province}/suburbs`, config)
      return response.data
  } catch (error) {
    return error;
  }
};
const getDataTimeline = async (options) => {
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` },
    params: { startDate: options.startDate, endDate: options.endDate, stateID: options.stateID, municipalityID: options.municipalityID, suburbID: options.suburbID, ageStart: options.ageStart, ageEnd: options.ageEnd },
  };
  try {
    const response = await http.get(`/stats/timeline/profilesTests`, config)
      return response.data
  } catch (error) {
    return error;
  }
}
const getRegistersTimeline = async (options) => {
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` },
    params: { startDate: options.startDate, endDate: options.endDate },
  };
  try {
    const response = await http.get(`/admins/states/${options.stateID}/municipalities/${options.municipalityID}/registers`, config)
      return response.data
  } catch (error) {
    return error;
  }
}
const getCasesTimeline = async (options) => {
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` },
    params: { startDate: options.startDate, endDate: options.endDate },
  };
  try {
    const response = await http.get(`/admins/states/${options.stateID}/municipalities/${options.municipalityID}/profilesTests`, config)
      return response
  } catch (error) {
    return error;
  }
}
const getDataAge = async (options) => {
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` },
    params: { startDate: options.startDate, endDate: options.endDate, stateID: options.stateID, municipalityID: options.municipalityID, suburbID: options.suburbID },
  };
  try {
    const response = await http.get(`admins/stats/age`, config)
      return response.data
  } catch (error) {
    return error;
  }
}
const getDataGender = async (options) => {
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` },
    params: { startDate: options.startDate, endDate: options.endDate, stateID: options.stateID, municipalityID: options.municipalityID, suburbID: options.suburbID, minAge: options.minAge, maxAge: options.maxAge },
  };
  try {
    const response = await http.get(`admins/stats/gender`, config)
      return response.data
  } catch (error) {
    return error;
  }
}
export default {
  getRegistersTimeline,
  getDataTimeline,
  getStates,
  getDistricts,
  getProvinces,
  getDataAge,
  getDataGender,
  getCasesTimeline
}