import toast from "react-hot-toast"
import { createContext, useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import API from "../services/api";
// import axios from 'axios';
// axios.defaults.withCredentials = true
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const AppContext = createContext();

const AppContextProvider = ({children})=>{
      const navigate = useNavigate();

    const [user,setUser] = useState(null);
    const [userData,setUserData] = useState("");
    const [posts,setPosts] = useState([]);
    
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts/user");
        setPosts([...res.data.posts]);
      } catch (error) {
        console.log(error);
        console.log("Failed to load posts");
      }
    };
    
const handleDelete = async (id) => {
  try {
    const res = await API.delete(`/posts/${id}`);
    if (res.data.success) {
      toast.success("Post Deleted Successfully");
      fetchPosts();
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Error deleting post");
    console.log(error);
  }
};

 useEffect(() => {
  const token = localStorage.getItem("token");
  if(token){
    setUser(true);
  }
 },[]);

 const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    setUser(false);
  };

    const values={
        user,
        setUser,
        posts, 
        userData,
        setUserData,
        handleLogout,
        navigate,
        toast,
        handleDelete,
        fetchPosts

    }
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}; 


export default AppContextProvider