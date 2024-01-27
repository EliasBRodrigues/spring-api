import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { orderApi } from '../service/OrderApi'
import { parseJwt, handleLogError } from '../service/Helpers'
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Logo from '../assets/Logo';
import { FaArrowLeft } from "react-icons/fa";
function Login() {
  const Auth = useAuth()
  const navigate = useNavigate();
  const isLoggedIn = Auth.userIsAuthenticated()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [signin, setSignin] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(username && password)) {
      setIsError(true)
      return
    }

    try {
      const response = await orderApi.authenticate(username, password)
      const { accessToken } = response.data
      const data = parseJwt(accessToken)
      const authenticatedUser = { data, accessToken }

      Auth.userLogin(authenticatedUser)

      setUsername('')
      setPassword('')
      setSignin(true)
      setIsError(false)
    } catch (error) {
      handleLogError(error)
      setIsError(true)
    }
  }

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      navigate("/register");
    } catch (error) {
      console.log(error)
    }
  }

  const landingPage = async (event) => {
    event.preventDefault();
    try {
      navigate("/home");
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center'>
        <div className='w-1/2 max-w-[700px] bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
        <FaArrowLeft onClick={landingPage}/>

          {isError && <div className='text-white w-full border-2 border-gray-100 rounded-xl p-3 mt-5 bg-red-600'><Alert>Usuário INEXISTENTE ou Senha INVÁLIDA</Alert></div>}
          {signin && <div className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-green-600'><Alert>ACESSO AO SISTEMA</Alert></div>}
          <h1 className='mt-10 text-3xl font-bold'>Bem Vindo(a)!</h1>
          <p className='font-medium text-lg text-gray-500 mt-4'>Seja Bem Vindo(a)! Preencha os campos</p>
          <div className='mt-8'>
            <div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className='text-lg font-medium'>Nome Usuário</Form.Label>
                  <Form.Control className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' type="text"
                    name='username' placeholder="Email" value={username} onChange={(event) => {
                      setUsername(event.target.value)
                    }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className='text-lg font-medium'>Senha</Form.Label>
                  <Form.Control className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' type="password"
                    name='password'
                    placeholder="Senha" value={password} onChange={(event) => {
                      setPassword(event.target.value)
                    }} />
                </Form.Group>

                <div className='mt-8 flex justify-between items-center'>
                  <Button className='font-medium text-base text-violet-500' variant="primary">
                  </Button>
                </div>
                <div className='mt-8 flex flex-col gap-y-4'>
                  <Button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-teal-500 text-white text-lg font-bold' variant="primary" type="submit">
                    LOGIN
                  </Button>
                </div>
                <div className='mt-8 flex justify-center items-center'>
                  <p className='font-medium text-base'>Não possui cadastro?</p>
                  <Button className='text-blue-800 text-base font-medium ml-2' variant="primary" type="submit" onClick={registerUser}>
                    Cadastrar
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Logo />

    </div>
  )
}

export default Login