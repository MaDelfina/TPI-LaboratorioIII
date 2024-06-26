import React, { useRef, useState } from 'react'
import './AddNewAdmin.css'
import { Badge, Button, Container, Form, Alert } from 'react-bootstrap'

const AddNewAdmin = ({ usersArray, onAddAdmin }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const [errors, setErrors] = useState({
        username: false,
        password: false,
        exists: false,
    })
    const [showForm, setShowForm] = useState(false)

    const usernameHandler = (event) => {
        setErrors({ ...errors, username: false })
        setUsername(event.target.value)
    }

    const passwordHandler = (event) => {
        setErrors({ ...errors, password: false })
        setPassword(event.target.value)
    }

    const showFormHandler = () => {
        setShowForm(!showForm)
    }

    const submitUserHandler = async (event) => {
        event.preventDefault()
        setErrors({ ...errors, exists: false, username: false, password: false })

        if (username.length === 0) {
            usernameRef.current.focus()
            setErrors({ ...errors, username: true })
            return
        }

        if (password.length === 0) {
            passwordRef.current.focus()
            setErrors({ ...errors, password: true })
            return
        }

        if (usersArray.some(user => user.username === username && user.password === password)) {
            setErrors({ ...errors, exists: true })
            setUsername('')
            setPassword('')
            return
        }

        await addNewAdminUser();
        setUsername('')
        setPassword('')
    }

    const addNewAdminUser = async () => {
        const newAdmin = {
            username,
            password
        }

        try {
            const response = await fetch(`https://localhost:7044/api/User/CreateAdmin`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(newAdmin),
            });

            const data = await response.json()

            if (response.ok) {
                console.log('Nuevo administrador agregado:', data);
                onAddAdmin(data)
            } else {
                setErrors({ ...errors, exists: true });
                console.log('Error al agregar un administrador');
            }
        } catch (error) {
            console.log("Error al agregar un administrador: ", error);
        }
    }

    return (
        <div className='mt-2'> 
            <Button variant='secondary' onClick={showFormHandler} className='mb-2'>
                {showForm ? 'Hide' : 'Add User'}
            </Button>
            {showForm && (
                <Container className='form-container'>
                    <Form className='d-flex flex-column align-items-center' onSubmit={submitUserHandler}>
                        <h2><Badge bg='secondary'>New Admin</Badge></h2>
                        <Form.Group style={{ width: "300px" }}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ingrese el nombre del usuario'
                                ref={usernameRef}
                                value={username}
                                onChange={usernameHandler}
                                className={errors.username && "border border-danger"}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group style={{ width: "300px" }}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Ingrese la contraseña'
                                ref={passwordRef}
                                value={password}
                                onChange={passwordHandler}
                                className={errors.password && "border border-danger"}>

                            </Form.Control>
                        </Form.Group>
                        <Button className='mt-3' variant='dark' type='submit'>Add User Admin</Button>
                        {errors.exists && <Alert variant='danger' className='mt-3'>El usuario ingresado ya existe!</Alert>}
                        {(errors.username || errors.password) && <Alert variant='warning' className='mt-3'>Debes completar todos los campos</Alert>}
                    </Form>
                </Container>

            )}
        </div>
    )
}

export default AddNewAdmin