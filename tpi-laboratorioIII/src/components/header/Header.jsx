import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import './header.css';


const Header = () => {
  //Esta compentado porque todabia no estar hecho el router. 
  // const navigate = useNavigate();

  // const handleHomeNavigation = (event)=>{
  //     event.preventDefault();
  //   navigate('/');
  // }

  
  // const handleFormAdminUserNavigation = (event)=>{
    //     event.preventDefault();
    //     navigate('/productList');
    // }
    
    // const handleAddProductNavigation = (event)=>{
    //     event.preventDefault();
    //     navigate('/addProduct');
  
    // }
      // const handleOrderNavigation = (event)=>{
    //     event.preventDefault();
    //     navigate('/order');
  
    // }
       // const handleProductsNavigation = (event)=>{
    //     event.preventDefault();
    //     navigate('/products');
  
    // }  
     // const handleLoginNavigation = (event)=>{
    //     event.preventDefault();
    //     navigate('/login');
  
    // }


  return (
    <div>
      <Container fluid="ml" >
        <Row>
          <Col sm={1}></Col>
          <Col sm={10}>
            <Nav className='Nav-Bar' justify defaultActiveKey={""} bg="dark" data-bs-theme="dark">
              <Navbar.Brand href="">
                {/* <img
                  src="https://i.postimg.cc/02pZMJqD/Horno-Gato-pizza.jpg"
                  width="80"
                  height="70"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                /> */}
                <h3>
                  <Badge bg="success">Pizzeria 👍</Badge>
                </h3>
              </Navbar.Brand>
              <Nav.Item className='Nav-Seccion'>
                <Nav.Link href='' className='nav-link'>Home</Nav.Link>
                {/* onClick={handleHomeNavigation} Ruta para home va dentro de nav.link.. */}
              </Nav.Item>
              <Nav.Item className='Nav-Seccion'>
                <Nav.Link href='' className='nav-link'>Admin Users</Nav.Link>
                {/* onClick={handleAdminUserNavigation} Ruta para Admin users */}
              </Nav.Item>

              <Nav.Item className='Nav-Seccion'>
                <Nav.Link href='' className='nav-link'>Add Product</Nav.Link>
              </Nav.Item>
              <Nav.Item className='Nav-Seccion'>
                <Nav.Link href='' className='nav-link'>Order</Nav.Link>
              </Nav.Item>
              <Nav.Item className='Nav-Seccion'>
                <Nav.Link href='' className='nav-link'>Products</Nav.Link>
              </Nav.Item>
              <Nav.Item className='Nav-Seccion'>
                <Nav.Link href='' className='nav-link'>Login</Nav.Link>
              </Nav.Item>
            </Nav >
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Header
