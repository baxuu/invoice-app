import React, { useState, useEffect } from 'react';

import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import { Form, Button, Alert, Row, Col, Navbar } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { registerUser, clearErrors } from '../store/actions';
import Loader from '../../layout/loader/Loader';

const Signup = () => {
  const { errorMessage, idMessage } = useSelector(({ auth }) => auth);
  const { isLoading } = useSelector(({ shared }) => shared);
  const { register, handleSubmit, errors, getValues } = useForm();

  const [msg, setMsg] = useState(null);
  const handleClearMsg = () => setMsg(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const addUser = (userData) => {
    handleClearMsg();
    dispatch(registerUser(userData, history));
  };

  useEffect(() => {
    if (idMessage === 'REGISTER_FAIL') {
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
      {' '}
      {isLoading ? (
        <Loader />
      ) : (
        <Row>
          <Col>
            <Form className='auth__form' onSubmit={handleSubmit(addUser)}>
              <Navbar className='company_nav'>Sign Up</Navbar>
              {msg && <Alert variant='danger'>{msg}</Alert>}
              <Form.Row style={{ marginTop: 1 + 'rem' }}>
                <Col xs={10}>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='username'
                    size='sm'
                    name='username'
                    placeholder='Username'
                    ref={register({ required: 'Username is required.' })}
                  />
                  <ErrorMessage errors={errors} name='username' as='p' />
                </Col>
              </Form.Row>
              <Form.Row>
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
                <Col xs={10}>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    size='sm'
                    type='password'
                    name='passwordConfirmation'
                    placeholder='Confirm password'
                    ref={register({
                      required: 'Please confirm password!',
                      validate: {
                        matchesPreviousPassword: (value) => {
                          const { password } = getValues();
                          return (
                            password === value || 'Passwords should match!'
                          );
                        },
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name='passwordConfirmation'
                    as='p'
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Button className='invoice__save user_save' type='submit'>
                  <i className='fa fa-paper-plane'> Sign up </i>
                </Button>
              </Form.Row>
            </Form>
            <Row className='auth__formInfo'>
              <span> Already have an account? </span>
              <NavLink exact to='/login'>
                {''}Login here
              </NavLink>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Signup;
