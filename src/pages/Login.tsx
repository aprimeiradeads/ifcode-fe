import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import medicineImg from '../assets/medicine.png';

import Alert from '@mui/material/Alert';


const clientId = '348278684462-f7fnir5fer4hd2b5v2hdpe9530v6cce5.apps.googleusercontent.com';
const apiUrl = 'https://ifcode-be.onrender.com/api/auth/google';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("Atualizado:", import.meta.env);


const Login: React.FC = () => {
    const navigate = useNavigate();
    const [successAlert, setSuccessAlert] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSuccess = (credentialResponse: any) => {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: credentialResponse.credential,
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('token', data.token);
                setSuccessAlert(true);
                setTimeout(() => {
                    setSuccessAlert(false);
                    navigate('/home');
                }, 1500);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleError = () => {
        alert('Erro ao fazer login com Google.');
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="login-container">
                {successAlert && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Login realizado com sucesso!
                    </Alert>
                )}
                <img className="login-image" src={medicineImg} alt="medicamento" />
                <h1 className="login-title">Bem-vindo ao Medica+</h1>
                <p className="login-subtitle">O tempo certo para viver melhor.</p>
                <div className="login-google" style={{ marginTop: 32 }}>
                    <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
