
import React from 'react'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import { useContext } from 'react';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';


const ProductItem = ({ name, description, price, imgUrl, id, onFetchProducts, addToCart }) => {

  const {user} = useContext(AuthenticationContext)
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

  const HandleAddToShoppingCard = () => {
    //llamar a la api para modificar el usuario
    const product = {
      name, description, price, imgUrl, id 
    };
    addToCart(product)
  }

  return (
    <>
      <Accordion.Item eventKey={id} style={{ backgroundColor: '' }}>
        <Accordion.Header  >{name} - price ${price}</Accordion.Header>
        <Accordion.Body >
          <Image src={imgUrl} rounded /> <br />
          {description} <br /><hr />
          <Button variant='success' style={{ marginRight: "1.5rem" }} onClick={HandleAddToShoppingCard}>Agregar al carrito</Button>
          
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
  onFetchProducts: PropTypes.func,
  addToCart: PropTypes.func
}

export default ProductItem

