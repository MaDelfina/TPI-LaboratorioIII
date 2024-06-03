
import React from 'react'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';

const ProductItem = ({ name, description, price, imgUrl, id, addToCart }) => {

  const HandleBuyProduct = () =>{
    const product = {
      name, description, price, imgUrl, id
    };
    addToCart(product)
  }
  
  return (
    <>
    <Accordion.Item eventKey={id} style={{ backgroundColor:'' }}>
      <Accordion.Header  >{name} - price ${price}</Accordion.Header>
      <Accordion.Body >
        <Image src={imgUrl} rounded/> <br/>
        {description} <br/><hr/>
        <Button variant='success' style={{marginRight: "1.5rem"}} onClick={HandleBuyProduct}>Buy</Button> 
        <Button variant='danger'>Delete</Button>
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
  addToCart: PropTypes.func
}

export default ProductItem

