import React from 'react'
import { Badge, Container } from 'react-bootstrap'

const NotFound = () => {
    
    return (
        <Container fluid='md' style={{backgroundColor: '#fcfcfc', height:'100vh', width:'100vw'}}>
            <h1> Page: <Badge bg="secondary" > Not Found</Badge></h1>
            <img
                src="https://i.postimg.cc/sgYxQyfz/not-Found-Pizzeria.jpg"
                width="600"
                height="600"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
        </Container>
    )
}

export default NotFound
