import React, { useContext, useEffect, useState } from 'react';
import './styles.css';

import logo from '../../Assets/logo.png';

import ModalMessage from '../../Components/ModalMessages';
import ListGroup from 'react-bootstrap/ListGroup';
import { slide as Menu } from 'react-burger-menu';
import { 
  BsFillPencilFill, 
  BsFillTrashFill,
  BsBoxArrowLeft,
  BsFillGearFill,
  BsPersonFillAdd
} from "react-icons/bs";

import AuthContext from '../../Contexts/auth';

import * as peopleService from '../../Services/people';
import { Person } from '../../Interfaces';

function Main() {
  const { singOut, user } = useContext(AuthContext);
  const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    async function findPeople() {
      const response = await peopleService.findPeople(user != null ? user.id : 0);
      if (response !== undefined) {
        setPeople(response);
      }
    }

    findPeople();
  }, []);

  async function Logoff() {
    await singOut();
  }

  function editPerson(id: number) {
    console.log(`Editar pessoa ${id}`);
  }

  function deletePerson(id: number) {
    console.log(`Excluir pessoa ${id}`);
  }

  return (
    <fieldset>
      <div className='page'>
        { isModalMessageVisible ? <ModalMessage props={{message}} onClose={() => {setIsModalMessageVisible(false);}}></ModalMessage> : null }
        <header className='header'>
          <div className='header-logo'>
            <h1 className='header-text'>People Management</h1>
            <img src={logo} alt='logo' className='img-logo'/>
          </div>
        </header>
        <Menu>
          <span onClick={() => {}}><BsPersonFillAdd /> Nova pessoa</span>
          <span onClick={() => {}}><BsFillGearFill /> Configurações</span>
          <span className='btn-exit' onClick={() => Logoff()}><BsBoxArrowLeft /> Sair</span>
        </Menu>
        <div className='content'>
          <h1>Pessoas</h1>
          {
            people.length == 0 ?
            <h4>Nenhuma pessoa cadastrada</h4>
            : 
            <ListGroup className='people-list'>
              {
                people.map(person => 
                  <ListGroup.Item action variant='light'>
                    {person.name}
                    <div className='btns-list'>
                      <BsFillPencilFill onClick={() => editPerson(person.id)} />
                      <BsFillTrashFill onClick={() => deletePerson(person.id)} />
                    </div>
                  </ListGroup.Item>
                )
              }
            </ListGroup>
          }
        </div>
      </div>
    </fieldset>
  );
}

export default Main;
