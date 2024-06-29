import React, { useState, useEffect, useContext } from 'react';
import { Accordion, Container, Alert } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductItem from '../productItem/ProductItem';
import Search from "../search/Search"
import './listProduct.css';
import Spiner from '../../spiner/Spiner';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';


const ListProduct = () => {
  const [filterPizzas, setFilterPizzas] = useState([]);
  const [loading, setLoading] = useState('ture'); //Spiner
  const { user } = useContext(AuthenticationContext)
  const [userInfo, setUserInfo] = useState({})
  const [cart, setCart] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    if (filterPizzas.length > 0) {
      setFilterPizzas(filterPizzas);
      setLoading(false); //Hay que crear un spiner para que se muestre mientras se cargan las pizzas.
    }
  }, [filterPizzas]);

  useEffect(() => {
    fetch(`https://localhost:7044/api/User/GetById${user.id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        return response.json();
      })
      .then((data) => {
        setUserInfo(data)
        setCart(data.products)
        console.log(data.products)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  

  /* Llama a la api */
  //!!! ... Servidor
  //http://localhost:8000/api/products ¡fake api vieja!


  //? Llama a todos los productos que hay en la API y los guarda con setProducts().
  useEffect(() => {
    fetchProducts();
  }, []);

  /*const fetchProducts = async () => {
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
  }; */

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://localhost:7044/api/Product/GetAll", {
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

  const HandleAddToShoppingCart = async (product) => {
    try {
      // const productInCartIndex = cart.findIndex((p) => p.id === product.id)
      // let cartUpdated;

      // if (productInCartIndex >= 0) {
      //   cartUpdated = [...cart];
      //   cartUpdated[productInCartIndex].units += product.units;
      // } else {
      //   cartUpdated = [...cart, product];
      // }

      // const userUpdated = {
      //   ...userInfo,
      //   shopping_cart: cartUpdated,
      // }

      const response = await fetch(`https://localhost:7044/api/User/AddProduct`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Failed to add new product");
      }
      const data = await response.json()
      setUserInfo(data)
      setCart(data.shopping_cart)
      console.log("added products to cart")
      // console.log(userInfo)
    }
    catch (error) {
      console.error("Error:", error);
    };
  }

  const inputHandler = (inputText) => {
    setText(inputText)
  }

  const pizzasSearched = filterPizzas.filter((p) => p.name.toLowerCase().includes(text.toLowerCase()))
  
  

  return (
    <>{loading ? (
      <Container fluid='md' className='min-vh-100 min-vw-100' >
        <Spiner />
      </Container>
    ) : (
      <Container fluid='md' className='min-vh-100 min-vw-100'>
        <Search onSearch={inputHandler} />
        <Row>
          <Col md={3}></Col>

          <Col md={6} className='Scroll-Bar' style={{ overflow: 'auto', width: '33rem', height: '35rem' }}>
            <Accordion style={{ width: '30rem' }}>
              {pizzasSearched.length > 0 ? (
                pizzasSearched.map(pizza => (
                  <ProductItem
                    key={pizza.id}
                    name={pizza.name}
                    description={pizza.description}
                    price={pizza.price}
                    imgUrl={pizza.imageUrl}
                    id={pizza.id}
                    stock={pizza.stock}
                    onFetchProducts={fetchProducts}
                    onAddedProductToCart={HandleAddToShoppingCart}
  
                  />
                ))
              ) : (
                <Alert variant='danger'>Pizza no encontrada</Alert>
              )}
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

