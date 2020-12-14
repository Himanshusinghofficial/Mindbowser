import React, { useRef,useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchLogs,clearFilter } from '../../actions/logActions';

//Search Employee using Any field of Employee
const SearchBar = ({ searchLogs,clearFilter,filtered }) => {
  const text = useRef('');
  // const onChange = e => {
  //   searchLogs(text.current.value);
  // };

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  },[filtered]);

  const onChange = e => {
    if (text.current.value !== '') {
      searchLogs(e.target.value);
    } else {
      clearFilter();
    }
    console.log(e.target.value)
  };

  return (
    <nav style={{ marginBottom: '30px' }} className='white'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field' style={{color:'black'}}>
            <input
              type='search'
              placeholder='Search Employee..'
              ref={text}
              onChange={onChange}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
  clearFilter:PropTypes.func.isRequired,
  filtered:PropTypes.object,
};

const mapStateToProps = state => ({
  filtered: state.log.filtered,
});

export default connect(
  mapStateToProps,
  { searchLogs,clearFilter }
)(SearchBar);
