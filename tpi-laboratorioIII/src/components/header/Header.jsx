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
  const navigate = useNavigate();

  const handleHomeNavigation = (event)=>{
      event.preventDefault();
    navigate('/');
  }

  
  const handleAdminUserNavigation = (event)=>{
        event.preventDefault();
        navigate('/adminUser');
    }
    
    const handleAddProductNavigation = (event)=>{
        event.preventDefault();
        navigate('/addProduct');
  
    }
      const handleOrderNavigation = (event)=>{
        event.preventDefault();
        navigate('/order');
  
    }
       const handleProductsNavigation = (event)=>{
        event.preventDefault();
        navigate('/products');
  
    }  
     const handleLoginNavigation = (event)=>{
        event.preventDefault();
        navigate('/login');
  
    }


  return (
    <div>
      <Container fluid="ml" >
        <Row >
          <Col sm={1}></Col>
          <Col sm={10}>
            <Nav className='Nav-Bar' justify defaultActiveKey={""} bg="dark" data-bs-theme="dark">
              <Navbar.Brand href="" onClick={handleHomeNavigation}>
                {/* <img
                  src="https://i.postimg.cc/02pZMJqD/Horno-Gato-pizza.jpg"
                  width="80"
                  height="70"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />  PARA AGREGAR UNA IMG SI SE ENCUENTRA UNA PARA EL LOGO  */}
                <h3>
                  <Badge bg="success">Pizzeria 👍</Badge>
                </h3>
              </Navbar.Brand>
              <Nav.Item className='Nav-Seccion'>
                <Nav.Link href='' className='nav-link' onClick={handleHomeNavigation} >Home</Nav.Link>
                
              </Nav.Item>
              <Nav.Item className='Nav-Seccion'>
                <Nav.Link href='' className='nav-link' onClick={handleAdminUserNavigation}>Admin Users</Nav.Link>
              </Nav.Item>

              <Nav.Item className='Nav-Seccion'>
                <Nav.Link href='' className='nav-link' onClick={handleAddProductNavigation}>Add Product</Nav.Link>
              </Nav.Item>
              <Nav.Item className='Nav-Seccion'>
                <Nav.Link href='' className='nav-link' onClick={handleOrderNavigation}>Order</Nav.Link>
              </Nav.Item>
              <Nav.Item className='Nav-Seccion'>
                <Nav.Link href='' className='nav-link' onClick={handleProductsNavigation}>Products</Nav.Link>
              </Nav.Item>
              <Nav.Item className='Nav-Seccion'>
                <Nav.Link href='' className='nav-link' onClick={handleLoginNavigation}>Login</Nav.Link>
              </Nav.Item>
            </Nav >
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Header