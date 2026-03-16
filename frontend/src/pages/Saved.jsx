import React, { useState, useMemo, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import PostCard from "../components/PostCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Saved = () => {
  const {posts,fetchPosts } = useContext(AppContext);
  const location = useLocation();

useEffect(() => {
  fetchPosts();
}, [location]); 
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [open, setOpen] = useState(false);

  // Create categories list
  const categories = useMemo(() => {
    const catArray = ["All"];

    posts?.forEach((p) => {
      const name = p?.category?.name;
      if (name && !catArray.includes(name)) {
        catArray.push(name);
      }
    });

    return catArray;
  }, [posts]);

  const handleSelect = (cat) => {
    setSelectedCategory(cat);
    setOpen(false);
  };

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts?.filter((post) => {
      const categoryName = post?.category?.name || "";
      const description = post?.description || "";

      const matchesCategory =
        selectedCategory === "All" || categoryName === selectedCategory;

      const matchesSearch =
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        categoryName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Group posts by category
  const groupedPosts = useMemo(() => {
    return filteredPosts.reduce((acc, post) => {
      const categoryName = post?.category?.name || "Uncategorized";

      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(post);

      return acc;
    }, {});
  }, [filteredPosts]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-white pt-40">
      <h1 className="text-4xl font-bold text-center mb-8">Saved Posts</h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">

        {/* Search */}
        <div className="flex items-center border rounded-md px-3 py-2 w-full">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by category or description..."
            className="outline-none w-full text-gray-400 bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative inline-block w-full">
          <button
            onClick={() => setOpen(!open)}
            className="border rounded-md px-3 py-2 w-full"
          >
            {selectedCategory === "All"
              ? "Select Category"
              : selectedCategory}
          </button>

          {open && (
            <div className="absolute mt-2 w-full bg-gray-900 border rounded-md shadow-lg z-50">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(cat)}
                  className="block w-full text-left px-4 py-2 hover:bg-amber-500 hover:text-white"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className=" grid  w-full">

      {/* Empty State */}
      {Object.keys(groupedPosts).length === 0 && (
        <p className="text-center text-gray-400 mt-10">No posts found.</p>
      )}

      {/* Posts */}
      {Object.entries(groupedPosts).map(([category, postsInCategory]) => (
        <div key={category} className="mb-12 w-full">
          <h2 className="text-2xl font-semibold mb-6">{category}</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 w-full">
            {postsInCategory.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Saved;