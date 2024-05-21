import { useRef, useState } from 'react'
import './Login.css'
import { Form, Button, Alert} from 'react-bootstrap'
import { USERS } from '../data/Data'

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

  const usernameHandler = (event) => {
    setErrors({...errors, username: false})
    setEnteredUser(event.target.value)
  }

  const passwordHandler = (event) => {
    setErrors({...errors, password: false})
    setEnteredPass(event.target.value)
  }

  const searchUser = () => {
    const userExists = USERS.some(user => user.username === enteredUser && user.password === enteredPass);
    if (!userExists) {
      setErrors({...errors, exists: true});
    }
  }

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

    searchUser()
    
    setEnteredUser('')
    setEnteredPass('')
  }

  return (
    <div className='login'>
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
          type='text' 
          placeholder='Contraseña' 
          onChange={passwordHandler}
          className={errors.password && "border border-danger"}>

          </Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>Login</Button>
        <Button variant='outline-primary'>Register</Button>
        {errors.exists && <Alert variant='danger' className='mt-3'>Credenciales inválidas</Alert>}
        {(errors.username || errors.password) && <Alert variant='warning' className='mt-3'>Debes completar todos los campos</Alert>}
      </Form>
    </div>
  )
}

export default Login