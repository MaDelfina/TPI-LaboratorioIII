
import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import useValidateUser from '../hookCustom/useValidateUser';

const ProductItem = ({ name, description, price, imgUrl, id, onFetchProducts, onAddedProductToCart }) => {

  const { user } = useContext(AuthenticationContext)

  const [productUnits, setProductUnits] = useState(1)
  const { isAdmin, isSuperAdmin, isClient } = useValidateUser();

  /* Llamada a la api */
  // Elimina los productos por id
  const deleteProducts = (async () => {
    const productDto = id
    try {
      const response = await fetch(`https://localhost:7044/api/Product/DeleteProdcut${productDto}`, {
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
  })

  const addToShoppingCart = () => {
    
    const IdUser = user.id; //Agrega el ID usuario 
    const units = productUnits
    const product = {
        "quantity": units,
        "productId": id,
        "userId": IdUser
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

          {(isClient()) && (
            <>
            <Button variant='light' style={{ borderColor: 'black' }} onClick={handleDecreaseUnits}>-</Button>
            <span style={{ marginRight: '5px', marginLeft: '5px' }}>{productUnits}</span>
            <Button variant='light' style={{ borderColor: 'black', marginRight: "1.5rem" }} onClick={handleIncreaseUnits}>+</Button>
            <Button variant='success' style={{ marginRight: "1.5rem" }} onClick={addToShoppingCart}>Agregar al carrito</Button>
            </>
          )}

          {(isAdmin() || isSuperAdmin()) && (<Button variant='danger' onClick={deleteProducts}>Delete</Button>)}

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
  onAddedProductToCart: PropTypes.func
}

export default ProductItem

