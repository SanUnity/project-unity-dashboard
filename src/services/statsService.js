import http from './base-http-service';
import constants from '../utils/constants'

const getSymptoms = async (options) => {
 
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` },
    params: { startDate: options.startDate, endDate: options.endDate, stateID: options.stateID, municipalityID: options.municipalityID, suburbID: options.suburbID, postalCode: options.postalCode },
  };

  try {
    const response = await http.get(`/stats/symptoms/${options.type}`, config)
      return response.data
  } catch (error) {
    return error;
  }
}

const getIndicators = async (options) => {
 
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` },
    params: { startDate: options.startDate, endDate: options.endDate, stateID: options.stateID, municipalityID: options.municipalityID, suburbID: options.suburbID, postalCode: options.postalCode },
  };

  try {
    const response = await http.get(`/stats/indicators`, config)
      return response.data
  } catch (error) {
    return error;
  }
}

const getMainSymptoms = async (options) => {
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` },
    params: { startDate: options.startDate, endDate: options.endDate },
  };

  try {
    const response = await http.get(`/stats/indicators/global`, config)
      return response.data
  } catch (error) {
    return error;
  }
}

export default {
    getSymptoms,
    getIndicators,
    getMainSymptoms
}