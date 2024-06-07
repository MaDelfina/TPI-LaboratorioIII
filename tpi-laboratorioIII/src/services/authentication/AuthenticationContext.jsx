import { useState, createContext, useEffect } from "react";
import React from "react";
import PropType from "prop-types";

export const AuthenticationContext = createContext({});

const userValueString = localStorage.getItem("user");
const userValue = userValueString ? JSON.parse(userValueString) : null;

export const AuthenticationContextProvider = ({ children }) => {
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

  const [user, setUser] = useState(userValue);

  const handleLogin = (username, role, cart=null) => {
    if(cart !== null){
      localStorage.setItem("user", JSON.stringify({ username, role, cart }));
      setUser({ username, role, cart });
    } else {
      localStorage.setItem("user", JSON.stringify({ username, role }));
      setUser({ username, role });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ users, user, handleLogin, handleLogout, setUsers }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropType.object,
};