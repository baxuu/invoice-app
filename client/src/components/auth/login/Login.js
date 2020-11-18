import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { Form, Button, Alert, Col, Navbar, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { loginUser, clearErrors } from '../store/actions';
import Loader from '../../layout/loader/Loader';

import './Login.scss';

const Login = () => {
  const { errorMessage, idMessage } = useSelector(({ auth }) => auth);
  const { isLoading } = useSelector(({ shared }) => shared);
  const { register, handleSubmit, errors } = useForm();

  const [msg, setMsg] = useState(null);
  const handleClearMsg = () => setMsg(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const LogUser = (userData) => {
    handleClearMsg();
    dispatch(loginUser(userData, history));
  };

  useEffect(() => {
    if (idMessage === 'LOGIN_FAIL') {
      setMsg(errorMessage);
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setMsg(null);
    }
  }, [dispatch, errorMessage, idMessage]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Row>
          <Col>
            <Form className='auth__form' onSubmit={handleSubmit(LogUser)}>
              <Navbar className='company_nav'>Member Login</Navbar>
              {msg && <Alert variant='danger'>{msg}</Alert>}
              <Form.Row style={{ marginTop: 1 + 'rem' }}>
                <Col xs={10}>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    size='sm'
                    name='email'
                    placeholder='Email Address'
                    ref={register({ required: 'Email Address is required.' })}
                  />
                  <ErrorMessage errors={errors} name='email' as='p' />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col xs={10}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    size='sm'
                    type='password'
                    name='password'
                    placeholder='Password'
                    ref={register({ required: 'Password is required.' })}
                  />
                  <ErrorMessage errors={errors} name='password' as='p' />
                </Col>
              </Form.Row>
              <Form.Row>
                <Button className='invoice__save user_save' type='submit'>
                  <i className='fa fa-paper-plane'> Log in </i>
                </Button>
              </Form.Row>
            </Form>
            <Row className='auth__formInfo'>
              <NavLink exact to='/sign-up'>
                Create an Account
              </NavLink>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};
export default Login;
