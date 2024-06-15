import React from 'react'
import { Badge } from 'react-bootstrap'

const NotFound = () => {
    
    return (
        <div style={{backgroundColor: '#fcfcfc', height:'50vh', width:'50vw'}}>
            <h1> Page: <Badge bg="secondary" > Not Found</Badge></h1>
            <img
                src="https://i.postimg.cc/sgYxQyfz/not-Found-Pizzeria.jpg"
                width="600"
                height="600"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
        </div>
    )
}

export default NotFound
