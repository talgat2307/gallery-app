import React from 'react';
import Header from '../Header/Header';
import { Container } from 'react-bootstrap';

const Layout = props => {

  return (
    <>
      <Header />
      <main className='main py-5'>
        <Container>
          {props.children}
        </Container>
      </main>
    </>
  );
};

export default Layout;