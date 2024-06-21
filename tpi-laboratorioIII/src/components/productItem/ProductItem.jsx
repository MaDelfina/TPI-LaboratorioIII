
import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

const ProductItem = ({ name, description, price, imgUrl, id, onFetchProducts }) => {

  const { user } = useContext(AuthenticationContext)
  const [userInfo, setUserInfo] = useState({})
  const [cart, setCart] = useState([])
  const [productUnits, setProductUnits] = useState(1)
  const isAdmin = () => user.role === 'admin' || user.role === 'super-admin';

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
  }, [cart])
  /* Llamada a la api */
  //? Elimina los productos por id
  const deleteProducts = async () => {
    const productDto = id
    try {
      const response = await fetch(`http://localhost:8000/api/products/${productDto}`, {
        method: "DELETE",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Error in obtaining products");
      }
      onFetchProducts();
      console.log("Product deleted successfully")
    }
    catch (error) {
      console.error("Error:", error);
    }
  }

  const HandleAddToShoppingCart = async () => {
    const units = productUnits
    const product = {
      id, name, description, price, imgUrl, units
    };

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
      //datos que llegan de la fake api. 
      console.log(data)
      //Prueba; cart siempre esta vacia.
      console.log(cart);
    }
    catch (error) {
      console.error("Error:", error);
    };
  }

  const handleDecreaseUnits = () => {
    if (productUnits > 1) {
      setProductUnits(productUnits - 1)
    }
  }

  const handleIncreaseUnits = () => {
    setProductUnits(productUnits + 1)
  }

  return (
    <>
      <Accordion.Item eventKey={id} style={{ backgroundColor: '' }}>
        <Accordion.Header  >{name} - price ${price}</Accordion.Header>
        <Accordion.Body >
          <Image src={imgUrl} rounded /> <br />
          {description} <br /><hr />

          <Button variant='light' style={{ borderColor: 'black' }} onClick={handleDecreaseUnits}>-</Button>
          <span style={{ marginRight: '5px', marginLeft: '5px' }}>{productUnits}</span>
          <Button variant='light' style={{ borderColor: 'black', marginRight: "1.5rem" }} onClick={handleIncreaseUnits}>+</Button>

          <Button variant='success' style={{ marginRight: "1.5rem" }} onClick={HandleAddToShoppingCart}>Agregar al carrito</Button>

          {isAdmin() && (<Button variant='danger' onClick={deleteProducts}>Delete</Button>)}

        </Accordion.Body>
      </Accordion.Item>

    </>
  )
}

ProductItem.propType = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  imgUrl: PropTypes.string,
  id: PropTypes.number,
  onFetchProducts: PropTypes.func
}

export default ProductItem

