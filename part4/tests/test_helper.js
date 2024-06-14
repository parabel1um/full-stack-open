const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "My story of becoming solo entrepreneur",
    id: "665ad6710702ce231fbfe386",
  },
  {
    title: "How I make passive income",
    id: "665aed6f753be36413bc3d38",
  },
];

const notesInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((e) => e.toJSON());
};

module.exports = {
  initialBlogs,
  notesInDb,
};
