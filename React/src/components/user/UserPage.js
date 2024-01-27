import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Form, Button } from 'semantic-ui-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../service/Navbar';
import axios from 'axios';

function UserPage() {
  const Auth = useAuth();
  const user = Auth.getUser();
  const isUser = user.data.rol[0] === 'USER';

  const [id, setId] = useState('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function update(event) {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/update/${username}`,
        {
          username: username,
          password: password,
        });
      alert("Senha Alterada com SUCESSO");
      setId("");
      setUsername("");
      setPassword("");
    }
    catch (error) {
      alert("Senha Não Alterada");
    }
  }

  if (!isUser) {
    return <Navigate to='/' />;
  }

  return (
    <Container>
      <Navbar />
      <Form>
        <Form className="mb-3">
          <label className='text-lg font-medium'>Nome Usuário</label>
          <input
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            type="text"
            name="newUsername"
            placeholder='INFORME O NOME DE USUÁRIO USADO NO LOGIN'
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
        </Form>
        <Form className="mb-3">
          <label className='text-lg font-medium'>Nova Senha</label>
          <input
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            type="password"
            name="newPassword"
            placeholder='INFORME A NOVA SENHA'
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
        </Form>
        <Button className='font-medium text-base text-teal-500' type="button" onClick={update}>Update User</Button>
      </Form>
    </Container>
  );
}

export default UserPage;