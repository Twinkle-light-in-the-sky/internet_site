import React, { useState } from 'react';
import '../../styles/AuthRegpage.css'

interface FormValues {
    username: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegistrationPage: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Partial<FormValues>>({});
    const [serverMessage, setServerMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = (): boolean => {
        const newErrors: Partial<FormValues> = {};
        const { username, phone, email, password, confirmPassword } = formValues;

        if (!/^[a-zA-Z0-9]{4,16}$/.test(username)) {
            newErrors.username = 'Логин должен содержать 4-16 символов и не должен содержать специальные символы';
        }
        if (!/^\+?\d{10,15}$/.test(phone)) {
            newErrors.phone = 'Телефон должен содержать от 10 до 15 цифр';
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Введите корректный адрес электронной почты';
        }
        if (password.length < 8) {
            newErrors.password = 'Пароль должен содержать не менее 8 символов';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerMessage('');
        if (validate()) {
            console.log('Отправляю данные:', formValues);
            try {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setServerMessage(data.message);
                } else {
                    const errorData = await response.json();
                    console.error('Ошибка сервера:', errorData);
                    setServerMessage('Ошибка сервера: ' + errorData.message);
                }
            } catch (error) {
                console.error('Ошибка при отправке данных:', error);
                setServerMessage('Ошибка при отправке данных: ' + error);
            }
        }
    };
    
    

    return (
        <main className='d-flex align-items-center justify-content-center w-100'>
            <form className='form d-flex flex-column mt-5' onSubmit={handleSubmit}>
                <div>
                    <h1>Регистрация</h1>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Логин</label>
                    <input
                        type="text"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        id="username"
                        name="username"
                        value={formValues.username}
                        onChange={handleChange}
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Телефон</label>
                    <input
                        type="text"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        id="phone"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Адрес электронной почты</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Повторите пароль</label>
                    <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Проверить меня</label>
                </div>
                <div>{serverMessage && <p>{serverMessage}</p>}</div>
                <button type="submit" className="btn btn-primary">Создать аккаунт</button>
            </form>
        </main>
    );
};

export default RegistrationPage;

