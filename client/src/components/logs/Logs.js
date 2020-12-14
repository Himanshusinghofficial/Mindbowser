import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

//If no Employee Added Display Empty Please Add Employee else Display All Employees
const Logs = ({ log: { logs, loading, filtered}, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }
  if(!loading && logs === null){
    return <p className='center'>Empty Please Add...</p>
  }
  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>Employees Data</h4>
      </li>
           { logs !== null && !loading && filtered !== null ? filtered.map(log => (<LogItem log={log} key={log._id} />))
              : logs.map(log => (<LogItem log={log} key={log._id} />))}

      </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(
  mapStateToProps,
  { getLogs }
)(Logs);
