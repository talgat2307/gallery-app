import React from 'react';
import { Button, Image, Modal } from 'react-bootstrap';

const ImageModal = (props) => {
  return (
    <Modal
      {...props}
      size='xl'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Image src={props.image} fluid />
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;