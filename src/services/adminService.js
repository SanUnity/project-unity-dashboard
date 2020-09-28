import http from './base-http-service';
import constants from '../utils/constants'

const getAllUsers = async () => {
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` }
  };

  try {
    const response = await http.get(`/admins`, config)
    return response.data
  } catch (error) {
    return error;
  }
}

const removeUser = async (userId) => {
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` }
  };

  try {
    const response = await http.delete(`/admins/${userId}`, config)
    return response.data
  } catch (error) {
    throw error;
  }
}

const updateUser = async (userId, updatedUser) => {
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` }
  };

  try {
    const response = await http.put(`/admins/${userId}`, updatedUser, config)
    return response.data
  } catch (error) {
    throw error;
  }
}

const inviteUser = async (newUser) => {
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` }
  };

  try {
    const response = await http.post(`/admins/invite`, newUser, config)
    return response.data
  } catch (error) {
    throw error;
  }
}

const setUserPassword = async (data) => {
  try {
    const response = await http.post(`/admins/password`, data)
    return response
  } catch (error) {
    return error;
  }
}

const sendPushNot = async (options) => {
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` },
    params: {
      statesID: options.states.toString(), 
      municipalitysID: options.municipalitys.toString(), 
      suburbsID: options.suburbs.toString(),
      startDate: options.startDate, 
      endDate: options.endDate,
      ageStart: options.ageStart,
      ageEnd: options.ageEnd,
      gender: options.gender,
      conditions: options.conditions,
      breathing: options.breathing,
      fever: options.fever,
      cough: options.cough,
      meet: options.meet,
      snot: options.snot,
      pain: options.pain,
      gastrointestinal: options.gastrointestinal,
      lossSmellTaste: options.lossSmellTaste,
    }
  };

  const body = {
    title: options.title,
    message: options.message
  }

  try {
    const response = await http.post(`/admins/custom/message`, body, config)
    return response
  } catch (error) {
    return error;
  }
}

const getPushData = async (options) => {
  const config = { 
    headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` },
    params: {
      statesID: options.states.toString(), 
      municipalitysID: options.municipalitys.toString(), 
      suburbsID: options.suburbs.toString(),
      startDate: options.startDate, 
      endDate: options.endDate,
      ageStart: options.ageStart,
      ageEnd: options.ageEnd,
      gender: options.gender,
      conditions: options.conditions,
      breathing: options.breathing,
      fever: options.fever,
      cough: options.cough,
      meet: options.meet,
      snot: options.snot,
      pain: options.pain,
      gastrointestinal: options.gastrointestinal,
      lossSmellTaste: options.lossSmellTaste,
    },
  };

  try {
    const response = await http.get(`/admins/custom/profiles`, config)
    return response
  } catch (error) {
    return error;
  }
}

export default {
    getAllUsers,
    removeUser,
    updateUser,
    inviteUser,
    setUserPassword,
    sendPushNot,
    getPushData
}