import React, { useState } from 'react';
import { useUser  } from '../../contextAPI/contextAPI';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthRegpage.css'
interface AuthorizationPageProps {}


const AuthorizationPage: React.FC<AuthorizationPageProps> = () => {
    const { login } = useUser ();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!email || !password) {
            setErrorMessage('Пожалуйста, заполните все поля.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Ошибка авторизации';
                throw new Error(errorMessage);
            }
    
            const data = await response.json();
            console.log('Успешная авторизация:', data);
            setErrorMessage(null);
    
            const user = { name: data.user.name, email, phone: data.user.phone };
            localStorage.setItem('user', JSON.stringify(user));
    
            login(user);
    

            navigate('/');
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };
    

    return (
        <main className="d-flex align-items-center justify-content-center w-100 min-h-screen">
            <form className="form d-flex flex-column mt-5" onSubmit={handleSubmit}>
                <div>
                    <h1>Авторизация</h1>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Адрес электронной почты</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Войти</button>
            </form>
        </main>
    );
};

export default AuthorizationPage;
