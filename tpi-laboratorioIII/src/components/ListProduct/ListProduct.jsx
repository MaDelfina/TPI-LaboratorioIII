import React, { useState } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { PIZZAS } from '../data/Data';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductItem from '../productItem/ProductItem';
import SearchProduct from '../search/SearchProduct';
import './listProduct.css';

const ListProduct = () => {
  const [pizzas, setPizzas] = useState(PIZZAS);

  const searchHandler = (search) => {
    const filterProducts = pizzas.filter(
      (pizza) =>
        pizza.name.toLowerCase().includes(search.toLowerCase())
    );
    setPizzas(filterProducts);
  
    if (filterProducts.length > 0) {
      console.log(filterProducts);
    } else {
      console.log("Pizza no encontrada");
    }
  };

  return (
    <>
      <SearchProduct onSearch={searchHandler} />

      <Container fluid='md'>
        <Row>
          <Col md={3}></Col>

          <Col md={6} className='Scroll-Bar' style={{ overflow: 'auto', width: '33rem', height: '35rem' }}>
            <Accordion style={{ width: '30rem' }}>
              {pizzas.map(pizza => (
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
  );
}

export default ListProduct;
