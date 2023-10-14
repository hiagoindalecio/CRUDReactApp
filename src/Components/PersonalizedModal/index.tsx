import React from 'react'
import { PersonalizedModalsProps } from '../../Interfaces';
import './styles.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PersonalizedModal: React.FC<PersonalizedModalsProps> =
  ({message,
    title,
    hasConfirmButton,
    confirmButtonType,
    confirmButtonForm,
    onConfirm,
    onClose,
    children}) => {
  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title ? title : 'Atenção'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message ? <p>{message}</p> : <></>}
          {children}
        </Modal.Body>
        <Modal.Footer>
          {
            hasConfirmButton ?
            <>
              <Button variant="primary" type={confirmButtonType} form={confirmButtonForm} onClick={onConfirm}>Confirmar</Button>
              <Button variant="danger" onClick={onClose}>Cancelar</Button>
            </>
            :
            <Button variant="primary" onClick={onClose}>Entendi</Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PersonalizedModal