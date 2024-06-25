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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('ture'); //Spiner
  const { user } = useContext(AuthenticationContext)
  const [userInfo, setUserInfo] = useState({})
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (filterPizzas.length > 0) {
      setFilterPizzas(filterPizzas);
      setLoading(false); //Hay que crear un spiner para que se muestre mientras se cargan las pizzas.
    }
  }, [filterPizzas]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/${user.id}`, {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data)
        setCart(data.shopping_cart)
      })
      .catch((error) => console.log(error))
    //?Cada vez que se se modifique cart se vuelve a cargar el usuario. 
  }, [])

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

  const HandleAddToShoppingCart = async (product) => {
    try {
      const productInCartIndex = cart.findIndex((p) => p.id === product.id)
      let cartUpdated;

      if (productInCartIndex >= 0) {
        cartUpdated = [...cart];
        cartUpdated[productInCartIndex].units += product.units;
      } else {
        cartUpdated = [...cart, product];
      }

      const userUpdated = {
        ...userInfo,
        shopping_cart: cartUpdated,
      }

      const response = await fetch(`http://localhost:8000/api/users/${user.id}`, {
        method: "PUT",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userUpdated),
      });
      if (!response.ok) {
        throw new Error("Failed to add new product");
      }
      const data = await response.json()
      setUserInfo(data)
      setCart(data.shopping_cart)
      console.log("added products to cart")
      console.log(userInfo)
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
                  onAddedProductToCart={HandleAddToShoppingCart}

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

