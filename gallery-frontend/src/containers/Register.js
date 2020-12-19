import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/actions/userActions';
import FacebookLogin from '../components/FacebookLogin/FacebookLogin';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    displayName: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const error = useSelector(state => state.user.registerError);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(registerUser(user));
  };

  const getFieldError = (fieldName) => {
    try {
      return error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  }

  return (
    <div>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h2 className='text-center pb-4'>Sign Up</h2>
            <Form onSubmit={formSubmitHandler}>

              <Form.Group controlId='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter username'
                  name='username'
                  value={user.username}
                  onChange={(e) => inputChangeHandler(e)}
                  isInvalid={!!getFieldError('username')}
                >
                </Form.Control>
                <Form.Control.Feedback type={'invalid'}>{getFieldError('username')}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId='displayName'>
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter display name'
                  name='displayName'
                  value={user.displayName}
                  onChange={(e) => inputChangeHandler(e)}
                  isInvalid={!!getFieldError('displayName')}
                >
                </Form.Control>
                <Form.Control.Feedback type={'invalid'}>{getFieldError('username')}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter email'
                  name='email'
                  value={user.email}
                  onChange={(e) => inputChangeHandler(e)}
                  isInvalid={!!getFieldError('email')}
                >
                </Form.Control>
                <Form.Control.Feedback type={'invalid'}>{getFieldError('email')}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  name='password'
                  value={user.password}
                  onChange={(e) => inputChangeHandler(e)}
                  isInvalid={!!getFieldError('password')}
                >
                </Form.Control>
                <Form.Control.Feedback type={'invalid'}>{getFieldError('password')}</Form.Control.Feedback>
              </Form.Group>

              <Button type='submit' variant='primary'>
                Sign Up
              </Button>
              <FacebookLogin/>

            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;