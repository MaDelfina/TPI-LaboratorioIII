import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./Footer.css";

const Footer = () => {
    return (
        
            <div className='footer'>
                <Row className='row'>
                    <Col md="4">
                        <h5>Donde encontrarnos: </h5>
                        <ul className="list-unstyled">
                            <li>Facebook</li>
                            <li>Instagram</li>
                        </ul>
                    </Col>
                    <Col md="4">
                        <h5>Enlaces Útiles</h5>
                        <ul className="list-unstyled">
                            <li >Home</li>
                            <li>Carrito</li>
                            <li>Productos</li>
                        </ul>
                    </Col>
                    <Col md="4">
                        <h5>Contacto</h5>
                        <p>Email: info@nombre.com</p>
                        <p>Teléfono: +123-456-789</p>
                    </Col>
                </Row>
            </div>
        
    );
}

export default Footer;
