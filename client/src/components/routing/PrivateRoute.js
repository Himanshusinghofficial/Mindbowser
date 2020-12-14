import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Private Route if login then route to Home Page Else route to Login Page
const PrivateRoute = ({ component:Component,isAuthenticated,loading, ...rest }) => {
   return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated:PropTypes.object,
  loading:PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated,
  loading:state.auth.loading
});

export default connect(mapStateToProps)(PrivateRoute);