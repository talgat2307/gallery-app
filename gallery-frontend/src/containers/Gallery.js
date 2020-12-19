import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../store/actions/photoActions';
import ImageModal from '../components/ImageModal/ImageModal';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [modalShow, setModalShow] = useState(false);
  const [index, setIndex] = useState(null);

  const dispatch = useDispatch();
  const photos = useSelector(state => state.photo.photos);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const imageClick = (index) => {
    setIndex(index);
  };

  let modalImage;

  if (index && index > 0 ) {
    modalImage = (
      <ImageModal
        show={modalShow}
        image={`http://localhost:8000/uploads/${photos[index].image}`}
        onHide={() => setModalShow(false)}
      />
    );
  }

  return (
    <div>
      <Row className='flex-lg-row'>
        <Col>
          <Row className='justify-content-start'>
            {photos && photos.map((photo, index) => {
              return (
                <Card key={photo._id} className='mr-3 mb-5'
                      style={{ width: '30%' }}>
                  <Card.Img
                    variant="top"
                    onClick={() => {
                      setModalShow(true);
                      imageClick(index);
                    }}
                    width={'100'}
                    height={'250'}
                    src={`http://localhost:8000/uploads/${photo.image}`}
                  />
                  <Card.Body>
                    <Card.Title>{photo.title}</Card.Title>
                     <Card.Text as={Link} to={`/user-gallery/${photo.user._id}`}>By: {photo.user.displayName}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        </Col>
      </Row>
      {modalImage}
    </div>
  );
};

export default Gallery;