const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "My story of becoming solo entrepreneur",
    likes: 19,
    url: "url",
    id: "665ad6710702ce231fbfe386",
  },
  {
    title: "How I make passive income",
    url: "url",
    likes: 14,
    id: "666c7acaaf92dd672c6ac664",
  },
  {
    title: "How I make passive income at 25",
    url: "url",
    likes: 17,
    id: "666c7b08af92dd672c6ac666",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((e) => e.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((r) => r.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
