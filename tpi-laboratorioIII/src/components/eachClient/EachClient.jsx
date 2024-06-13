import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'

const EachClient = ({ id, name, onDelete }) => {
    return (
        <ListGroup.Item variant='dark' className="d-flex align-items-center justify-content-between">
            {name}
            <Button variant='danger' onClick={() => onDelete(id)} >Delete client</Button>
        </ListGroup.Item>
    )
}

EachClient.propType = {
    id: PropTypes.number,
    name: PropTypes.string,
    onDelete: PropTypes.func
}

export default EachClient