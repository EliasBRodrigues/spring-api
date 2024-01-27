import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { orderApi } from '../service/OrderApi'
import { parseJwt, handleLogError } from '../service/Helpers'
import { useNavigate } from 'react-router-dom';
import { Message } from 'semantic-ui-react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from '../assets/Logo';

function Signup() {
  const Auth = useAuth()
  const isLoggedIn = Auth.userIsAuthenticated()
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('');
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e, { name, value }) => {
    if (name === 'username') {
      setUsername(value)
    } else if (name === 'password') {
      setPassword(value)
    } else if (name === 'email') {
      setEmail(value)
    } else if (name === 'cpf') {
      setCpf(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(username && password && email && cpf)) {
      setIsError(true)
      setErrorMessage('Por Favor, informe todos os campos!')
      return
    }

    const user = { username, password, email, cpf }

    try {
      const response = await orderApi.signup(user)
      const { accessToken } = response.data
      const data = parseJwt(accessToken)
      const authenticatedUser = { data, accessToken }

      Auth.userLogin(authenticatedUser)

      setUsername('')
      setPassword('')
      setEmail('')
      setCpf('')
      setIsError(false)
      setErrorMessage('')
    } catch (error) {
      handleLogError(error)
      if (error.response && error.response.data) {
        const errorData = error.response.data
        let errorMessage = 'Invalid fields'
        if (errorData.status === 409) {
          errorMessage = errorData.message
        } else if (errorData.status === 400) {
          errorMessage = errorData.errors[0].defaultMessage
        }
        setIsError(true)
        setErrorMessage(errorMessage)
      }
    }
  }

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      navigate("/login");
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoggedIn) {
    return <Navigate to='/' />
  }

  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center'>
        <div className=' w-1/2 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
          <h1 className='mt-4 text-3xl font-bold'>Bem Vindo(a)!</h1>
          <div className='font-medium text-lg text-gray-500 mt-5'>
            {isError && <Message negative>{errorMessage}</Message>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label className='text-lg font-medium'>Nome Usuário</Form.Label>
                <Form.Control className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' fluid autoFocus type="text" placeholder="Este será o seu acesso ao LOGIN" value={username} onChange={(e) => handleInputChange(e, { name: 'username', value: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='text-lg font-medium'>Email</Form.Label>
                <Form.Control className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' type="email" placeholder="Email" value={email} onChange={(e) => handleInputChange(e, { name: 'email', value: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='text-lg font-medium'>Senha</Form.Label>
                <Form.Control className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' type="password" placeholder="Senha" value={password} onChange={(e) => handleInputChange(e, { name: 'password', value: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCpf">
                <Form.Label className='text-lg font-medium'>CPF</Form.Label>
                <Form.Control className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' type="text" placeholder="Apenas Números" value={cpf}
                  onChange={(e) => handleInputChange(e, { name: 'cpf', value: e.target.value })}
                />
              </Form.Group>

              <div className='mt-8 flex justify-between items-center'>
                <Button className='font-medium text-base text-violet-500' variant="primary">
                </Button>
                <Button className='text-blue-800 text-base font-medium ml-2' variant="primary" type="submit" onClick={loginUser}>
                  Já possui Cadastro? Login
                </Button>
              </div>
              <div className='mt-8 flex flex-col gap-y-4'>
                <Button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-teal-500 text-white text-lg font-bold' variant="primary" type="submit">
                  CADASTRAR
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Logo />
    </div>
  )
}

export default Signup