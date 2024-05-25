import React from 'react'
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import  Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import PropTypes from "prop-types";


//Se agrega a una variable globla que contiene toda la lista de productos.
//no se si iria onProductDataSaved() o va directamente a la varable global. 
const FormProduct = ({onProductDataSaved}) => {
    const [enteredName, setEnteredName] = useState("");
    const [enteredDescription, setEnteredDescription] = useState("");
    const [enteredStock, setEnteredStock] = useState("");
    const [enteredPrice, setEnteredPrice] = useState("");
    const [enteredImageUrl, setEnteredImageUrl] = useState("");
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        setFormValid(
            enteredName !== "" &&
            enteredDescription !== "" &&
            enteredPrice !== "" &&
            enteredStock !== ""
        );
    }, [enteredName, enteredDescription, enteredPrice, enteredStock]);

    const handleChangeName = (e) => {
        setEnteredName(e.target.value);
    };

    const changeDescriptionHandler = (event) => {
        setEnteredDescription(event.target.value);
    };

    const changeStockHandler = (event) => {
        setEnteredStock(event.target.value);
    };

    const changePriceHandler = (event) => {
        setEnteredPrice(event.target.value);
    };

    const changeImageUrlHandler = (event) => {
        setEnteredImageUrl(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        enteredImageUrl === "" && setEnteredImageUrl("https://i.postimg.cc/DwcbBxMf/pizza-Gato.jpg");
        const ProductDto = {
            id: 0,
            name: enteredName,
            description: enteredDescription,
            price: enteredStock !== "" ? parseInt(enteredStock, 10) : 0,
            stock: parseInt(enteredPrice, 10),
            imageUrl: enteredImageUrl,
        };

        onProductDataSaved(ProductDto);
        setEnteredName("");
        setEnteredDescription("");
        setEnteredStock("");
        setEnteredPrice("");
        setEnteredImageUrl("");
    };


    return (
        <>
            <Row><Col>
                <h1 style={{textAlign:'center'}}>      
      <Badge bg="danger">New Product</Badge>
                </h1>
            </Col></Row>
            <Row >
                <Col style={{ backgroundColor: '#e6b5b5', borderRadius:'15px' }} md={{ span: 6, offset: 3 }}>
                    <Form className="text-white" onSubmit={submitHandler}>
                        <Row>
                            <Col />
                            <Col >
                                <Form.Group className="mb-3" controlId="productName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="textTarea"
                                        placeholder="Name of Product"
                                        onChange={handleChangeName}
                                        value={enteredName}
                                    />
                                </Form.Group>
                            </Col>
                            <Col />
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="productDescription">
                                    <Form.Label form='productDescription'>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Description Of Product"
                                        as='textarea' minLength={10} maxLength={90}
                                        style={{ height: '100px' }} onChange={changeDescriptionHandler} value={enteredDescription} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4} >
                                <Form.Group className="mb-3" controlId="stockProduct">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="add Stock product"
                                        max={1000}
                                        min={1}
                                        onChange={changeStockHandler}
                                        value={enteredStock}
                                    />
                                </Form.Group>
                            </Col>
                            <Col> </Col> 
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="priceProduct">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Price of Product"
                                        min={3}
                                        onChange={changePriceHandler}
                                        value={enteredPrice}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-between">
                            <Form.Group className="mb-3" controlId="ProductImageUrl">
                                <Form.Label>URL de imagen</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar url de imagen"
                                    onChange={changeImageUrlHandler}
                                    value={enteredImageUrl}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={3} className="d-flex justify-content-center">
                                <Button variant="success" type="submit" disabled={!formValid}>
                                    ADD PRODUCT
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row >
        </>
    )
}

export default FormProduct
