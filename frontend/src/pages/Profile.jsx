import { useContext, useEffect, useState } from "react";
import API from "../services/api";
import { AppContext } from "../context/AppContext";

const Profile = () => {
  
const {handleLogout,navigate,toast} = useContext(AppContext);

  const [loading,setLoading] = useState(true);
  const [userr,setUserr] = useState(null);
  const fetchProfile = async () => {
    try{
      const res = await API.get("/user/profile")
      setUserr(res.data.user);
    }
    catch(err){
      toast.error("Please login again");
      
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchProfile();
  },[]);



  if(loading){
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading profile...</p>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-transparent  py-16 px-6 pt-40 text-white">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-10 text-center">
          Your Profile
        </h1>


        {/* PROFILE CARD */}

        <div className="bg-transparent backdrop-blur-3xl rounded-xl shadow-md p-2 md:p-8 grid md:grid-cols-3 gap-8 ">


          {/* USER IMAGE */}

          <div className="flex flex-col items-center">

            <div className="w-32 h-32 rounded-full bg-indigo-500 flex items-center justify-center text-white text-4xl font-bold">
              {userr?.name?.charAt(0)}
            </div>

            <h2 className="text-xl font-semibold mt-4">
              {userr?.name}
            </h2>

            <p className="text-gray-500">
              {userr?.email}
            </p>

          </div>


          {/* USER INFO */}

          <div className=" md:col-span-2 sm:grid sm:gap-4">

            <div className="flex flex-col sm:flex-row justify-between border-b pb-2">
              <span className="text-gray-400">User ID</span>
              <span className="font-medium">{userr?._id}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between border-b pb-2">
              <span className="text-gray-400">Joined</span>
              <span className="font-medium">
                {new Date(userr?.createdAt).toDateString()}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between border-b pb-2">
              <span className="text-gray-400">Saved Posts</span>
              <span className="font-medium">
                {userr?.savedPosts?.length || 0}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between border-b pb-2">
              <span className="text-gray-400">Categories</span>
              <span className="font-medium">
                {userr?.categories?.length || 0}
              </span>
            </div>


            {/* ACTION BUTTONS */}

            <div className="flex gap-4 mt-6">

              <button
                onClick={()=>navigate("/Saved")}
                className="bg-indigo-400 text-sm sm:text-md text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                View Saved Posts
              </button>

              <button
                onClick={()=>navigate("/categorize")}
                className="border text-sm sm:text-md border-indigo-400 text-indigo-400 px-4 py-2 rounded-md hover:bg-indigo-50"
              >
                Categorize Post
              </button>

              <button
                onClick={handleLogout}
                className="ml-auto text-sm sm:text-md bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;