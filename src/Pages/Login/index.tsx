import React, { useState, useContext } from 'react';
import './styles.css';

import logo from '../../Assets/logo.png';

import AuthContext from '../../Contexts/auth';

import PersonalizedModal from '../../Components/PersonalizedModal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Login: React.FC = () => {
  const { singIn, createUser } = useContext(AuthContext);
  const [secondEmail, setSecondEmail] = useState<JSX.Element>();
  const [secondPassword, setSecondPassword] = useState<JSX.Element>();
  const [nameUser, setNameUser] = useState<JSX.Element>();
  const [action, setAction] = useState<String>('Entrar');
  const [isPersonalizedModalVisible, setIsPersonalizedModalVisible] = useState(false);
  const [message, setMessage] = useState<string>('');

  function getFormControl(form: HTMLFormElement, name: string): HTMLInputElement {
    const control = form.elements.namedItem(name) as HTMLInputElement;
    if (!control || control instanceof RadioNodeList || !("value" in control))
        throw new Error(`Form control "${name}" not found or was a RadioNodeList`);

    return control;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    var emailField = getFormControl(event.currentTarget, 'InputEmail1');
    var passwordField = getFormControl(event.currentTarget, 'InputPassword1');
    
    if (action === 'Entrar') {
      if (emailField.value !== '' 
        && passwordField.value !== '') {
          if (!await singIn(emailField.value, passwordField.value)) {
            setMessage('E-mail ou senha digitados incorretamente.');
            setIsPersonalizedModalVisible(true);
          }
      } else {
        setMessage('Os campos de e-mail e senha devem estar preenchidos!');
        setIsPersonalizedModalVisible(true);
      }
    } else if (action === 'Criar conta') {
      var emailConfirmationField = getFormControl(event.currentTarget, 'InputEmail2');
      var passwordConfirmationField = getFormControl(event.currentTarget, 'InputPassword2');
      var nameField = getFormControl(event.currentTarget, 'InputName');

      if (emailField.value === '' || emailConfirmationField.value == '') {
        setMessage('Os dois campos de e-mail devem estar preenchidos!');
        setIsPersonalizedModalVisible(true);
      } else if (nameField.value === '') {
        setMessage('O campo de nome deve estar preenchido!');
        setIsPersonalizedModalVisible(true);
      } else if (passwordField.value === '' || passwordConfirmationField.value == '') {
        setMessage('Os dois campos de senha devem estar preenchidos!');
        setIsPersonalizedModalVisible(true);
      } else if (emailField.value !== emailConfirmationField.value) {
        setMessage('Os dois endereços de e-mail devem ser indênticos!');
        setIsPersonalizedModalVisible(true);
      } else if (passwordField.value !== passwordConfirmationField.value) {
        setMessage('Os dois campos de senha devem ser idênticos!');
        setIsPersonalizedModalVisible(true);
      } else if (emailField.value === emailConfirmationField.value
        && passwordField.value === passwordConfirmationField.value 
        && nameField.value !== '') {
        const reply = await createUser(emailField.value, passwordField.value, nameField.value);
        alert(reply);
      }
    }
  }

  function handleChange(actionText: String) {
    if(actionText === 'option1') {
      setAction('Entrar');

      setSecondEmail(<div />);
      setSecondPassword(<div />);
      setNameUser(<div />);
    } else if (actionText === 'option2') {
      setAction('Criar conta');

      setSecondEmail(
        <Form.Group className="mb-3" controlId="InputEmail2">
          <Form.Label>Confime seu e-mail</Form.Label>
          <Form.Control type="email" placeholder="Confime seu e-mail" aria-describedby="emailHelp" />
          <Form.Text className="text-muted">Nós nunca iremos compartilhar seu e-mail com ninguém.</Form.Text>
        </Form.Group>
      );
      setSecondPassword(
        <Form.Group className="mb-3" controlId="InputPassword2">
          <Form.Label>Confime sua senha</Form.Label>
          <Form.Control type="password" placeholder="Confime sua senha" />
        </Form.Group>
      );
      setNameUser(
        <Form.Group className="mb-3" controlId="InputName">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Informe seu nome"/>
        </Form.Group>
      );
    }
  }

  return(
    <fieldset>
      <div className='page'>
        { isPersonalizedModalVisible ? <PersonalizedModal message={message} onClose={() => setIsPersonalizedModalVisible(false)} /> : null }
        <header className="header">
          <div className="header-logo">
            <h1 className="header-text">People Management</h1>
            <img src={logo} alt="logo" className="img-logo"/>
          </div>
        </header>
        <Form className='form' onSubmit={handleSubmit}>
          { nameUser }
          <Form.Group className="mb-3" controlId="InputEmail1">
            <Form.Label>Endereço de e-mail</Form.Label>
            <Form.Control type="email" placeholder="Insira o e-mail" aria-describedby="emailHelp" />
            <Form.Text className="text-muted">Nós nunca iremos compartilhar seu e-mail com ninguém.</Form.Text>
          </Form.Group>
          { secondEmail }
          <Form.Group className="mb-3" controlId="InputPassword1">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Insira a senha" />
          </Form.Group>
          { secondPassword }
          <Button variant="primary" type="submit">
            { action }
          </Button>
          <Form.Check
            inline
            label='Tenho um conta'
            name='group1'
            type='radio'
            defaultChecked={true}
            onChange={() => handleChange('option1')}
          />
          <Form.Check
            inline
            label='Não tenho uma conta'
            name='group1'
            type='radio'
            onChange={() => handleChange('option2')}
          />
        </Form>
      </div>
    </fieldset>
  );
}

export default Login;