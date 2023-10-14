import React, { useContext, useEffect, useState } from 'react';
import './styles.css';

import logo from '../../Assets/logo.png';

import PersonalizedModal from '../../Components/PersonalizedModal';
import ListGroup from 'react-bootstrap/ListGroup';
import { slide as Menu } from 'react-burger-menu';
import { 
  BsFillPencilFill, 
  BsFillTrashFill,
  BsBoxArrowLeft,
  BsFillGearFill,
  BsPersonFillAdd
} from 'react-icons/bs';

import AuthContext from '../../Contexts/auth';

import * as peopleService from '../../Services/people';
import { Person, User } from '../../Interfaces';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Main() {
  const { singOut, user } = useContext(AuthContext);
  const [message, setMessage] = useState<string>('');
  const [people, setPeople] = useState<Person[]>([]);

  const [isPersonalizedModalVisible, setIsPersonalizedModalVisible] = useState(false);
  const [editingModal, setEditingModal] = useState(<></>);
  const [deleteConfirmingModal, setDeleteConfirmingModal] = useState(<></>);

  const navigate = useNavigate(); 

  useEffect(() => {
    async function findPeople() {
      const response = await peopleService.findPeople(user != null ? user.id : 0);
      if (response !== undefined)
        setPeople(response);
    }

    findPeople();
  }, []);

  function getFormControl(form: HTMLFormElement, name: string): HTMLInputElement {
    const control = form.elements.namedItem(name) as HTMLInputElement;
    if (!control || control instanceof RadioNodeList || !('value' in control))
        throw new Error(`Form control '${name}' not found or was a RadioNodeList`);

    return control;
  }

  async function logoff() {
    await singOut();
  }

  function editPerson(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    var idField = getFormControl(event.currentTarget, 'InputId');
    var nameField = getFormControl(event.currentTarget, 'InputName');
    var ageField = getFormControl(event.currentTarget, 'InputAge');

    if (nameField.value !== ''
      && ageField.value !== '') {
      console.log(nameField.value, ageField.value, idField.value);
      setEditingModal(<></>);
    } else {
      setMessage('Os campos de nome e idade devem estar preenchidos!');
      setIsPersonalizedModalVisible(true);
    }
  }

  function openEditPersonModal(person: Person) {
    setEditingModal(
      <PersonalizedModal
        title='Edição de Pessoa'
        hasConfirmButton={true}
        confirmButtonType='submit'
        confirmButtonForm='editPersonForm'
        onClose={() => setEditingModal(<></>)}
        children={
          <Form id='editPersonForm' onSubmit={editPerson}>
            <Form.Group controlId='InputId' className='not-visible'>
              <Form.Control type='number' defaultValue={person.id} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='InputName'>
              <Form.Label>Nome</Form.Label>
              <Form.Control type='text' placeholder='Insira o nome' defaultValue={person.name} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='InputAge'>
              <Form.Label>Idade</Form.Label>
              <Form.Control type='number' placeholder='Insira a idade' defaultValue={person.age} />
            </Form.Group>
          </Form>
        } />
    );
  }

  function deletePerson(idPerson: number) {
    console.log(`Pessoa deletada: ${idPerson}`)
    setDeleteConfirmingModal(<></>);
  }

  function openDeletePersonModal(person: Person) {
    setDeleteConfirmingModal(
      <PersonalizedModal
        message={`Deseja realmente excluir o(a) ${person.name}?`}
        title='Exclusão de Pessoa'
        hasConfirmButton={true}
        onClose={() => setDeleteConfirmingModal(<></>)}
        onConfirm={() => deletePerson(person.id)} />
    );
  }

  return (
    <fieldset>
      <div className='page'>
        { deleteConfirmingModal }
        { editingModal }
        { isPersonalizedModalVisible ? <PersonalizedModal message={message} onClose={() => {setIsPersonalizedModalVisible(false);}} /> : null }
        <header className='header'>
          <div className='header-logo'>
            <h1 className='header-text'>People Management</h1>
            <img src={logo} alt='logo' className='img-logo'/>
          </div>
        </header>
        <Menu>
          <span className='user-name'>Bem vindo {(user as User).name}</span>
          <span onClick={() => {}}><BsPersonFillAdd /> Nova pessoa</span>
          <span onClick={() => navigate('/config')}><BsFillGearFill /> Configurações</span>
          <span className='btn-exit' onClick={() => logoff()}><BsBoxArrowLeft /> Sair</span>
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
                  <ListGroup.Item action variant='light' key={person.id}>
                    {person.name}
                    <div className='btns-list'>
                      <BsFillPencilFill onClick={() => openEditPersonModal(person)} />
                      <BsFillTrashFill onClick={() => openDeletePersonModal(person)} />
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