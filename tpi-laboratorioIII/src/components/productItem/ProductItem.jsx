
import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

const ProductItem = ({ name, description, price, imgUrl, id }) => {
  const {user} = useContext(AuthenticationContext)
  const [userInfo, setUserInfo] = useState({})

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

  const addToCart = async () => {
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
    <Accordion.Item eventKey={id} style={{ backgroundColor:'' }}>
      <Accordion.Header  >{name} - price ${price}</Accordion.Header>
      <Accordion.Body >
        <Image src={imgUrl} rounded/> <br/>
        {description} <br/><hr/>
        <Button variant='success' style={{marginRight: "1.5rem"}} onClick={addToCart}>Agregar al carrito</Button> 
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
}

export default ProductItem

