import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import ClientsList from '../clientsList/ClientsList'
import AdminsList from '../adminsList/AdminsList'
import AddNewAdmin from '../addNewAdmin/AddNewAdmin'
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext'

const AdminUsers = () => {
  const {users} = useContext(AuthenticationContext)

  return (
    <Container className='d-flex justify-content-around'>
      <ClientsList usersArray={users}></ClientsList>
      <AdminsList usersArray={users}></AdminsList>
      <AddNewAdmin usersArray={users}></AddNewAdmin>
    </Container>
  )
}

export default AdminUsers