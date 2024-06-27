import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import './Register.css'

function Register() {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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

    const buttonRegister = async (event) => {
        event.preventDefault();

        if (!email || !password1 || !password2) {
            setcompleteFields(true);
            if (!email) {
                emailRef.current.focus()
            } else if (!password1) {
                password1Ref.current.focus();
            } else if (!password2) {
                password2Ref.current.focus();
            }
            return;
        }

        if (password1 != password2) {
            setDifferentPassword(true);
            return;
        }

        const newClient = {
            username: email,
            password: password1
        }

        try {
            const response = await fetch(`https://localhost:7044/api/User/CreateClient`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(newClient),
            });

            if (response.ok) {
                setCorrectRegister(true);
                setErrorMessage("");
                setExistingUser(false);
                console.log('Nuevo cliente agregado:', newClient);
            } else {
                const data = await response.json();
                setErrorMessage(data.message);
                setExistingUser(true);
                setErrorMessage("Error al registrar el usuario: " + error.message);

            }
        } catch (error) {
            setErrorMessage("Error al registrar el usuario: " + error.message);
        }
    }

    const loginButtonHandler = () => {
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

                <Button variant="outline-primary" type="submit">
                    Registrarme
                </Button>
                <hr />
                <Button variant="outline-primary" type="submit" onClick={loginButtonHandler}>
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
                        {errorMessage}
                    </Alert>
                )}
            </Form>
        </>
    )
}

export default Register;