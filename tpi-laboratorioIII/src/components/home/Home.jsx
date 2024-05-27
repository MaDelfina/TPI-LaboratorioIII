import React from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css';

const Home = () => {
    return (
        <Container fluid className="home-container">
            <Row className="justify-content-center align-items-center min-vh-100 bg-dark text-light text-center">
                <Col md={8} lg={6}>
                    <Card className="bg-transparent border-0">
                        <Card.Body>
                            <Card.Title className="display-4">Bienvenidos a Pizzería La Mejor</Card.Title>
                            <Card.Text className="lead">
                                Desde 1999, Pizzería La Mejor ha sido el lugar favorito de los amantes de la pizza en la ciudad. Lo que comenzó como un pequeño negocio familiar ha crecido hasta convertirse en un punto de referencia para quienes busca permitido mantenernos en la cima durante más de dos décadas.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
            <Carousel controls={false} indicators={false} interval={2000} className="image-carousel">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Pizza 1"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://images.pexels.com/photos/7595967/pexels-photo-7595967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Pizza 2"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://images.pexels.com/photos/4001871/pexels-photo-4001871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Pizza 3"
                        />
                    </Carousel.Item>
                </Carousel>
            </Row>
        </Container>
    );
};

export default Home;