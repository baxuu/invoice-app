import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Toast } from 'react-bootstrap';

import { toasterOff } from '../../layout/store/actions';

import './Toaster.scss';

const Toaster = ({ message, status }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(toasterOff({ message: '', status: '' }));
    }, 2000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const toasterQuit = () => {
    dispatch(toasterOff({ type: '', status: '' }));
  };

  return (
    <Toast className='toaster' onClick={toasterQuit}>
      <Toast.Header
        className={status === 200 || status === 201 ? 'success' : 'failed'}
      >
        <strong className='mr-auto '>
          {status === 200 || status === 201
            ? 'Success!'
            : 'Something went wrong!'}
        </strong>
        <small>now</small>
      </Toast.Header>
      <Toast.Body className='toaster__message'>{message}</Toast.Body>
    </Toast>
  );
};

export default Toaster;
