
import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

const ProductItem = ({ name, description, price, imgUrl, id, onFetchProducts, onAddedProductToCart }) => {

  const { user } = useContext(AuthenticationContext)
  const [productUnits, setProductUnits] = useState(1)
  const isAdmin = () => user.role === 'admin' || user.role === 'super-admin';

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

  const addToShoppingCart = () => {
    const units = productUnits
    const product = {
      id, name, description, price, imgUrl, units
    };

    onAddedProductToCart(product)
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

          <Button variant='success' style={{ marginRight: "1.5rem" }} onClick={addToShoppingCart}>Agregar al carrito</Button>

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

