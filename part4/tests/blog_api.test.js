const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const logger = require("../utils/logger");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
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

  await api
    .post("/api/blogs")
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

  await api.delete(`/api/blogs/${blogsAtStart[0].id}`).expect(204);

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

after(async () => {
  await mongoose.connection.close();
});
