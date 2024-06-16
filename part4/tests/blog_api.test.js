const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const logger = require("../utils/logger");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("hel", 10);
  const user = new User({
    username: "Matas",
    blogs: [],
    passwordHash,
  });

  await user.save();
});

beforeEach(async () => {
  await Blog.deleteMany({});

  const users = await User.find({});
  const user = users[0];

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog({
      title: blog.title,
      url: blog.url,
      likes: blog.likes,
      user: user.id,
    });
    await blogObject.save();
    user.blogs = user.blogs.concat(blogObject._id);
  }

  await user.save();
});

test("correct number of blogs", async () => {
  const response = await api.get("/api/blogs");

  console.log(response);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("blog posts identifier is id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;

  blogs.forEach((e) => {
    assert.ok(Object.keys(e).includes("id"));
  });
});

test("new blog can be added", async () => {
  const newBlog = {
    title: "just testing",
    url: "http://localhost:3001/",
  };

  const user = {
    username: "Matas",
    password: "hel",
  };

  const login = await api.post("/api/login").send(user);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${login.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const notesAtEnd = await helper.blogsInDb();
  assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length + 1);

  const contents = notesAtEnd.map((e) => e.title);
  assert(contents.includes("just testing"));
});

test("likes property is not missing", async () => {
  const response = await api.get("/api/blogs");
  const keys = response.body.map((e) => Object.keys(e));

  for (let set of keys) {
    assert(set.includes("likes"));
  }
});

test("POST /api/blogs with missing url responds with 400", async () => {
  const newBlog = {
    title: "New Blog Title",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("POST /api/blogs with missing title responds with 400", async () => {
  const newBlog = {
    url: "http://localhost:3001/",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("deleting a single note returns 204 and removes the content from database", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const user = {
    username: "Matas",
    password: "hel",
  };

  const login = await api.post("/api/login").send(user);

  await api
    .delete(`/api/blogs/${blogsAtStart[0].id}`)
    .set("Authorization", `Bearer ${login.body.token}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(helper.initialBlogs.length - 1, blogsAtEnd.length);

  const contents = blogsAtEnd.map((e) => e.title);
  assert(!contents.includes(blogsAtStart[0].title));
});

test("data is changed on individual blog and returns 200", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToChange = blogsAtStart[0];

  const newBlog = {
    title: blogToChange.title,
    url: blogToChange.url,
    likes: blogToChange.likes + 1,
  };

  const response = await api
    .put(`/api/blogs/${blogToChange.id}`)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, blogToChange.likes + 1);
});

test("data is not created if password is less than three characters", async () => {
  const usersAtStart = await helper.usersInDb();

  const User = {
    name: "Rob",
    username: "ofewwe",
    password: "we",
  };

  const response = await api
    .post("/api/users")
    .send(User)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  assert.strictEqual(usersAtStart.length, usersAtEnd.length);

  assert.strictEqual(
    response.body.error,
    "password and username must be at least three characters long"
  );
});

test("data is not created if username is less than three characters", async () => {
  const usersAtStart = await helper.usersInDb();

  const User = {
    name: "Davd",
    username: "ro",
    password: "weee",
  };

  const response = await api
    .post("/api/users")
    .send(User)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  assert.strictEqual(usersAtStart.length, usersAtEnd.length);

  assert.strictEqual(
    response.body.error,
    "password and username must be at least three characters long"
  );
});

after(async () => {
  await mongoose.connection.close();
});
