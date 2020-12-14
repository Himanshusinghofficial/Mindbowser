import React, { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, clearErrors } from '../../actions/authActions';
import setAuthToken from '../../actions/setAuthToken'
import M from 'materialize-css/dist/js/materialize.min.js';

//login page
const Login = ({error,isAuthenticated,token,login, clearErrors }) => {
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    setAuthToken(token)
    console.log(isAuthenticated);
    if (error === 'Invalid Credentials') {
      M.toast({ html: `Invalid Credentials` });
      clearErrors();
    }
   
  }, [isAuthenticated,error,clearErrors,history]);

  const [user, setUser] = useState({
    Email: '',
    Password: ''
  });

  const { Email, Password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (Email === '' || Password === '') {
      M.toast({ html: `Please fill in all fields` });
    } else {
      login({
        Email,
        Password
      });
    }
  };

  return (
    <div className='container'>
    <div className='form-container'>
      <h2>
         Login
      </h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='Email'>Email Address</label>
          <input
            id='Email'
            type='Email'
            name='Email'
            value={Email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Password'>Password</label>
          <input
            id='Password'
            type='Password'
            name='Password'
            value={Password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
    </div>
  );
};

Login.propTypes = {
  error: PropTypes.object,
  isAuthenticated:PropTypes.object,
  token:PropTypes.object,
  login : PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.auth.error,
  token:state.auth.token,
  isAuthenticated:state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);
