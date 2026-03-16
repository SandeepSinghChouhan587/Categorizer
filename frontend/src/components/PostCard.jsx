import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ConfirmModal from "./ui/ConfirmModel";
import { useState } from "react";

const PostCard = ({ post }) => {
const {handleDelete} = useContext(AppContext);
 const [selectedPostId, setSelectedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seeMore,setSeeMore] = useState(false);

  const openModal = (id) => {
    setSelectedPostId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(selectedPostId);
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setSelectedPostId(null);
    setIsModalOpen(false);
  };


  const handleOpen = () => {
    window.open(post.url, "_blank");
  };

  return (
    <div className="group border rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 bg-transparent backdrop-blur-3xl flex flex-col h-fit">
      
      {/* Thumbnail */}
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-fit group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Title */}
        <h3 className={`${seeMore?"":"line-clamp-2"} text-lg font-semibold text-gray-300 mb-1 `}>
          {post.title}
        </h3>

        {/* Description */}
        <p className={`${seeMore?"":"line-clamp-3"} text-sm text-gray-400`}>
          {post.description}
        </p><span onClick={()=>{setSeeMore(!seeMore)}} className="text-sm mb-2 cursor-pointer">{seeMore?"See Less":"See More"}</span>

        {/* Category + Platform */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
            {post.category?.name}
          </span>

          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
            {post.platform}
          </span>
        </div>

        {/* Watch Button */}
        <button
          onClick={handleOpen}
          className="mt-auto bg-purple-500 hover:bg-purple-600 text-white text-sm py-2 rounded-md transition cursor-pointer"
        >
          Watch
        </button>
        <button
            onClick={() => openModal(post._id)}
            className={`${isModalOpen?"hidden":""} mt-2 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-md transition cursor-pointer`}
          >
            Delete
          </button>
           <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to delete this post?"
        tittle={post.title}

      />
      </div>
    </div>
  );
};

export default PostCard;