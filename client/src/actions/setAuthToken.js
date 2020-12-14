import axios from 'axios';

//adding token to header or deleting
const setAuthToken = token => {
  if (token) {
    // axios.defaults.headers.common['x-auth-token'] = token;
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete axios.defaults.headers.common['x-auth-token'];
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;

