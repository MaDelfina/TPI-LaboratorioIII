import { useState } from "react";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Search.css"

const Search = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearch(searchValue);
        onSearch(searchValue);
    }

    const handleButtonClick = () => {
        onSearch(search);
    }

    return (
        <>
            <Row className="search">
                <Col md={6} lg={4}>
                    <Form>
                        <Form.Group controlId="formBasicSearch">
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar producto"
                                    value={search}
                                    onChange={handleSearch}
                                />
                                <Button variant="outline-secondary" onClick={handleButtonClick}>
                                    buscar
                                </Button>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

Search.propTypes = {
    onSearch: PropTypes.func,
};

export default Search;
