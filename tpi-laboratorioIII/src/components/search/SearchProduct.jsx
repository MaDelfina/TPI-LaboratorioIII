import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const SearchProduct = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const handlerSearch = () => {
        onSearch(search);
    }

    return (
        <>
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    <Form>
                        <Form.Group controlId="formBasicSearch">
                            <Form.Control
                                type="text"
                                placeholder="Buscar producto"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                        </Form.Group>
                        <Button variant="outline-secondary" onClick={handlerSearch}>
                            busacar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

SearchProduct.propTypes = {
    onSearch: PropTypes.func,
};

export default SearchProduct;
