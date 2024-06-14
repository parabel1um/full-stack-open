const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

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

after(async () => {
  await mongoose.connection.close();
});
