import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import ClientsList from '../clientsList/ClientsList'
import AdminsList from '../adminsList/AdminsList'
import AddNewAdmin from '../addNewAdmin/AddNewAdmin'

const AdminUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/api/users", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <Container className='d-flex justify-content-around'>
      <ClientsList usersArray={users}></ClientsList>
      <AdminsList usersArray={users}></AdminsList>
      <AddNewAdmin usersArray={users}></AddNewAdmin>
    </Container>
  )
}

export default AdminUsers