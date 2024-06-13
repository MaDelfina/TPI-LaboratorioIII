import React, { useContext, useEffect, useState } from "react"
import { Accordion, Image, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";

const ShoppingCart = () => {
    const [cart, setCart] = useState([])

    const { user } = useContext(AuthenticationContext)

    useEffect(() => {
        fetch(`http://localhost:8000/api/users/${user.id}`, {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const cartInfo = data.shopping_cart
                setCart(cartInfo)
            })
            .catch((error) => console.log(error))
    }, [])

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


export default ShoppingCart
