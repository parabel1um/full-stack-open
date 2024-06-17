import React, { useState } from "react";

const Blog = ({ blog, user, addLikes }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    padding: "10px",
    border: "solid",
    borderWidth: 1,
    marginBottom: "5px",
  };

  const childStyle = {
    margin: 0,
  };

  const handleLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    addLikes(blog.id, blogObject);
    setLikes(likes + 1);
  };

  return (
    <div style={blogStyle}>
      <div style={{ display: visible ? "none" : "" }}>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={{ display: visible ? "" : "none" }}>
        <div style={childStyle}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
          <p style={childStyle}>{blog.url}</p>
          <p style={childStyle}>
            likes {likes}{" "}
            <button style={childStyle} onClick={handleLike}>
              like
            </button>
          </p>
          <p style={childStyle}>{blog.user ? user.name : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
