import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import CreateForm from "./components/CreateForm";
import Togglable from "./components/Togglable";

const Blogs = ({ blogs }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog} blog={blog} />
      ))}
    </>
  );
};

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedAppUser", JSON.stringify(user));

      setUsername("");
      setPassword("");
      setUser(user);
    } catch (error) {
      setNotificationType("error");
      setMessage("wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user._id,
    };

    try {
      const response = await blogService.create(blogObject);

      if (response) {
        setBlogs(blogs.concat(response));
        setNotificationType("message");
        setMessage(`A new blog ${title} by ${author} added`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        setTitle("");
        setAuthor("");
        setUrl("");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  return (
    <div>
      <Notification notification={message} type={notificationType} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>logged in as {user.name}</p>
          <button
            onClick={() => {
              window.localStorage.removeItem("loggedAppUser");
            }}
          >
            logout
          </button>
          <Togglable buttonLabel="new blog">
            <CreateForm
              handleCreate={handleCreate}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
            />
          </Togglable>
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
