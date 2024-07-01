import React from 'react'
import { Badge, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    
    const buttonHandler = () => {
        navigate('/')
    }
    
    return (
        <Container fluid='md' style={{backgroundColor: '#fcfcfc', height:'100vh', width:'100vw'}} className="d-flex flex-column justify-content-center align-items-center">
            <h1> Page: <Badge bg="secondary" > Not Found</Badge></h1>
            <img
                src="https://i.postimg.cc/sgYxQyfz/not-Found-Pizzeria.jpg"
                width="600"
                height="600"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
            <Button variant='success' onClick={buttonHandler}>Back to Home Page</Button>
        </Container>
    )
}

export default NotFound
