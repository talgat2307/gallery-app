import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePhoto, queryPhotos } from '../store/actions/photoActions';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageModal from '../components/ImageModal/ImageModal';

const UserGallery = ({ match }) => {

  const [modalShow, setModalShow] = useState(false);
  const [index, setIndex] = useState(null);

    const dispatch = useDispatch();
    const photos = useSelector(state => state.photo.queryPhotos);
    const user = useSelector(state => state.user.userInfo);

    useEffect(() => {
      dispatch(queryPhotos(match.params.id));
    }, [dispatch, match.params.id]);

    const deleteHandler = (id) => {
      dispatch(deletePhoto(id));
    };

  const imageClick = (index) => {
    setIndex(index);
  };

    const userId = user && user._id;
    let imageOwnerId;
    if (photos) {
      if (photos.length > 0) {
        imageOwnerId = photos[0].user._id;
      } else {
        imageOwnerId = null;
      }
    } else {
      imageOwnerId = null;
    }

    return (
      <>
        {imageOwnerId ?
          <div className='d-flex justify-content-between'>
            {userId === imageOwnerId ?
              <>
                <h3 className='mb-4'>My gallery</h3>
                <div>
                  <Button
                  as={Link} to={'/add-photo'}
                  variant='outline-primary'>Add new photo</Button>
                </div>
              </> : <h3 className='mb-4'>{photos && photos[0].user && photos[0].user.displayName}'s gallery</h3>}
          </div> :
          <div>
              <h3 className='mb-3'>No photo added yet</h3>
            <div>
              <Button className='mb-3' as={Link} to={'/add-photo'}>Add new photo</Button>
            </div>
            <Button variant='outline-primary' as={Link} to={'/'}>Go back to Gallery </Button>
          </div>}

        <Row className='flex-lg-row'>
          <Col>
            <Row className='justify-content-start'>
              {photos && photos.map((photo,index) => {
                return (
                  <Card key={photo._id} className='mr-3 mb-5'
                        style={{ width: '30%' }}>
                    <Card.Img
                      variant="top"
                      onClick={() => {setModalShow(true); imageClick(index)}}
                      width={'100'}
                      height={'250'}
                      src={`http://localhost:8000/uploads/${photo.image}`}
                    />
                    <Card.Body>
                      <Card.Title>{photo.title}</Card.Title>
                      {userId === imageOwnerId ? <Button
                        onClick={() => deleteHandler(photo._id)}
                        variant='danger'>Delete</Button> : ''}
                    </Card.Body>
                  </Card>
                );
              })}
            </Row>
          </Col>
        </Row>
        {index > 0 ? <ImageModal
          show={modalShow}
          image={`http://localhost:8000/uploads/${photos[index].image}`}
          onHide={() => setModalShow(false)}
        /> : ''}
      </>
    );
  }
;

export default UserGallery;