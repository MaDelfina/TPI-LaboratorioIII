import React, { useContext, useEffect, useState } from "react"
import { Accordion, Alert, Button, Container, Col, Row } from 'react-bootstrap';
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import ShoppingCartItem from "../shoppingCartItem/ShoppingCartItem";
import './ShoppingCart.css'


const ShoppingCart = () => {
    const [cart, setCart] = useState([])
    const [userInfo, setUserInfo] = useState({})

    let totalPrice = 0
    cart.map((p) => totalPrice = p.price * p.units + totalPrice)

    const { user } = useContext(AuthenticationContext)

    useEffect(() => {
        fetch(`https://localhost:7044/api/User/GetById${user.id}`, {
            method: "GET",
            mode: 'cors',
            headers: {
                accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserInfo(data)
                setCart(data.products)
            })
            .catch((error) => console.log(error))
    }, [])

    const deleteCartProduct = async (productId) => {
        const cartUpdated = cart.filter((p) => p.id !== productId)
        const userUpdated = {
            ...userInfo,
            shopping_cart: cartUpdated
        }
        try {
            const response = await fetch(`http://localhost:8000/api/users/${user.id}`, {
                method: "PUT",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userUpdated)
            });
            if (!response.ok) {
                throw new Error("Error in obtaining products");
            }
            console.log("Product deleted successfully")
            setCart(cartUpdated)
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

    const handleBuyProducts = async () => {
        const userUpdated = {
            ...userInfo,
            shopping_cart: []
        }
        console.log(userUpdated)
        try {
            const userResponse = await fetch(`http://localhost:8000/api/users/${user.id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userUpdated)
            });
            if (userResponse.ok) {
                console.log("User updated successfully");
                updateProductsData()

                alert("Compra exitosa");
            } else {
                console.error('Error in updating user data')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const updateProductsData = async () => {
        console.log(cart)

        try {
            const response = await fetch('http://localhost:8000/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cart),
                mode: "cors"
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Purchase successful:', data);
                setCart([]);

            } else {
                console.error('Purchase failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <>
            <Container fluid='md' className='min-vh-100 min-vw-100'>

                {cart.length > 0 ? (
                    <Container fluid='md' className='min-vh-100 min-vw-100'>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={6} className='Scroll-Bar' style={{ overflow: 'auto', width: '33rem', height: '35rem' }}>
                                <Accordion style={{ width: '30rem' }}>
                                    {cart.map((product, index) => (
                                        <ShoppingCartItem
                                            key={index}
                                            name={product.name}
                                            price={product.price}
                                            imgUrl={product.imgUrl}
                                            description={product.description}
                                            id={product.id}
                                            onDeletedProduct={deleteCartProduct}
                                            units={product.units}>
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
                    <Alert>No se agregaron productos al carrito</Alert>
                )}
            </Container>
            </>

            )
}


            export default ShoppingCart
