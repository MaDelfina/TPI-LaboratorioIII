import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'

const EachAdmin = ({ name }) => {
    return (
        <ListGroup.Item variant='dark' className="d-flex align-items-center justify-content-between">
            {name}
            <Button variant='danger'>Delete administrator</Button>
        </ListGroup.Item>
    )
}

EachAdmin.propType = {
    name: PropTypes.string
}

export default EachAdmin