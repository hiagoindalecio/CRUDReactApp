import React, { useContext, useEffect, useState } from 'react';
import './styles.css';

import logo from '../../Assets/logo.png';

import ModalMessage from '../../Components/ModalMessages';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import AuthContext from '../../Contexts/auth';

function Main() {
  const { singOut, user } = useContext(AuthContext);
  const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Buscar pessoas associadas ao usuário
  }, []);

  async function Logoff() {
    await singOut();
  }

  return (
    <fieldset>
      <div className='page'>
        { isModalMessageVisible ? <ModalMessage props={{message}} onClose={() => {setIsModalMessageVisible(false);}}></ModalMessage> : null }
        <header className="header">
          <div className="header-logo">
            <h1 className="header-text">People Management</h1>
            <img src={logo} alt="logo" className="img-logo"/>
          </div>
          <Button className='btn-right' variant="outline-danger" onClick={() => Logoff()}>Sair</Button>
        </header>
        <ListGroup className='people-list'>
          <ListGroup.Item action variant="light">
            Pedro
            <Button className='btn-right' onClick={() => {}}>Editar</Button>
          </ListGroup.Item>
          <ListGroup.Item action variant="light">
            Roberto
          </ListGroup.Item>
          <ListGroup.Item action variant="light">
            Rodrigo
          </ListGroup.Item>
        </ListGroup>
      </div>
    </fieldset>
  );
}

export default Main;
