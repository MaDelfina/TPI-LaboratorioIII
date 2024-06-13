
import React from 'react';
import './Dashboard.css'


import { useState, useEffect } from 'react';

// "https://localhost:8000/api/products/GetAll"

const Dashboard = ({ children }) => {

  /*const addToCart = (product) => {
    setCart(cart => [...cart, product]);
  };*/

  const shoppingCart = async (cart) => {

    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        throw new Error("Failed to add new product");
      }
    }
    catch(error) {
      console.error("Error:", error);
    };
  }



  // Falta  Funcion async Delete productos, usuarios
  // Falta  Fucnion async  getAll Users.


  return <></>

}

export default Dashboard