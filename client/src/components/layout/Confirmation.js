// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// //Confirmation after Submitting data
// const Confirmation = ({ curr }) => {
//   const [enter, setenter] = useState(false);
 
//   useEffect(() => {
//     if (curr) {
//       setenter(curr.enter);
//     }
//   }, [curr]);

//   const onSubmit = () => {
//       setenter(true)
//   };
//   const onSubmit1 = () => {
//      setenter(false)
// };


//   return (
//     <div id='edit-log-modal' className='modal' style={modalStyle}>
//       <div className='modal-content'>
//         <h4>Are you sure?</h4> 
//       <div className='modal-footer'>
//         <a
//           href='#!'
//           onClick={onSubmit1}
//           className='modal-close waves-effect red waves-light btn'
//         >
//           Cancel
//         </a>
//         {'        '}
//         <a
//           href='#!'
//           onClick={onSubmit}
//           className='modal-close waves-effect blue waves-light btn'
//         >
//           Enter
//         </a>
//       </div>
//       </div>
//     </div>
//   );
// };

// const modalStyle = {
//   width: '30%',
//   height: '30%'
// };

// EditLogModal.propTypes = {
//   curr: PropTypes.object,
// };

// const mapStateToProps = state => ({
//   curr: state.log.curr
// });

// export default connect(
//   mapStateToProps,
//   {}
// )(Confirmation);
