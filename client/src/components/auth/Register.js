import React, { useState,  useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { register, clearErrors} from '../../actions/authActions';
import setAuthToken from '../../actions/setAuthToken'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../../App.css'

//Register Page
const Register = ({register,token, error, clearErrors, isAuthenticated }) => {
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
       history.push("/");
       M.toast({ html: `Register Successfully` });
    }
     setAuthToken(token)
    if (error === 'User already exists') {
      M.toast({ html: `User already exists Please Login` });
      history.push("/login");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated,clearErrors,history]);

  const [user, setUser] = useState({
    FirstName: '',
    LastName:'',
    Email: '',
    Password: '',
    password2: '',
    Address:'',
    DOB:'',
    Company:''
  });

  const { FirstName, Email, Password, password2,LastName,DOB,Address, Company} = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (FirstName === '' || LastName==='' || Email === '' || Password === '' || password2==='' || DOB==='' || Address==='' || Company==='' ) {
      M.toast({ html: `Please enter all fields` });
    } else if (Password !== password2) {
      M.toast({ html: `Passwords do not match` });
    } else {
      register({
        FirstName,
        LastName,
        Email,
        Password,
        Address,
        DOB,
        Company
      });
    }
  };

  return (
    <div className='container'>
    <div className='form-container' style={{marginBottom:'50px'}}>
      <h2>
       Register
      </h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>FirstName</label>
          <input
            id='FirstName'
            type='text'
            name='FirstName'
            value={FirstName}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>LastName</label>
          <input
            id='LastName'
            type='text'
            name='LastName'
            value={LastName}
            onChange={onChange}
            required
          />
        </div>
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
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            id='password2'
            type='Password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>DOB</label>
          <input
            id='DOB'
            type='date'
            name='DOB'
            value={DOB}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Address</label>
          <input
            id='Address'
            type='text'
            name='Address'
            value={Address}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Company</label>
          <input
            id='Company'
            type='text'
            name='Company'
            value={Company}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
    </div>
  );
};

Register.propTypes = {
  error: PropTypes.object,
  isAuthenticated:PropTypes.object,
  token:PropTypes.object,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.auth.error,
  token:state.auth.token,
  isAuthenticated:state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(Register);
