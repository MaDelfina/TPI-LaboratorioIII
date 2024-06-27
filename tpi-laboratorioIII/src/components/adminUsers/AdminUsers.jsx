import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import ClientsList from '../clientsList/ClientsList'
import AdminsList from '../adminsList/AdminsList'
import AddNewAdmin from '../addNewAdmin/AddNewAdmin'

const AdminUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("https://localhost:7044/api/User/getAll", {
      headers: {
        accept: "application/json",
      },
      mode: 'cors'
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDeleteUser = async (userId) => {
    try{
      const response = await fetch(`https://localhost:7044/api/User/DeleteId${userId}`, {
        method: 'DELETE',
        mode: 'cors',
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

  const addNewAdminHandler = (newAdmin) => {
    setUsers([...users, newAdmin]);
  }

  // min-vh-100 Altura
  // min-vw-100 ancho
  return (      
    <Container className='d-flex justify-content-center min-vh-100 min-vw-100' >
      <ClientsList usersArray={users} onDeleteUser={handleDeleteUser} />
      <AdminsList usersArray={users} onDeleteUser={handleDeleteUser} />
      <AddNewAdmin usersArray={users} onAddAdmin={addNewAdminHandler}/>
    </Container>
    
  )
}

export default AdminUsers