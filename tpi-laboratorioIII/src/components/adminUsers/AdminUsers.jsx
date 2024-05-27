import React, { useState } from 'react'
import { USERS } from '../data/Data'
import { Container } from 'react-bootstrap'
import ClientsList from '../clientsList/ClientsList'
import AdminsList from '../adminsList/AdminsList'

const AdminUsers = () => {
    const [users, setUsers] = useState(USERS)
  return (
    <Container className='d-flex'>
        <ClientsList usersArray={users}></ClientsList>
        <AdminsList usersArray={users}></AdminsList>
    </Container>
  )
}

export default AdminUsers