import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css';

import AuthContext from '../../Contexts/auth';

import ModalMessage from '../../Components/ModalMessages';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import logo from '../../Assets/logo.png';

const Login: React.FC = () => {
  const { singIn, createUser } = useContext(AuthContext);
  const [secondEmail, setSecondEmail] = useState<JSX.Element>();
  const [secondPassword, setSecondPassword] = useState<JSX.Element>();
  const [nameUser, setNameUser] = useState<JSX.Element>();
  const [action, setAction] = useState<String>('Entrar');
  const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  let navigate = useNavigate();

  function getFormControl(form: HTMLFormElement, name: string): HTMLInputElement {
    const control = form.elements.namedItem(name) as HTMLInputElement;
    if (!control || control instanceof RadioNodeList || !("value" in control))
        throw new Error(`Form control "${name}" not found or was a RadioNodeList`);

    return control;
  } 

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    var emailField = getFormControl(event.currentTarget, 'InputEmail1');
    
    /*if($("input[type=email][name=email]").val() as string !== '' && $("input[type=password][name=password]").val() as string !== '') {
      if(action === 'Entrar') {
        var done = await singIn($("input[type=email][name=email]").val() as string, ($("input[type=password][name=password]").val() as string));
        if(done !== 'Sucesso!') {
          alert(done.toString());
          //setIsModalMessageVisible(true);
        }
      } else if (action === 'Criar conta') {
        if(($("input[type=email][name=email]").val() as string) === ($("input[type=email][name=email2]").val() as string) && ($("input[type=password][name=password]").val() as string) === ($("input[type=password][name=password2]").val() as string) && ($("input[type=text][name=nameUser]").val() as string) !== '') {
          const reply = await createUser(($("input[type=email][name=email]").val() as string), ($("input[type=password][name=password]").val() as string), ($("input[type=text][name=nameUser]").val() as string), selectedFile as File);
          alert(reply.toString());
          //setIsModalMessageVisible(true);
        } else if (($("input[type=email][name=email]").val() as string) !== ($("input[type=email][name=email2]").val() as string)) {
          setMessage('Os dois endereços de e-mail devem ser indênticos!');
          setIsModalMessageVisible(true);
        } else if (($("input[type=password][name=password]").val() as string) !== ($("input[type=password][name=password2]").val() as string)) {
          setMessage('Os dois campos de senha devem ser idênticos!');
          setIsModalMessageVisible(true);
        } else if (($("input[type=text][name=nameUser]").val() as string) === '') {
          setMessage('Você deve preencher o campo de nome!');
          setIsModalMessageVisible(true);
        }
      }
    } else {
      setMessage('Os campos e-mail e senha devem estar preenchidos!');
      setIsModalMessageVisible(true);
    }*/
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
      <div id="login-page">
        { isModalMessageVisible ? <ModalMessage props={{message}} onClose={() => {setIsModalMessageVisible(false);}}></ModalMessage> : null }
        <header className="header">
          <div className="header-logo">
            <h1 className="header-text">People Management</h1>
            <img src={logo} alt="logo" className="img-logo"/>
          </div>
        </header>
        <Form className='form-login' onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)}>
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