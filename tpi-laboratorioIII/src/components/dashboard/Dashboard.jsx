
import React, { useContext } from 'react';
import './Dashboard.css'
import { useState, useEffect } from 'react';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

// "https://localhost:8000/api/products/GetAll"

const Dashboard = ({ children }) => {
  const { user } = useContext(AuthenticationContext)

  /*const addToCart = (product) => {
    setCart(cart => [...cart, product]);
  };*/

  const addToCart = async (product) => {

    try {
      const userResponse = await fetch(`http://localhost:8000/api/users/${user.id}`);
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user info");
      }
      const userInfo = await userResponse.json();
      const userUpdated = {
        id: userInfo.id,
        username: userInfo.username,
        password: userInfo.password,
        shopping_cart: [...userInfo.shopping_cart, product],
        rol: userInfo.rol
      }

      const response = await fetch(`http://localhost:8000/api/users/${user.id}`, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(userUpdated),
      });
      if (!response.ok) {
        throw new Error("Failed to add new product");
      }
      const data = await response.json()
      console.log("added products to cart")
    }
    catch (error) {
      console.error("Error:", error);
    };
  }



  // Falta  Funcion async Delete productos, usuarios
  // Falta  Fucnion async  getAll Users.


  return <></>

}

export default Dashboard