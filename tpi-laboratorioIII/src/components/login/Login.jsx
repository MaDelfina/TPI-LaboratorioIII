import { useState } from 'react'
import './Login.css'
import { Form, Button} from 'react-bootstrap'
import { USERS } from '../data/Data'

const Login = () => {
  const [enteredUser, setEnteredUser] = useState('')
  const [enteredPass, setEnteredPass] = useState('')

  const usernameHandler = (event) => {
    setEnteredUser(event.target.value)
  }

  const passwordHandler = (event) => {
    setEnteredPass(event.target.value)
  }

  const searchUser = (enteredUser, enteredPass) => {
    for(let user of USERS){
      if(user.username === enteredUser && user.password === enteredPass){
        return true
      }
    }
    return false
  }

  const loginHandler = (event) => {
    event.preventDefault()
    if(!searchUser(enteredUser, enteredPass)) {
      alert("Contraseña incorrecta o Usuario NO encontrado")
    } else {
      alert('Usuario ingresado con éxito')
    }
    setEnteredUser('')
    setEnteredPass('')
  }

  return (
    <div className='login'>
      <Form className='form-login' onSubmit={loginHandler}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control value={enteredUser} type='text' placeholder='Nombre de usuario' onChange={usernameHandler}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control value={enteredPass} type='text' placeholder='Contraseña' onChange={passwordHandler}></Form.Control>
        </Form.Group>
        <Button variant='outline-primary' type='submit'>Login</Button>
      </Form>
    </div>
  )
}

export default Login