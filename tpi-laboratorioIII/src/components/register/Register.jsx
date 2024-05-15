import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { USERS } from "../data/Data";
import { useRef } from 'react';
import './Register.css'

function Register() {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [completarCampos, setcompletarCampos] = useState(false);
    const [constraseñaDistinta, setConstraseñaDistinta] = useState(false);
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const emailRef = useRef(null);
    const password1Ref = useRef(null);
    const password2Ref = useRef(null);

    const handlerEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlerPassword1 = (event) => {
        setPassword1(event.target.value)
    }

    const handlerPassword2 = (event) => {
        setPassword2(event.target.value)
    }

    const buttonRegister = (event) => {
        event.preventDefault();

        if (!email || !password1 || !password2) {
            setcompletarCampos(true); //Mostrar la alerta si algún campo está vacío
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
            setConstraseñaDistinta(true);
            return;
        }

        const newClient = {
            id: USERS.length + 1,
            username: email,
            password: password1,
            shopping_carg: [],
            rol: "client"
        }

        setRegistroExitoso(true);

        USERS.push(newClient);
        console.log('Nuevo cliente agregado:', newClient);
        console.log("clientes: ", USERS);
    }

    return (
        <>
            <Form onSubmit={buttonRegister} className='register'>
                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="user" placeholder="Nombre de usuario" value={email} ref={emailRef} onChange={handlerEmail} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password1} ref={password1Ref} onChange={handlerPassword1} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control type="password" placeholder="confirmar contraseña" value={password2} ref={password2Ref} onChange={handlerPassword2} />
                </Form.Group>

                <Button variant="outline-secondary" type="submit">
                    Registrarme
                </Button>

                {registroExitoso && (
                    <Alert variant="success" onClose={() => setRegistroExitoso(false)} dismissible>
                        ¡Registro exitoso!
                    </Alert>
                )}

                {completarCampos && (
                    <Alert variant="danger" onClose={() => setcompletarCampos(false)} dismissible>
                        ¡Falta completar campos!
                    </Alert>
                )}

                {constraseñaDistinta && (
                    <Alert variant="danger" onClose={() => setConstraseñaDistinta(false)} dismissible>
                        ¡Las contraselas no coinciden!
                    </Alert>
                )}
            </Form>
        </>
    )
}

export default Register;