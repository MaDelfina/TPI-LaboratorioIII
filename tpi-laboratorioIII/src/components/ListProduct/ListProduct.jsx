import React, { useState, useEffect } from 'react';
import { Accordion, Container, Alert } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductItem from '../productItem/ProductItem';
import Search from "../search/Search"
import './listProduct.css';
import Spiner from '../spiner/Spiner'; 


const ListProduct = () => {
  const [filterPizzas, setFilterPizzas] = useState([]);
  const [loading, setLoading] = useState(true); //Spiner
  const [text, setText] = useState('') // para la función search

  /*useEffect(() => {
    if (filterPizzas.length > 0) {
      setFilterPizzas(filterPizzas);
      setLoading(false); //Hay que crear un spiner para que se muestre mientras se cargan las pizzas.
    }
  }, [filterPizzas]);*/


  /* Llama a la api */

  // Llama a todos los productos que hay en la API y los guarda con setFilterPizzas().
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://localhost:7044/api/Product/GetAll', {
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


  const searchHandler = (search) => {
    setText(search)
  }

  const pizzasSearched = filterPizzas.filter((pizza) => pizza.name.toLowerCase().includes(text.toLowerCase()))


  const AddedProductToCart = async (product) => {
    try {
      const respons = await fetch('https://localhost:7044/api/User/AddProduct',
        {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product)
        });
      if (!respons.ok) {
        throw new Error("Failed to add product tu cart");
      }
      console.log("Product added to card successfully")
    }
    catch (error) {
      console.error("Error:", error);
    };
  }

  return (
    <>{loading ? (
      <Container fluid='md' className='min-vh-100 min-vw-100' >
        <Spiner />
      </Container>
    ) : (
      <Container fluid='md' className='min-vh-100 min-vw-100 d-flex flex-column align-items-center'>
        <Search onSearch={searchHandler} />
        <Row className='w-100 d-flex justify-content-center'>
          <Col md={3}></Col>

          <Col md={6} className='Scroll-Bar' style={{ overflow: 'auto', width: '33rem', height: '35rem' }}>

            {pizzasSearched.length > 0 ? (
              <Accordion style={{ width: '30rem' }}>
                {pizzasSearched.map(pizza => (
                  <ProductItem
                    key={pizza.id}
                    name={pizza.name}
                    description={pizza.description}
                    price={pizza.price}
                    imgUrl={pizza.imageUrl}
                    id={pizza.id}
                    stock={pizza.stock}
                    onFetchProducts={fetchProducts}
                    onAddedProductToCart={AddedProductToCart}
                  />
                ))}
              </Accordion>) : (
              <Alert key="danger" variant="danger">
                Pizza no encontrada
              </Alert>
            )}
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    )}
    </>
  );
}

export default ListProduct;

