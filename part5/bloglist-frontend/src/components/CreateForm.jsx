import React, { useState } from "react";

const CreateForm = ({ handleCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = (event) => {
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    event.preventDefault();
    handleCreate(blogObject);
  };

  return (
    <form onSubmit={createBlog}>
      <div>
        title:
        <input
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        ></input>
      </div>
      <div>
        author:
        <input
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
      </div>
      <div>
        url:
        <input
          name="url"
          value={url}
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        ></input>
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

export default CreateForm;
