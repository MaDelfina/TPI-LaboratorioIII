import React from "react"
import { Accordion, Image } from 'react-bootstrap';
import PropTypes from "prop-types";

const ShoppingCart = ({ cart }) => {

    return (
        <>
            <Accordion>
            {cart.map((product, index) => (
                <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>{product.name} - price ${product.price}</Accordion.Header>
                    <Accordion.Body>
                        <Image src={product.imgUrl} rounded />
                        <div>{product.description}</div>
                    </Accordion.Body>
                    <Button variant='danger'>Delete</Button>
                    <Button variant='danger'>Comprar</Button>
                </Accordion.Item>
            ))}
        </Accordion>
        </>
    )
}

ShoppingCart.propTypes = {
    cart: PropTypes.array.isRequired,
    //onShoppingCart: PropTypes.func.isRequired
  };

export default ShoppingCart
