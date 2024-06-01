
import React from 'react';
import './Dashboard.css'
import ListProduct from '../ListProduct/ListProduct';
import FormProduct from '../formProduct/FormProduct';
import { useState, useEffect } from 'react';

// "https://localhost:8000/api/products/GetAll"

const Dashboard = ({ children }) => {
  const [Products, setProducts] = useState([]);


  //ejecuta la funcion después de que el componente se haya renderizado o actualizado.
  useEffect(() => {
    fetchProducts();
  }, []);

  //? Llama a todos los productos que hay en la API y los guarda con setProducts().
  const fetchProducts = async ()=> {
    //intenta hacer esto
    try{
      const response = await fetch("http://localhost:8000/api/products", {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Error in obtaining products");
      } 
      const ProductsData = await response.json();
      setProducts(ProductsData);
    }
    //si no lo logra tira error.
    catch(error) {
        console.error("Error:", error);
      };
  };

  //?Guarda el nuevo producto en la API con una funcion asincrono.
  const saveProductHandler = async (enteredProductData) => {
    const productDto = {
      id: 0,
      name: enteredProductData.name,
      description: enteredProductData.description,
      price: enteredProductData.price,
      stock: enteredProductData.stock,
      imageUrl: enteredProductData.imageUrl
    };

    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productDto),
      });
      if (!response.ok) {
        throw new Error("Failed to add new product");
      }
      const data = await response.json();
      setProducts(data);
      fetchProducts(); //llama a la fucnion para obtener los productos acutalizados
    }
    catch (error) {
      alert(error);
    }
  };


  // Falta  Funcion async Delete productos, usuarios
  // Falta  Fucnion async  getAll Users.

  /*
  React.Children.map: hace un map a todos los hijos que tenga el componente.

  El "children" dentro del map son Los elementos hijos sobre los que se desea iterar.
  
  React.cloneElement: Funcion de React que crea un nuevo elemento clonando un elemento existente para darselo al hijo. 

  Se agrega el elemento aca en vez de hacerlo en el componetne App.jsx
  */

  return React.Children.map(children, (child) => {
    if (child.type === ListProduct) {
      return React.cloneElement(child, { pizzas: Products })
    }
    if (child.type === FormProduct) {
      return React.cloneElement(child, { onSalveProductHandler: saveProductHandler })
    }
    //Mas if con los otos posibles hijos.

    return child;
  });
}

export default Dashboard