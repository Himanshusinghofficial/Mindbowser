import React, { Fragment } from 'react';
import SearchBar from '../layout/SearchBar';
import Logs from '../logs/Logs';
import AddBtn from '../layout/AddBtn';
import AddLogModal from '../logs/AddLogModal';
import EditLogModal from '../logs/EditLogModal';

//Home Page
const Home = () => {
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

export default Home;
