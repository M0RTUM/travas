import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const logInUser = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    if (username.length === 0) {
      setErrorMessage("Имя пользователя не заполнено!");
    } else if (password.length === 0) {
      setErrorMessage("Пароль не заполнен!");
    } else {
      axios.post('http://127.0.0.1:5000/login', {
        username: username,
        password: password
      })
        .then(function (response) {
          console.log(response);
          const userId = response.data.user_id;
          navigate(`/profile?uid=${userId}`);
        })
        .catch(function (error) {
          console.log(error, 'error');
          if (error.response) {
            if (error.response.status === 401) {
              setErrorMessage("Неверное имя пользователя или пароль.");
            } else {
              setErrorMessage("Произошла ошибка, попробуйте еще раз.");
            }
          } else {
            setErrorMessage("Сервер не отвечает. Проверьте подключение к сети.");
          }
        })
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <Link to="/" className="text-3xl font-bold text-green-600">Travas</Link>
          <Link to="/" className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors">
            На главную
          </Link>
        </div>
      </header>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Войдите в свой аккаунт</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={logInUser}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Имя пользователя</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Имя пользователя"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Пароль</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="mt-4 text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Забыли пароль?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Войти
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Нет аккаунта?{' '}
              <Link to="/register" className="font-medium text-green-600 hover:text-green-500">
                Зарегистрируйтесь
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default LoginPage;
