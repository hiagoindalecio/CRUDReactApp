import React, { useContext, useState } from 'react';
import './styles.css';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import PersonalizedModal from '../../Components/PersonalizedModal';

import logo from '../../Assets/logo.png';

import AuthContext from '../../Contexts/auth';

import { User } from '../../Interfaces';

function Configuration() {
  const [isPersonalizedModalVisible, setIsPersonalizedModalVisible] = useState(false);
  const [message, setMessage] = useState<string>('');

  const { updateUser, user } = useContext(AuthContext);
  const navigate = useNavigate(); 

  function getFormControl(form: HTMLFormElement, name: string): HTMLInputElement {
    const control = form.elements.namedItem(name) as HTMLInputElement;
    if (!control || control instanceof RadioNodeList || !('value' in control))
      throw new Error(`Form control '${name}' not found or was a RadioNodeList`);

    return control;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    var nameField = getFormControl(event.currentTarget, 'InputName');
    var emailField = getFormControl(event.currentTarget, 'InputEmail');
    var passwordField = getFormControl(event.currentTarget, 'InputPassword');
    var confirmPasswordField = getFormControl(event.currentTarget, 'InputConfirmPassword');

    if (nameField.value === '' ||
      emailField.value == '' ||
      passwordField.value == '' ||
      confirmPasswordField.value == '') {
      setMessage('Todos os campos devem estar devidamente preenchidos!');
    } else if (passwordField.value !== confirmPasswordField.value ) {
      setMessage('As senhas digitadas não coincidem!');
    } else {
      if (!await updateUser((user as User).id, emailField.value, passwordField.value, nameField.value)) {
        setMessage('Ocorreu um erro ao atualizar os dados do usuário!');
      } else {
        setMessage('Usuário atualizado com sucesso!');
      }
    }

    setIsPersonalizedModalVisible(true);
  }

  return (
    <fieldset>
      { isPersonalizedModalVisible ? <PersonalizedModal message={message} onClose={() => setIsPersonalizedModalVisible(false)} /> : null }
      <header className='header'>
        <div className='header-logo'>
        <h1 className='header-text'>People Management</h1>
        <img src={logo} alt='logo' className='img-logo'/>
        </div>
      </header>
      <BsArrowLeft className='back-button' onClick={() => navigate('/home')} />
      <Form className='form' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='InputName'>
          <Form.Label>Nome</Form.Label>
          <Form.Control type='text' placeholder='Insira o nome' defaultValue={(user as User).name} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='InputEmail'>
          <Form.Label>Endereço de e-mail</Form.Label>
          <Form.Control type='email' placeholder='Insira o e-mail' aria-describedby='emailHelp' defaultValue={(user as User).email} />
          <Form.Text className='text-muted'>Nós nunca iremos compartilhar seu e-mail com ninguém.</Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='InputPassword'>
          <Form.Label>Senha</Form.Label>
          <Form.Control type='password' placeholder='Insira a senha' defaultValue={(user as User).password} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='InputConfirmPassword'>
          <Form.Label>Confirme a senha</Form.Label>
          <Form.Control type='password' placeholder='Insira a confirmação da senha' defaultValue={(user as User).password} />
        </Form.Group>
        <Button variant='primary' type='submit'>Salvar</Button>
      </Form>
    </fieldset>
  );
}

export default Configuration;