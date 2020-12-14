import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {logout,loadUser} from '../../actions/authActions'
import '../../App.css'

//Navbar page contains Title,icon,Login,register,username,logout details
const Navbar = ({ title, icon , isAuthenticated, logout, user, loadUser}) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li style={{color:'white'}}>Hello {user && user.FirstName}</li>
      <li>
        <a onClick={onLogout} href=''>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar' style={{padding:'10px 30px 10px 30px',margin:'0px', backgroundColor:'#22c7a9'}}>
    <h4 style={{marginTop:'5px'}}>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h4>
      <ul className='label-icon'>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
   
  );
};

Navbar.defaultProps = {
  title: 'Management',
  icon: 'fas fa-id-card-alt'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  user: PropTypes.object,
  isAuthenticated:PropTypes.object,
  logout : PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated:state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { logout, loadUser }
)(Navbar);


