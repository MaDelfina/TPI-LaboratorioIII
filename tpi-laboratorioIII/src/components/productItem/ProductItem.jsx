
import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

const ProductItem = ({ name, description, price, imgUrl, id, onFetchProducts }) => {

  const {user} = useContext(AuthenticationContext)
  const [userInfo, setUserInfo] = useState({})
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
      })
      .catch((error) => console.log(error))
  }, [])
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

  const HandleAddToShoppingCart = () => {
    const product = {
      name, description, price, imgUrl, id 
    };

    try {
      const userUpdated = {
        ...userInfo,
        shopping_cart: [...userInfo.shopping_cart, product],
      }
      console.log(userUpdated)

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
      console.log("added products to cart")
      console.log(data)
    }
    catch (error) {
      console.error("Error:", error);
    };
  }

  return (
    <>
      <Accordion.Item eventKey={id} style={{ backgroundColor: '' }}>
        <Accordion.Header  >{name} - price ${price}</Accordion.Header>
        <Accordion.Body >
          <Image src={imgUrl} rounded /> <br />
          {description} <br /><hr />
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

