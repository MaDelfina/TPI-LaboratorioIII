
import React from 'react'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Image, { propTypes } from 'react-bootstrap/Image';

const ProductItem = ({ name, description, price, imgUrl, id, stock, onFetchProducts }) => {

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



  return (
    <>
      <Accordion.Item eventKey={id} style={{ backgroundColor: '' }}>
        <Accordion.Header  >{name} - price ${price}</Accordion.Header>
        <Accordion.Body >
          <Image src={imgUrl} rounded /> <br />
          {description} <br /><hr />
          <Button variant='success' style={{ marginRight: "1.5rem" }}>Buy</Button>
          <Button variant='danger' onClick={deleteProducts}>Delete</Button>
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
  stock: PropTypes.number, 
  onFetchProducts: PropTypes.func,
}

export default ProductItem

