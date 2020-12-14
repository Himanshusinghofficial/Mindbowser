import axios from 'axios';
import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER
} from './types';

// Get logs from server
export const getLogs = () => async dispatch => {
  try {
    setLoading();

    const res = await axios.get('/api/employees')
    // const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data.msg
    });
  }
};

// Add new log
export const addLog = log => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    setLoading();
    const res = await axios.post('/api/employees',log,config);

    dispatch({
      type: ADD_LOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data.msg
    });
  }
};

// Delete log from server
export const deleteLog = id => async dispatch => {
  try {
    setLoading();

    await axios.delete(`/api/employees/${id}`);

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data.msg
    });
  }
};

// Update log on server
export const updateLog = log => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    setLoading();
    const res = await axios.put(
      `/api/employees/${log._id}`,
      log,
      config
    );

    dispatch({
      type: UPDATE_LOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data.msg
    });
  }
};

// Search server logs
// export const searchLogs = text => async dispatch => {
//   try {
//     setLoading();

//     const res = await fetch(`/api/employees/?q=${text}`);

//     dispatch({
//       type: SEARCH_LOGS,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: LOGS_ERROR
//     });
//   }
// };

//Search Server logs
export const searchLogs = text => async dispatch =>{
  dispatch({ type: SEARCH_LOGS, payload: text });
};

//clear Filter
export const clearFilter = () => {
  return({ type: CLEAR_FILTER });
};

// Set current log
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

// Clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
