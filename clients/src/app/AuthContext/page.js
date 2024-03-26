'use client'
import { createContext, useState } from "react";



export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) =>{
    const [token,setToken] = useState(null);
    const [isAuth,setIsAuth] = useState(false)
    const [name,setName] = useState(null)

  const login = (token,name) => {
    setToken(token);
    setName(name)
    setIsAuth(true)
  };

  const logout = () => {
    setToken(null);
    setIsAuth(false)
  };

  return <AuthContext.Provider value={{login,logout,token,isAuth,name}}>{children}</AuthContext.Provider>;

}

