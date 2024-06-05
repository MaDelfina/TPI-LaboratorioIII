import React, { useState } from 'react'
import { USERS } from '../data/Data'
import { Container } from 'react-bootstrap'
import ClientsList from '../clientsList/ClientsList'
import AdminsList from '../adminsList/AdminsList'
import AddNewAdmin from '../addNewAdmin/AddNewAdmin'

const AdminUsers = () => {
  const [users, setUsers] = useState(USERS)
  return (
    <Container className='d-flex justify-content-around'>
      <ClientsList usersArray={users}></ClientsList>
      <AdminsList usersArray={users}></AdminsList>
      <AddNewAdmin usersArray={users}></AddNewAdmin>
    </Container>
  )
}

export default AdminUsers