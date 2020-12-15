import React from 'react';
import Once from '../auth/Once'
//Adding button to Home When click Popup of Add Employees Form open
const AddBtn = () => {
  return (
    <div className='action-btn'>
      <a
        href='#addlogmodal'
        onClick={Once()}
        className='btn-floating btn-large blue darken-2 modal-trigger'
      >
        <i className='large material-icons'>add</i>
      </a>
    </div>
  );
};

export default AddBtn;
