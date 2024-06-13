import { useState, createContext } from "react";
import React from "react";
import PropType from "prop-types";

export const AuthenticationContext = createContext({});

const userValueString = localStorage.getItem("user");
const userValue = userValueString ? JSON.parse(userValueString) : null;

export const AuthenticationContextProvider = ({ children }) => {

  const [user, setUser] = useState(userValue);

  const handleLogin = (username, role, id) => {
    localStorage.setItem("user", JSON.stringify({ username, role, id }));
      setUser({ username, role, id });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropType.object,
};