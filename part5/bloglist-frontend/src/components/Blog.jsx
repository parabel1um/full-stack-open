import React, { useState } from "react";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

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
            likes {blog.likes} <button style={childStyle}>like</button>
          </p>
          <p style={childStyle}>{blog.user !== null ? user.name : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
