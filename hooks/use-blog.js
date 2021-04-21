import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

import { db } from "loaders/firebase";

const blogsContext = createContext();

export const useBlogs = () => {
  return useContext(blogsContext);
};

const useProvidedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(async () => {
    const fetchBlogs = async () => {
      const response = db.collection("Blogs");
      const data = await response.get();
      const blogsData = data.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });

      setBlogs(blogsData);
    };

    await fetchBlogs();

    db.collection("Blogs").onSnapshot({ includeMetadataChanges: true }, async () => {
      await fetchBlogs();
    });
  }, []);

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/blog/${id}`, null);

      return res.data;
    } catch (e) {
      return { error: e };
    }
  };

  const createBlog = async (data) => {
    try {
      const res = await axios.post(`http://localhost:4000/api/blog`, data);

      return res.data;
    } catch (e) {
      return { error: e };
    }
  };

  const updateBlog = async (data) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/blog`, data);

      return res.data;
    } catch (e) {
      return { error: e };
    }
  };

  return { blogs, deleteBlog, createBlog, updateBlog };
};

export const BlogsProvider = ({ children }) => {
  const blogs = useProvidedBlogs();
  return <blogsContext.Provider value={blogs}>{children}</blogsContext.Provider>;
};
