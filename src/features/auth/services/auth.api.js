import axios from "axios";
const API_URL = "https://interviewplanerai-backend-2.onrender.com/api/auth";

const api=axios.create({
  baseURL:API_URL,
  withCredentials:true
})


export async function register({username, email, password}){
   try{
  const response= await api.post(`/register`,{
    username,
    email,
    password
  })
  return response.data

}
 catch (error) {
  console.error("Error registering user:", error);
  throw error;
}
}


export async function login({email, password}){
  try{
  const response = await api.post(`/login`,{
    email,
    password
  })
  return response.data

}
 catch (error) {
  console.error("Error logging in user:", error);
  throw error;
  }
}


export async function logout(){
  try{
    const response = await api.post(`/logout`)
    return response.data
  }
  catch (error) {
  console.error("Error logging out user:", error);
  throw error;
  }
}




export const getMe = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/auth/get-me",
    {
      withCredentials: true, // ✅ REQUIRED
    }
  );
  return response.data;
};