import { useState, useEffect, useContext, createContext } from "react";

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
      const blogsData = data.docs.map((item) => item.data());

      setBlogs(blogsData);
    };

    await fetchBlogs();

    db.collection("Blogs").onSnapshot({ includeMetadataChanges: true }, async () => {
      await fetchBlogs();
    });
  }, []);

  return { blogs };
};

export const BlogsProvider = ({ children }) => {
  const blogs = useProvidedBlogs();
  return <blogsContext.Provider value={blogs}>{children}</blogsContext.Provider>;
};
