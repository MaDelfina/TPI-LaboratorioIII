import React from "react"
import { Accordion, Image } from 'react-bootstrap';

const ShoppingCart = ({cart}) => {
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
                </Accordion.Item>
            ))}
        </Accordion>
        </>
    )
}

export default ShoppingCart
