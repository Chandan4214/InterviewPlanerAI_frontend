import { useContext,useEffect } from "react";

// import { AuthContext } from "../auth/auth.context.jsx";

import { AuthContext } from "../auth.context";
import {login,register,logout,getMe}
from "../services/auth.api";

export const useAuth=()=>{
  const {user,setUser,loading,setLoading}=useContext(AuthContext);


  // const handleLogin=async({email,password})=>{
  //   setLoading(true);
  //   try{
  //    const data = await login({email,password});
  //    console.log("Login successful:", data.user);
  //    setUser(data.user);
  //    setLoading(false);
  //   }
  //   catch(error){
  //     console.error("Login failed:", error);
  //   }
  //   finally{
  //     setLoading(false);
  //   }

  // }

const handleLogin = async ({ email, password }) => {
  setLoading(true);
  try {
    const data = await login({ email, password });
    console.log("Login successful:", data.user);
    setUser(data.user);
  } catch (error) {
    console.error("Login failed:", error);
  } finally {
    setLoading(false);
  }
};


  
const handleRegister=async({username,email,password})=>{
  setLoading(true);
  try{
    const data =await register({username,email,password});
    setUser(data.user);
    setLoading(false);
    }
    catch(error){
      console.error("Registration failed:", error);
      throw error;
    }
    finally{
      setLoading(false);
    }
  }

const handleLogout=async()=>{
  setLoading(true);
  const data = await logout();
  setUser(null);
  setLoading(false);

}

const handleGetMe=async()=>{
  setLoading(true);
  const data = await getMe();
  setUser(data.user);
  setLoading(false);

}

useEffect(() => {
  const getAndSetUser = async () => {
    try {
      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      setUser(null);
      console.log("No logged in user");
    } finally {
      setLoading(false);
    }
  };

  getAndSetUser();
}, []);

return {user,loading,handleLogin,handleRegister,handleLogout,handleGetMe}
}