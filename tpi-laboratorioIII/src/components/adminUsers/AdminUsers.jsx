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

  const handleDeleteUser = async (userId) => {
    try{
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'DELETE',
      })
      if (response.ok){
        setUsers(users.filter(user => user.id !== userId))
      } else {
        console.log('Error deleting user')
      }
    }
    catch (error) {
      console.log("Error deleting user: ", error);
    }
  }
  
  return (
    <Container className='d-flex justify-content-around'>
      <ClientsList usersArray={users} onDeleteUser={handleDeleteUser} />
      <AdminsList usersArray={users} onDeleteUser={handleDeleteUser} />
      <AddNewAdmin usersArray={users}/>
    </Container>
  )
}

export default AdminUsers