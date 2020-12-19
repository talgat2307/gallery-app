import React, { useState } from 'react';
import { postPhoto } from '../store/actions/photoActions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const AddPhoto = () => {
  const [photo, setPhoto] = useState({
    title: '',
    image: ''
  });


  const dispatch = useDispatch();
  const error = useSelector(state => state.photo.error);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPhoto(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const fileChangeHandler = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setPhoto(prevState => ({ ...prevState, [name]: file }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(photo).forEach(key => {
      formData.append(key, photo[key]);
    });

    dispatch(postPhoto(formData));
  };

  const getFieldError = (fieldName) => {
    try {
      return error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  }

  return (
    <>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h2 className='py-4'>Add new photo</h2>
            <Form onSubmit={(e) => submitFormHandler(e)}>

              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required={true}
                  type='text'
                  name='title'
                  value={photo.title}
                  onChange={(e) => inputChangeHandler(e)}
                  isInvalid={!!getFieldError('title')}
                >
                </Form.Control>
                <Form.Control.Feedback type={'invalid'}>{getFieldError('title')}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.File
                  required={true}
                  name='image'
                  onChange={fileChangeHandler}
                  isInvalid={!!getFieldError('image')}
                />
              </Form.Group>
              <Form.Control.Feedback type={'invalid'}>{getFieldError('image')}</Form.Control.Feedback>

              <Button className='mt-3' type='submit' variant='primary'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

    </>
  );
};

export default AddPhoto;