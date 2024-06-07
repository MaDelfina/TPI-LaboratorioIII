import { useContext, useRef, useState } from 'react'
import './Login.css'
import { Form, Button, Alert, Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext'

const Login = () => {
  const [enteredUser, setEnteredUser] = useState('')
  const [enteredPass, setEnteredPass] = useState('')
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    exists: false,
  })
  const navigate = useNavigate()

  const {handleLogin, users} = useContext(AuthenticationContext)

  const usernameHandler = (event) => {
    setErrors({...errors, username: false})
    setEnteredUser(event.target.value)
  }

  const passwordHandler = (event) => {
    setErrors({...errors, password: false})
    setEnteredPass(event.target.value)
  }

  const foundUser = users.find((u) => u.username === enteredUser && u.password === enteredPass)

  const loginHandler = (event) => {
    event.preventDefault()
    setErrors({...errors, exists: false})

    if(enteredUser.length === 0){
      usernameRef.current.focus()
      setErrors({...errors, username: true})
      return
    }

    if(enteredPass.length === 0){
      passwordRef.current.focus()
      setErrors({...errors, password: true})
      return
    }

    if(foundUser){
      if(foundUser.rol === 'client'){
        handleLogin(enteredUser, foundUser.rol, foundUser.shopping_cart)
      } else{
        handleLogin(enteredUser, foundUser.rol)
      }
    } else {
      setErrors({ ...errors, exists: true })
      setEnteredUser('')
      setEnteredPass('')
      return
    }
    
    navigate('/')

    setEnteredUser('')
    setEnteredPass('')
  }

  const registerButtonHandler = () => {
    navigate('/register')
  }

  return (
    <Container className='login'>
      <Form className='form-login' onSubmit={loginHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control 
          ref={usernameRef} 
          value={enteredUser} 
          type='text' 
          placeholder='Nombre de usuario' 
          onChange={usernameHandler}
          className={errors.username && "border border-danger"}>

          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          ref={passwordRef} 
          value={enteredPass} 
          type='password' 
          placeholder='Contraseña' 
          onChange={passwordHandler}
          className={errors.password && "border border-danger"}>

          </Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>Login</Button>
        <p className='mt-3'>¿Todavía no estás registrado?</p>
        <Button variant='outline-primary' onClick={registerButtonHandler}>Go To Register</Button>
        {errors.exists && <Alert variant='danger' className='mt-3'>Credenciales inválidas</Alert>}
        {(errors.username || errors.password) && <Alert variant='warning' className='mt-3'>Debes completar todos los campos</Alert>}
      </Form>
    </Container>
  )
}

export default Login