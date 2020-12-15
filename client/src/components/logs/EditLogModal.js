import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLog } from '../../actions/logActions';

//Edit or Update Employee Details
const EditLogModal = ({ current, updateLog }) => {
  const [EmpId, setEmpId] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Address, setAddress] = useState('');
  const [DOB, setDOB] = useState('');
  const [Mobile, setMobile] = useState('');
  const [City, setCity] = useState('');

  useEffect(() => {
    if (current) {
      setEmpId(current.EmpId);
      setFirstName(current.FirstName);
      setLastName(current.LastName);
      setAddress(current.Address);
      setDOB(current.DOB);
      setMobile(current.Mobile);
      setCity(current.City);
    }
  }, [current]);

  const onSubmit = () => {
    if (FirstName === '' ||  LastName=== '' || EmpId==='' || Address==='' || DOB==='' || Mobile==='' || City==='') {
      M.toast({ html: 'Please add all details' });
    } else {
      const updLog = {
        _id: current._id,
        EmpId,
        FirstName,
        LastName,
        Address,
        DOB,
        Mobile,
        City
      };

      updateLog(updLog);
      M.toast({ html: `Details updated by Manager` });

      // Clear Fields
      setEmpId('');
      setFirstName('');
      setLastName('');
      setAddress('');
      setDOB('');
      setMobile('');
      setCity('');
    }
  };

  return (
    <div id='editlogmodal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Update Employee Details</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='Number'
              name='EmpId'
              value={EmpId}
              onChange={e => setEmpId(e.target.value)}
              required
            />
            <label htmlFor='message' className='active'>
              Employee ID
            </label>
          </div>
        </div>
      
      <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='FirstName'
              value={FirstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
            <label htmlFor='message' className='active'>
              FirstName
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='LastName'
              value={LastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
            <label htmlFor='message' className='active'>
              LastName
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='Address'
              value={Address}
              onChange={e => setAddress(e.target.value)}
              required
            />
            <label htmlFor='message' className='active'>
              Address
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='date'
              name='DOB'
              value={DOB}
              onChange={e => setDOB(e.target.value)}
              required
            />
            <label htmlFor='message' className='active'>
              Date Of Birth
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='Number'
              name='mobile'
              value={Mobile}
              onChange={e => setMobile(e.target.value)}
              required
            />
            <label htmlFor='message' className='active'>
              Mobile Number
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='City'
              value={City}
              onChange={e => setCity(e.target.value)}
              required
            />
            <label htmlFor='message' className='active'>
              City
            </label>
          </div>
        </div>
        </div>
      <div className='modal-footer'>
        <a
          href=''
          onClick={onSubmit}
          className='modal-close waves-effect blue waves-light btn'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%'
};

EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.log.current
});

export default connect(
  mapStateToProps,
  { updateLog }
)(EditLogModal);
