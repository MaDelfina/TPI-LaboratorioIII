import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import './Register.css'

function Register() {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [completeFields, setcompleteFields] = useState(false);
    const [differentPassword, setDifferentPassword] = useState(false);
    const [correctRegister, setCorrectRegister] = useState(false);
    const [existingUser, setExistingUser] = useState(false);
    const emailRef = useRef(null);
    const password1Ref = useRef(null);
    const password2Ref = useRef(null);
    const navigate = useNavigate()

    const handlerEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlerPassword1 = (event) => {
        setPassword1(event.target.value)
    }

    const handlerPassword2 = (event) => {
        setPassword2(event.target.value)
    }

    const userExists = async (email, password) => {
        try {
            const response = await fetch(`http://localhost:8000/api/users`);
            const users = await response.json();
            return users.some(user => user.username === email && user.password === password);
        } catch (error) {
            console.error("Error fetching users:", error);
            return false;
        }
    };

    const buttonRegister = async (event) => {
        event.preventDefault();

        if (!email || !password1 || !password2) {
            setcompleteFields(true);
            if (!email){
                emailRef.current.focus()
            } else if (!password1){
                password1Ref.current.focus();
            }
            else if (!password2){
                password2Ref.current.focus();
            }
            return;
        }

        if (password1 != password2) {
            setDifferentPassword(true);
            return;
        }

        if (await userExists(email, password1)) {
            setExistingUser(true);
            return;
        }

        const newClient = {
            username: email,
            password: password1,
            shopping_carg: [],
            rol: "client"
        }

        try {
            const response = await fetch(`http://localhost:8000/api/users`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(newClient),
            });

            if (response.ok) {
                setCorrectRegister(true);
                console.log('Nuevo cliente agregado:', newClient);
            } else if (response.status === 409) {
                setExistingUser(true);
            } else {
                console.log('Error al registrar el usuario');
            }
        } catch (error) {
            console.log("Error al registrar el usuario: ", error);
        }
    }

    const loginButtonHandler = () =>{
        navigate("/login")
    }

    return (
        <>
            <Form onSubmit={buttonRegister} className='register'>
                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="user" placeholder="Nombre de usuario" value={email} ref={emailRef} onChange={handlerEmail} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword1">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password1} ref={password1Ref} onChange={handlerPassword1} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control type="password" placeholder="confirmar contraseña" value={password2} ref={password2Ref} onChange={handlerPassword2} />
                </Form.Group>

                <Button variant="outline-secondary" type="submit">
                    Registrarme
                </Button>
                <hr />
                <Button variant="outline-secondary" type="submit" onClick={loginButtonHandler}>
                    Iniciar sesion
                </Button>

                {correctRegister && (
                    <Alert variant="success" onClose={() => setCorrectRegister(false)} dismissible>
                        ¡Registro exitoso!
                    </Alert>
                )}

                {completeFields && (
                    <Alert variant="danger" onClose={() => setcompleteFields(false)} dismissible>
                        ¡Falta completar campos!
                    </Alert>
                )}

                {differentPassword && (
                    <Alert variant="danger" onClose={() => setDifferentPassword(false)} dismissible>
                        ¡Las contraselas no coinciden!
                    </Alert>
                )}

                {existingUser && (
                    <Alert variant='danger' onClose={() => setExistingUser(false)} dismissible>
                        !Usuario ya existete!
                    </Alert>
                )}
            </Form>
        </>
    )
}

export default Register;