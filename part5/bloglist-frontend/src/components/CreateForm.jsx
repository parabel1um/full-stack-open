import React from "react";

const CreateForm = ({
  handleCreate,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  return (
    <form onSubmit={handleCreate}>
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
