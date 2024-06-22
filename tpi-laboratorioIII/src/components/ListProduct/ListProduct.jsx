import React, { useState, useEffect } from 'react';
import { Accordion, Container, Alert } from 'react-bootstrap';
import PropTypes from "prop-types";

// import { pizzas } from '../data/Data';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductItem from '../productItem/ProductItem';
import Search from "../search/Search"
import './listProduct.css';
import Spiner from '../../spiner/Spiner';


const ListProduct = () => {
  const [filterPizzas, setFilterPizzas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('ture'); //Spiner
  useEffect(() => {
    if (filterPizzas.length > 0) {
      setFilterPizzas(filterPizzas);
      setLoading(false); //Hay que crear un spiner para que se muestre mientras se cargan las pizzas.
    }
  }, [filterPizzas]);



  /* Llama a la api */
  //!!! ... Servidor
  //http://localhost:8000/api/products ¡fake api vieja!


  //? Llama a todos los productos que hay en la API y los guarda con setProducts().
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Error in obtaining products");
      }
      const ProductsData = await response.json();
      setFilterPizzas(ProductsData);
      setLoading(false);//desactiva el spiner
    }
    catch (error) {
      console.error("Error:", error);
    };
  };

  /* ---------------- */


  // Cuando apreto enter en el boton recarga la pagina 
  const searchHandler = (search) => {
    if (search.trim() === "") {

      setFilterPizzas(filterPizzas);
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
    <>{loading ? (
      <Container fluid='md' className='min-vh-100 min-vw-100' >
        <Spiner />
      </Container>
    ):(
      <Container fluid='md' className='min-vh-100 min-vw-100'>
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
                  stock={pizza.stock}
                  onFetchProducts={fetchProducts}

                // addToCart={addToCart}
                />
              ))}
            </Accordion>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
)}
    </>
  );
}

export default ListProduct;

