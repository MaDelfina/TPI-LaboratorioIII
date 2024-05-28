import React, { useState } from 'react';
import { Accordion, Container, Alert } from 'react-bootstrap';
import { PIZZAS } from '../data/Data';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductItem from '../productItem/ProductItem';
import Search from "../search/Search"
import './listProduct.css';

const ListProduct = () => {
  const [filterPizzas, setFilterPizzas] = useState(PIZZAS);
  const [error, setError] = useState('');

  const searchHandler = (search) => {
    if (search.trim() === "") {

      setFilterPizzas(PIZZAS);
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
      <Search onSearch={searchHandler} />

      <Container fluid='md'>
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
                />
              ))}
            </Accordion>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  )
}

export default ListProduct;
