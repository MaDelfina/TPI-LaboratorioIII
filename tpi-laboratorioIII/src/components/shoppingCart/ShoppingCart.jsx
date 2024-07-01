import React, { useContext, useEffect, useState } from "react"
import { Accordion, Alert, Button, Container, Col, Row } from 'react-bootstrap';
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import ShoppingCartItem from "../shoppingCartItem/ShoppingCartItem";
import './ShoppingCart.css'


const ShoppingCart = () => {
    const [cart, setCart] = useState([])

    let totalPrice = 0
    cart.map((p) => totalPrice += p.price * p.quantity)

    const { user } = useContext(AuthenticationContext)

    //Pide todos los productos del usuario
    useEffect(() => {
        requestPizzasFromUser()
    }, [])

    const requestPizzasFromUser = () => {
        fetch(`https://localhost:7044/api/User/PizzasOfTheUser${user.id}`, {
            method: "GET",
            mode: 'cors',
            headers: {
                accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCart(data)
                console.log('productos del carrito: ' + cart)

            })
            .catch((error) => console.log(error))
    }


    const deleteCartProduct = async (productName) => {
        try {
            const response = await fetch(`https://localhost:7044/api/User/DeleteOfReservationPizza${user.id}?namePizza=${productName}`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    'Accept': '*/*',
                    // 'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Error in obtaining products");
            }
            console.log("Product deleted successfully")
            requestPizzasFromUser();
        }
        catch (error) {
            console.error("Error:", error);
        }

    }

    const handleBuyProducts = async () => {
        try {
            const userResponse = await fetch(`https://localhost:7044/api/User/BuyReservationUser${user.id}`,
                {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                    },
                });
            if (userResponse.ok) {
                console.log("User updated successfully");
                // updateProductsData()
                requestPizzasFromUser();

                alert("Compra exitosa");
            } else {
                console.error('Error in updating user data')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <Container fluid='md' className='min-vh-100 min-vw-100 d-flex flex-column align-items-center mt-4'>

                {cart.length > 0 ? (
                    <Container fluid='md' className='d-flex flex-column justify-content-center'>
                        <Row className='w-100 d-flex justify-content-center'>
                            <Col md={3}></Col>
                            <Col md={6} className='Scroll-Bar' style={{ overflow: 'auto', width: '33rem', height: '35rem' }}>
                                <Accordion style={{ width: '30rem' }}>
                                    {cart.map((product, index) => (
                                        <ShoppingCartItem
                                            key={index}
                                            name={product.name}
                                            price={product.price}
                                            imgUrl={product.imageUrl}
                                            description={product.description}
                                            id={product.id}
                                            onDeletedProduct={deleteCartProduct}
                                            units={product.quantity}>
                                        </ShoppingCartItem>
                                    ))}
                                </Accordion>
                            </Col>
                            <Col md={3}>
                                <div>Total: ${totalPrice}</div>
                                <Button variant="success" className="mt-3" onClick={handleBuyProducts}>Comprar</Button>
                            </Col>
                        </Row>
                    </Container>
                ) : (
                    <Alert style={{width: '600px'}}>No se agregaron productos al carrito</Alert>
                )}
            </Container>
        </>

    )
}


export default ShoppingCart
