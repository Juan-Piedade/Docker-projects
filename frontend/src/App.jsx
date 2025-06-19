import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'register';

    try {
      const response = await axios.post(`http://localhost:5000/${endpoint}`, {
        email,
        password,
      });

      if (isLogin && response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        alert('Login realizado com sucesso!');
      } else {
        alert('Cadastro realizado com sucesso!');
        setIsLogin(true);
      }
    } catch (err) {
      alert('Erro: ' + err.response?.data || err.message);
    }
  };

{/*Tabela e campos de preenchimento*/}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Cadastro'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-2 border rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/*Butão de submit*/}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? 'Cadastre-se' : 'Faça login'}
          </button>
        </p>
        {token && (
          <div className="mt-4 text-xs break-words bg-gray-100 p-2 rounded">
            Token: {token}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;