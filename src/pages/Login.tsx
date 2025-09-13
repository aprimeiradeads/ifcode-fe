import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = '348278684462-f7fnir5fer4hd2b5v2hdpe9530v6cce5.apps.googleusercontent.com'; // TODO: Replace with your Google OAuth Client ID

const Login: React.FC = () => {
  const handleSuccess = (credentialResponse: unknown) => {
    // Handle login success, e.g., send credentialResponse.credential to backend
    alert('Login realizado com sucesso!');
    console.log(credentialResponse);
  };

  const handleError = () => {
    alert('Erro ao fazer login com Google.');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <img src="/medicine.png" alt="medicamento" />
        <h1>Bem-vindo ao IFCode Saúde</h1>
        <p>Ajuda para idosos no uso de medicamentos</p>
        <div style={{ marginTop: 20 }}>
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
