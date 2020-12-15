import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteLog, setCurrent } from '../../actions/logActions';
import M from 'materialize-css/dist/js/materialize.min.js';

//Displaying All Employees on Home Screen
const LogItem = ({ log, deleteLog, setCurrent }) => {
  const onDelete = () => {
    deleteLog(log._id);
    M.toast({ html: 'Employee Deleted' });
  };

  return (
    <li className='collection-item'>
      <div>
      <a
          href='#editlogmodal'
          className={`modal-trigger ${
            log.attention ? 'red-text' : 'blue-text'
          }`}
          onClick={() => setCurrent(log)}
        >
          {"Update Details"}
        </a>
        <br />
        <span className='black-text'>
          <span className='black-text'><b>EMP_ID</b> : {log.EmpId}</span><br/>
          <span><b>Name</b> : {log.FirstName}{' '}{log.LastName}</span><br/>
          <span><b>Address</b> : {log.Address}</span><br/>
          <b>Date of Birth</b> : <Moment format='MMMM Do YYYY,'>{log.DOB}</Moment><br/>
          <span><b>Mobile Number</b> : {log.Mobile}</span><br/>
          <span><b>City</b> : {log.City}</span>
        </span>
        <a href='' onClick={onDelete} className='secondary-content'>
          <i className='material-icons red-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteLog, setCurrent }
)(LogItem);
