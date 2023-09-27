import React from 'react'
import { ModalMessagesProps } from '../../Interfaces';
import './styles.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalMessage: React.FC<ModalMessagesProps> = ({props, onClose, children}) => {
  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Atenção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.message}</p>
          { children }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onClose}>
            Entendi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMessage