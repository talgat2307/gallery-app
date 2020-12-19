import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Navbar bg='dark' variant='dark' expand='lg' className='py-3' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>Photo Gallery</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto d-flex align-items-center">
              {!user ? <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                :
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                      {user.displayName
                      ? user.displayName
                      : user.username}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/my-profile">My Profile</Dropdown.Item>
                      <Dropdown.Item as={Link} to={'/add-photo'}>Add new Photo</Dropdown.Item>
                      <Dropdown.Item onClick={logoutHandler}>Log out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div>
                    {user.avatarImage ?
                      <img
                        src={user.avatarImage}
                        alt=""
                        width="35"
                        height="35"
                        className='ml-2 rounded'
                      /> : ''}

                  </div>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;