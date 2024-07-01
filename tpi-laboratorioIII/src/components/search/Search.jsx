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

    return (
        <>
            <Row className="search">
                <Col>
                    <Form>
                        <Form.Group controlId="formBasicSearch">
                            <InputGroup>
                                <Form.Control style={{width: '30rem'}}
                                    type="text"
                                    placeholder="Buscar producto"
                                    value={search}
                                    onChange={handleSearch}
                                />
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
