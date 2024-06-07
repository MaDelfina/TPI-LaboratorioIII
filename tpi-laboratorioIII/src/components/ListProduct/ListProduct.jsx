import React, { useState, useEffect } from 'react';
import { Accordion, Container, Alert } from 'react-bootstrap';
import PropTypes from "prop-types";

// import { pizzas } from '../data/Data';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductItem from '../productItem/ProductItem';
import Search from "../search/Search"
import './listProduct.css';

const ListProduct = ({ pizzas, addToCart }) => {
  // console.log(pizzas)
  const [filterPizzas, setFilterPizzas] = useState([]);
  const [error, setError] = useState('');

 

  // const [loading, setLoading] = useState('ture');
  useEffect(() => {
    if (pizzas.length > 0) {
      setFilterPizzas(pizzas);
      // setLoading(false); Hay que crear un spiner para que se muestre mientras se cargan las pizzas.
    }
  }, [pizzas]);


  // Cuando apreto enter en el boton se recarga la pagina 
  const searchHandler = (search) => {
    if (search.trim() === "") {

      setFilterPizzas(pizzas);
      setError('');

    } else {

      const filterProducts = filterPizzas.filter(
        (pizza) =>
          pizza.name.toLowerCase().includes(search.toLowerCase())
      );

      setFilterPizzas(filterProducts);

      if (filterProducts.length > 0) {
        setError('');
      } else {
        setError('Pizza no encontrada');
      }
    }
  }
  
  return (
    <>
      <Container fluid='md'>
        <Search onSearch={searchHandler} />
        <Row>
          <Col md={3}></Col>

          <Col md={6} className='Scroll-Bar' style={{ overflow: 'auto', width: '33rem', height: '35rem' }}>

            {error &&
              <Alert key="danger" variant="danger">
                {error}
              </Alert>
            }
            <Accordion style={{ width: '30rem' }}>
              {filterPizzas.map(pizza => (
                <ProductItem
                  key={pizza.id}
                  name={pizza.name}
                  description={pizza.description}
                  price={pizza.price}
                  imgUrl={pizza.imageUrl}
                  id={pizza.id}
                  addToCart={addToCart}
                />
              ))}
            </Accordion>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  );
}

ListProduct.propTypes = {
  pizzas: PropTypes.array,
  addToCart: PropTypes.func,
}

export default ListProduct;