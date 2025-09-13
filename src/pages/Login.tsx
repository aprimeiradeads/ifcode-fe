import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import medicineImg from '../assets/medicine.png';


const clientId = '348278684462-f7fnir5fer4hd2b5v2hdpe9530v6cce5.apps.googleusercontent.com';

const Login: React.FC = () => {
    const handleSuccess = (credentialResponse: unknown) => {
        alert('Login realizado com sucesso!');
        console.log(credentialResponse);
    };

    const handleError = () => {
        alert('Erro ao fazer login com Google.');
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="login-container">
                <img className="login-image" src={medicineImg} alt="medicamento" />
                <h1 className="login-title">Bem-vindo ao Medica+</h1>
                <p className="login-subtitle">O tempo certo para viver melhor.</p>
                <div className="login-google">
                    <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
