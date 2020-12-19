import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../store/actions/userActions';
import FacebookLogin from '../components/FacebookLogin/FacebookLogin';

const Login = () => {

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const error = useSelector(state => state.user.loginError);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(user));
  };

  return (
    <div>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h3 className='text-center pb-4'>Login</h3>
            {error && <Alert variant='danger'>{error.response.data.error}</Alert> }
            <Form onSubmit={formSubmitHandler}>
              <Form.Group controlId='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  required={true}
                  placeholder='Enter username or email'
                  name='username'
                  value={user.username}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  required={true}
                  placeholder='Enter password'
                  name='password'
                  value={user.password}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>
                Login
              </Button>
              <FacebookLogin />
            </Form>

            <Row className='py-3'>
              <Col>
                <Link to={'/register'}> Not yet registered? Sign Up</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;