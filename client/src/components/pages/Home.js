import React, { Fragment,useEffect } from 'react';
import SearchBar from '../layout/SearchBar';
import Logs from '../logs/Logs';
import AddBtn from '../layout/AddBtn';
import AddLogModal from '../logs/AddLogModal';
import EditLogModal from '../logs/EditLogModal';
import {loadUser} from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Home Page
const Home = ({loadUser}) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
   
  return (
    <Fragment>
    <SearchBar />
    <div className='container'>
    <div className='row'>
    <div className='col s10'>
      <AddLogModal />
      <EditLogModal />
      <Logs />
    </div>
    <div className='col s2 center'>
      <AddBtn />
    </div>
   </div>
   </div>
  </Fragment>
  );
};

// export default Home;
Home.propTypes = {
  loadUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { loadUser }
)(Home);
