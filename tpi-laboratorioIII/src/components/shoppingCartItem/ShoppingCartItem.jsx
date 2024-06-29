import PropTypes from 'prop-types';
import { Accordion, Image, Button } from 'react-bootstrap';

const ShoppingCartItem = ({name, imgUrl, price, description, id, onDeletedProduct, units}) => {
    const deleteProductFromCart = () => {
        onDeletedProduct(name)
    }
    return (
        <Accordion.Item eventKey={id}>
            <Accordion.Header>{name} - Price ${price} - Units: {units}</Accordion.Header>
            <Accordion.Body>
                <Image src={imgUrl} rounded />
                <div>{description}</div>
                <hr></hr>
                <Button variant='danger' onClick={deleteProductFromCart}>Delete</Button>
            </Accordion.Body>
        </Accordion.Item>
    )
}

ShoppingCartItem.propType = {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    imgUrl: PropTypes.string,
    price: PropTypes.number,
    onDeletedProduct: PropTypes.func
}

export default ShoppingCartItem