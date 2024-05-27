import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'

const EachClient = ({ name }) => {
    return (
        <ListGroup.Item variant='dark' className="d-flex align-items-center justify-content-between">
            {name}
            <Button variant='danger'>Delete client</Button>
        </ListGroup.Item>
    )
}

EachClient.propType = {
    name: PropTypes.string
}

export default EachClient