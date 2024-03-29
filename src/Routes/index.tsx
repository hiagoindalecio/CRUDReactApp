import React, { useContext } from 'react';

import AuthContext from '../Contexts/auth';

import styled, { keyframes } from 'styled-components'

import logo from '../Assets/logo.png';

import SignedRoutes from './signed.routes';
import DefaultRoutes from './default.routes';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
  .img-logo {
    max-width:123px;
    max-height:123px;
    width: auto;
    height: auto;
  }
`;

const Routes: React.FC = () => {
  const { signed, loading: authLoading } = useContext(AuthContext);

  if (authLoading)
    return (
      <div>
        <Rotate>
          {<img src={logo} alt="logo" className="img-logo-loading"/>}
        </Rotate>
        <h3 style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>Carregando...</h3>
      </div>
    );

  return signed ? <SignedRoutes /> : <DefaultRoutes />;
};

export default Routes;