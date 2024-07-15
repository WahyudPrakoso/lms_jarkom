import {makeRequest} from "../axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [islogin, setislogin] = useState(
    JSON.parse(localStorage.getItem("islogin")) || false
  );
  try{
    const login = async (inputs) => {
      const res = await makeRequest.post("/login", inputs, {
          withCredentials: true
      });

      setCurrentUser(res.data)
      setislogin(true)
    };

    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(currentUser));
      localStorage.setItem("islogin", JSON.stringify(islogin));
    }, [currentUser]);
    
    return (
      <AuthContext.Provider value={{ currentUser, islogin, login }}>
        {children}
      </AuthContext.Provider>
    );
  }catch(err){
    console.log(err.message);
  }

};
